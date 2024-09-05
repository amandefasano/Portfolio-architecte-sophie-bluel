const dialog = document.querySelector("dialog");

dialog.innerHTML = 
`
 <img src="./assets/icons/xmark.svg" alt="closing cross icon">
 <h3>Galerie photo</h3>
 <div class="modal_gallery"></div>
 <img src="./assets/icons/bar.svg" alt="bar icon">
 <button>Ajouter une photo</button>
`;

// Importing the photos
let works = window.localStorage.getItem('works');
works = JSON.parse(works);
console.log(works);
const modalGalleryElement = document.querySelector('.modal_gallery');

for (let i = 0; i < works.length; i++) {
  const workDiv = document.createElement('div');
  
  const modalGalleryImg = document.createElement('img');
  modalGalleryImg.src = works[i].imageUrl;

  const deleteIcon = document.createElement('img');
  deleteIcon.src = "./assets/icons/delete.png";
  deleteIcon.classList.add('delete');

  workDiv.appendChild(modalGalleryImg);
  workDiv.appendChild(deleteIcon);

  modalGalleryElement.appendChild(workDiv);
}

export const modal = dialog;
