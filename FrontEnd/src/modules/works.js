/**
 
 * Sends a request to the api to get all the works.

 * @returns {Array} - A javascript array that contains all the works.
 
*/
async function _getWorks() {
  return await fetch("http://localhost:5678/api/works").then((response) => {
    if (!response.ok) {
      console.log(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
  });
}

/**
 
 * Gets the works from the local storage if stored there. If not stored in the local storage, 
 * gets them from the api and stores them in the local storage.

 * @returns {Array} - A Javascript array that contains all the works. 
 
*/
export async function getWorks() {
  let works = window.localStorage.getItem("works");

  if (works !== null) {
    works = JSON.parse(works);
  } else {
    works = await _getWorks();
    const worksValues = JSON.stringify(works);
    window.localStorage.setItem("works", worksValues);
  }

  return works;
}

/**
 
 * Sends a request to the api to delete the specified work.

 * @param {Number} id - The id of the work that is to be deleted.
 
*/
export async function deleteWork(id) {
  const token = window.localStorage.getItem("token");

  if (token !== null) {
    await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
      body: null,
    }).then((response) => {
      if (!response.ok) {
        console.log(`erreur HTTP! statut: ${response.status}`);
      }
    });
  }
}

/**
 
 * Sends a request to the api to get all the categories.

 * @returns {Array} - A javascript array that contains all the categories.
 
*/
async function _getCategories() {
  return await fetch("http://localhost:5678/api/categories").then(
    (response) => {
      if (!response.ok) {
        console.log(`erreur HTTP! statut: ${response.status}`);
      }
      return response.json();
    }
  );
}

/**
 
 * Gets the categories from the local storage if stored there. If not stored in the local storage, 
 * gets them from the api and stores them in the local storage.

 * @returns {Array} - A Javascript array that contains all the categories. 
 
*/
export async function getCategories() {
  let categories = window.localStorage.getItem("categories");
  if (categories !== null) {
    categories = JSON.parse(categories);
  } else {
    categories = await _getCategories();
    const cateogriesValues = JSON.stringify(categories);
    window.localStorage.setItem("categories", cateogriesValues);
  }

  return categories;
}

/**
 
 * Fills up the gallery with the works
 
*/
export async function fillGallery() {
  // Importing the works
  let works = await getWorks();

  for (let i = 0; i < works.length; i++) {
    createWorkFigure(works[i]);
  }
}

/**
 
 * Creates a figure that contains the work's photo and title.
 
*/
export async function createWorkFigure(work) {
  const galleryDiv = document.querySelector(".gallery");

  // Creating the elements in the div
  let figureElement = document.createElement("figure");
  let imgElement = document.createElement("img");
  let figcaptionElement = document.createElement("figcaption");

  // Filling the elements
  imgElement.src = work.imageUrl;
  figcaptionElement.innerText = work.title;
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  // Giving a category_name and an id to the figure
  figureElement.setAttribute("category_name", work.category.name);
  figureElement.setAttribute("work_id", work.id);

  // Appending figureElement to the div "gallery"
  galleryDiv.appendChild(figureElement);
}

/**
 
 * Creates a manage works modal figure that contains the work image and a delete icon

 * @param {Object} work - A work object 
 
*/
export function createModalWorkFigure(work) {
  // Getting the gallery
  const modalGalleryElement = document.querySelector(".modal_gallery");

  // Building the figure which will contain the image and the delete button
  const workFigure = document.createElement("figure");

  // Building the delete button
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete.svg";
  deleteIcon.alt = "trash can icon";
  deleteIcon.classList.add("delete_work");

  // Handling deletion
  handleDeletion(deleteIcon, work.id);

  // Building the image
  const modalGalleryImg = document.createElement("img");
  modalGalleryImg.src = work.imageUrl;
  modalGalleryImg.classList.add("modal_work");

  // Appending them to the figure
  workFigure.appendChild(deleteIcon);
  workFigure.appendChild(modalGalleryImg);
  workFigure.setAttribute("work_id", work.id);

  // Appending the figure to the gallery
  modalGalleryElement.appendChild(workFigure);
}

/**
 
 * Adds an event listener on the click of the specified button, which deletes the specified work.

 * @param {HTMLElement} button - The HTML element on which to click in order to delete the work

 * @param {Number} id - The id of the work that is to be deleted
 
*/
function handleDeletion(button, id) {
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    await deleteWork(id);

    // updating the local storage
    window.localStorage.removeItem("works");

    // updating the modal gallery
    const modalGalleryWork = document.querySelector(
      `.modal_gallery [work_id="${id}"]`
    );
    modalGalleryWork.remove();

    // updating the gallery
    const galleryWork = document.querySelector(`.gallery [work_id="${id}"]`);
    galleryWork.remove();
  });
}
