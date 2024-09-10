import { getWorks } from "./works.js";

// Building the modal
const dialog = document.querySelector("dialog");

dialog.innerHTML = `
 <div class="close_modal">
  <img id="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
 </div>
 <div class="modal_body">
  <h3>Galerie photo</h3>
  <div class="modal_gallery"></div>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <button>Ajouter une photo</button>
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

export const modal = dialog;

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