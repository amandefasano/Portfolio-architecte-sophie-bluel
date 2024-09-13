import { getWorks, createModalWorkFigure } from "../modules/works.js";
import { addWorkModal } from "./add_work_modal.js";
import {
  closeDialogOnButtonClick,
  closeDialogOnBackdropClick,
} from "../modules/modal.js";

// Building the manage works modal
const manageWorksDialog = document.getElementById("manage_works_modal");

manageWorksDialog.innerHTML = `
<div class="modal_header">
  <img class="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
</div>
<div class="modal_body">    
  <h3>Galerie photo</h3>
  <div class="modal_gallery"></div>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <button>Ajouter une photo</button>
</div>
`;

// Filling up the modal gallery
fillModalGallery();

// When click on Add a picture button:
// Closing the modal, opening the add work modal and preventing the autofocus behavior
const modalAddPictureButton = document.querySelector(
  "#manage_works_modal .modal_body button"
);

modalAddPictureButton.addEventListener("click", () => {
  manageWorksDialog.close();
  addWorkModal.inert = true;
  addWorkModal.showModal();
  addWorkModal.inert = false;
});

// Closing the modal when the closing button is clicked
const closeButton = document.querySelector("#manage_works_modal .close_modal");
closeDialogOnButtonClick(closeButton, manageWorksDialog);

// Closing the modal when the backdrop is clicked
closeDialogOnBackdropClick(manageWorksDialog);

export const manageWorksModal = manageWorksDialog;

/**
 
 * Fills up the manage works modal gallery div with figure elements that contain an image and a delete icon.
 
*/
async function fillModalGallery() {
  // Importing the works
  let works = await getWorks();

  for (let i = 0; i < works.length; i++) {
    createModalWorkFigure(works[i]);
  }
}