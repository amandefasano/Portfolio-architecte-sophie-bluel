import { getWorks } from "../modules/works.js";
import { deleteWork } from "../modules/works.js";
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

// Importing the photos
let works = await getWorks();

// Building the gallery
const modalGalleryElement = document.querySelector(".modal_gallery");

for (let i = 0; i < works.length; i++) {
  // Building the figure which will contain the image and the delete button
  const workFigure = document.createElement("figure");

  // Building the delete button
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete.svg";
  deleteIcon.alt = "trash can icon";
  deleteIcon.classList.add("delete_work");

  // Handling deletion
  handleDeletion(deleteIcon, works[i].id);

  // Building the image
  const modalGalleryImg = document.createElement("img");
  modalGalleryImg.src = works[i].imageUrl;
  modalGalleryImg.classList.add("modal_work");

  // Appending them to the div
  workFigure.appendChild(deleteIcon);
  workFigure.appendChild(modalGalleryImg);
  workFigure.setAttribute("work_id", works[i].id);

  // Appending the div to the gallery
  modalGalleryElement.appendChild(workFigure);
}

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

function handleDeletion(button, id) {
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    let response = await deleteWork(id);
  
    if (response.ok) {
      // updating the local storage
      window.localStorage.removeItem("works");
  
      // updating the modal gallery
      const modalGalleryWork = document.querySelector(
        `.modal_gallery [work_id="${id}"]`
      );
      modalGalleryWork.remove();
  
      // updating the gallery
      const galleryWork = document.querySelector(
        `.gallery [work_id="${id}"]`
      );
      galleryWork.remove();
    }
  });
}
