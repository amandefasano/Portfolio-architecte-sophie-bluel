import { manageWorksModal } from "./manage_works_modal.js";
import { getCategories } from "../modules/works.js";
import {
  closeDialogOnButtonClick,
  closeDialogOnBackdropClick,
} from "../modules/modal.js";

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
      <p class="modal_p">jpg, png : 4mo max</p>
      <input type="file" id="photo" name="photo" accept=".jpg, .png" required/>
    </div>
    <div class="preview"></div>
    <label for="title">Titre</label>
    <input class="form_input" type="text" id="title" name="title" required/>
    <label for="category">Catégorie</label>
    <select class="form_input" id="category" name="category"></select>
  </form>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <input id="submit_new_work" type="submit" form="add_work" value="Valider" disabled/>
</div>
`;

// Form
const addWorkForm = document.getElementById("add_work");
let fileInput = document.getElementById("photo");
const previewDiv = document.querySelector(".preview");
const addPhotoDiv = document.getElementById("add_photo");
const title = document.getElementById("title");
let selectCategories = document.getElementById("category");
const submitButton = document.getElementById("submit_new_work");

// Uploading a photo
fileInput.style.opacity = 0;

fileInput.addEventListener("change", () => {
  const curPhoto = fileInput.files;
  handleFiles(curPhoto);

  // Enabling the submit button
  if (selectCategories.value !== "" && title.value !== "") {
    submitButton.disabled = false;
  }
});

// Getting the categories
let categories = await getCategories();

// Creating and filling up the select's options with the categories
// First blank category
const blankOption = document.createElement("option");
blankOption.value = "";
selectCategories.appendChild(blankOption);

categories.forEach((category) => {
  const selectCategory = document.createElement("option");
  selectCategory.value = category.id;
  selectCategory.innerText = category.name;
  selectCategories.appendChild(selectCategory);
});

// Enabling the submit button
title.addEventListener("input", () => {
  let photo = null;
  if (previewDiv.childElementCount !== 0) {
    photo = previewDiv.firstChild.file;
  }

  if (photo !== null && selectCategories.value !== "") {
    submitButton.disabled = false;
  }
});

selectCategories.addEventListener("change", () => {
  let photo = null;
  if (previewDiv.childElementCount !== 0) {
    photo = previewDiv.firstChild.file;
  }

  if (photo !== null && title.value !== "") {
    submitButton.disabled = false;
  }
});

addWorkForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData();
  const token = window.localStorage.getItem("token");

  let photo = null;
  if (previewDiv.childElementCount !== 0) {
    photo = previewDiv.firstChild.file;
  }
  let titleValue = title.value;
  let categoryId = selectCategories.value;

  formData.append("image", photo);
  formData.append("title", titleValue);
  formData.append("category", categoryId);

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5678/api/works", false);
  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.send(formData);

  console.log(request.status);

  window.localStorage.removeItem('works');
});

// When click on the go back arrow button:
const goBackButton = document.getElementById("go_back");

goBackButton.addEventListener("click", () => {
  // Closing the add work modal
  addWorkDialog.close();

  // Cancelling the work's uploading

  // Opening the manage works modal and preventing the autofocus behavior
  manageWorksModal.inert = true;
  manageWorksModal.showModal();
  manageWorksModal.inert = false;
});

// Closing the modal when the closing button is clicked
const closeButton = document.querySelector("#add_work_modal .close_modal");
closeDialogOnButtonClick(closeButton, addWorkDialog);

// Closing the modal when the backdrop is clicked
closeDialogOnBackdropClick(addWorkDialog);

function emptyForm(form) {
  let formElements = form.elements;

  for (const element of formElements) {
    if (element.nodeName === "INPUT" && element.type === "text") {
      element.value = '';
    } else if (element.nodeName === "INPUT" && element.type === "file") {
      element.removeItem();
    }
  } {
    
  }
    

  if (fileInput.value !== null) {
    fileInput.value = "";
    addPhotoDiv.removeAttribute("style");
    const img = document.querySelector(".photo");
    img.parentNode.removeChild(img);
  }
}

export const addWorkModal = addWorkDialog;

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }

    const img = document.createElement("img");
    img.classList.add("photo");
    img.file = file;
    previewDiv.appendChild(img);

    addPhotoDiv.setAttribute("style", "display:none");

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
