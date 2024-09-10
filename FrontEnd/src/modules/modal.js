import { getWorks } from "./works.js";

// Building the modal
const dialog = document.getElementById("edit_modal");

dialog.innerHTML = `
 <div class="close_modal">
  <img id="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
 </div>
 <div class="modal_body">
  <h3>Galerie photo</h3>
  <div class="modal_gallery"></div>
  <form class="hidden" id="new_work">
    <div class="add_photo">
      <img src="./assets/icons/image.svg" alt="image icon">
      <label for="photo">+ Ajouter photo</label>
      <input type="file" id="photo" name="photo" accept=".jpg, .png"/>
      <p>jpg, png : 4mo max</p>
    </div>
    <label for="title">Titre</label>
    <input type="text" id="title" name="title"/>
    <label for="category">Catégorie</label>
    <select id="category" name="category"></select>
  </form>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <button>Ajouter une photo</button>
  <input class="submit_new_work hidden" type="submit" form="new_work" value="Valider"/>
 </div>
`;

// Importing the photos
let works = window.localStorage.getItem("works");

if (works !== null) {
  works = JSON.parse(works);
} else {
  works = await getWorks();
  const worksValues = JSON.stringify(works);
  window.localStorage.setItem("works", worksValues);
}

const modalGalleryElement = document.querySelector(".modal_gallery");

for (let i = 0; i < works.length; i++) {
  // Building the figure which will contain the image and the delete button
  const workFigure = document.createElement("figure");

  // Building the delete button
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete.svg";
  deleteIcon.alt = "trash can icon";
  deleteIcon.classList.add("delete_work");

  // Building the image
  const modalGalleryImg = document.createElement("img");
  modalGalleryImg.src = works[i].imageUrl;
  modalGalleryImg.setAttribute("work_id", works[i].id);
  modalGalleryImg.classList.add("modal_work");

  // Appending them to the div
  workFigure.appendChild(deleteIcon);
  workFigure.appendChild(modalGalleryImg);

  // Appending the div to the gallery
  modalGalleryElement.appendChild(workFigure);
}

// const modalAddPictureButton = document.querySelector(".modal_body button");
// const goBackButton = document.querySelector("#go_back");
// const modalBodyH3 = document.querySelector(".modal_body h3");
// const addPictureForm = document.querySelector("#new_work");
// const submitNewWorkButton = document.querySelector(".modal_body .submit_new_work");

// modalAddPictureButton.addEventListener("click", () => {
//   goBackButton.classList.remove("hidden");
//   modalBodyH3.innerHTML = "Ajout photo";
//   modalGalleryElement.style.display = "none";
//   addPictureForm.classList.remove("hidden");
//   modalAddPictureButton.classList.add("hidden");
//   submitNewWorkButton.classList.remove("hidden");
// });

// goBackButton.addEventListener("click", () => {
//   goBackButton.classList.add("hidden");
//   modalBodyH3.innerHTML = "Galerie photo";
//   modalGalleryElement.style.display = "grid";
//   addPictureForm.classList.add("hidden");
//   modalAddPictureButton.classList.remove("hidden");
//   submitNewWorkButton.classList.add("hidden");
// })

export const modal = dialog;

// Building the new work modal
const formDialog = document.getElementById("new_work_modal");

formDialog.innerHTML = `
 <div class="close_modal">
  <img id="go_back" src="./assets/icons/back_arrow.svg" alt="back arrow icon">
  <img id="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
 </div>
 <div class="modal_body">
  <h3>Ajout photo</h3>
  <form id="new_work">
    <div class="add_photo">
      <img src="./assets/icons/image.svg" alt="image icon">
      <label for="photo">+ Ajouter photo</label>
      <input type="file" id="photo" name="photo" accept=".jpg, .png"/>
      <p>jpg, png : 4mo max</p>
    </div>
    <label for="title">Titre</label>
    <input type="text" id="title" name="title"/>
    <label for="category">Catégorie</label>
    <select id="category" name="category"></select>
  </form>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <input class="submit_new_work hidden" type="submit" form="new_work" value="Valider"/>
 </div>
`;

// Form
const fileInput = document.querySelector("#photo");
fileInput.style.opacity = 0;

const modalAddPictureButton = document.querySelector(".modal_body button");
const goBackButton = document.querySelector("#go_back");

// Closing the modal, opening the new work modal and preventing the autofocus behavior
modalAddPictureButton.addEventListener("click", () => {
  
  modal.close();
  formDialog.inert = true;
  formDialog.showModal();
  formDialog.inert = false;
});

// Closing the new work modal, opening the modal and preventing the autofocus behavior
goBackButton.addEventListener("click", () => {

  formDialog.close();
  modal.inert = true;
  modal.showModal();
  modal.inert = false;
});


export const new_work_modal = formDialog;

/**
 
 * Detects if the event took place inside the dialog or not.

 * @param {Event} event - the event that happened inside or outside the dialog 

 * @param {HTMLDialogElement} dialog - the HTML dialog element inside or outside which the event happened

 * @returns {Boolean} 
 
 */
export function isInDialog(event, dialog) {
  let rect = dialog.getBoundingClientRect();

  return (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
}
