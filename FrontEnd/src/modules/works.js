/**
 
 * Sends a request to the api to get all the works.

 * @returns {Array} - A javascript array that contains all the works.
 
*/
export async function getWorks() {
  return await fetch("http://localhost:5678/api/works").then((response) =>
    response.json()
  );
}

/**
 
 * Sends a request to the api to delete the specified work.

 * @param {Number} id - The id of the work that is to be deleted.
 
*/
export async function deleteWork(id) {
  const token = window.localStorage.getItem('token');

  if (token !== null) {
    return await fetch('http://localhost:5678/api/works/' + id, {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + token},
      body: null
    })
  }
  
}

/**
 
 * Sends a request to the api to get all the categories.

 * @returns {Array} - A javascript array that contains all the categories.
 
*/
export async function getCategories() {
  return await fetch("http://localhost:5678/api/categories").then((response) =>
    response.json()
  );
}

/**
 
 * Fills up the gallery div with figure elements that contain an image and a caption.
 
*/
export async function fillGallery() {
  const galleryDiv = document.querySelector(".gallery");
  
  let works = window.localStorage.getItem('works');
  if (works !== null) {
    works = JSON.parse(works);
  } else {
    works = await getWorks();
    const worksValues = JSON.stringify(works);
    window.localStorage.setItem('works', worksValues);
  }

  for (let i = 0; i < works.length; i++) {
    // Creating the elements in the div
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");
    let figcaptionElement = document.createElement("figcaption");

    // Filling the elements
    imgElement.src = works[i].imageUrl;
    figcaptionElement.innerText = works[i].title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    // Giving a category_name and an id to the figure
    figureElement.setAttribute("category_name", works[i].category.name);
    figureElement.setAttribute("work_id", works[i].id);

    // Appending figureElement to the div "gallery"
    galleryDiv.appendChild(figureElement);
  }
}