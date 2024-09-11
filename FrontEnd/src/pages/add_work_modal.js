import { manageWorksModal } from "./manage_works_modal.js";
import { closeDialogOnButtonClick, closeDialogOnBackdropClick } from "../modules/modal.js";

// Building the add work modal
const addWorkDialog = document.getElementById("add_work_modal");

addWorkDialog.innerHTML = `
<div class="modal_header">
  <img id="go_back" src="./assets/icons/back_arrow.svg" alt="back arrow icon">
  <img class="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
</div>
<div class="modal_body">  
  <h3>Ajout photo</h3>
  <form id="add_work">
    <div id="add_photo">
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
  <input class="submit_new_work hidden" type="submit" form="add_work" value="Valider"/>
</div>
`;

// When click on the go back arrow button:
// Closing the add work modal, opening the manage works modal and preventing the autofocus behavior
const goBackButton = document.getElementById("go_back");

goBackButton.addEventListener("click", () => {
  addWorkDialog.close();
  manageWorksModal.inert = true;
  manageWorksModal.showModal();
  manageWorksModal.inert = false;
});

// Form
const fileInput = document.querySelector("#photo");
fileInput.style.opacity = 0;

// Closing the modal when the closing button is clicked
const closeButton = document.querySelector("#add_work_modal .close_modal");
closeDialogOnButtonClick(closeButton, addWorkDialog);

// Closing the modal when the backdrop is clicked
closeDialogOnBackdropClick(addWorkDialog);

export const addWorkModal = addWorkDialog;
