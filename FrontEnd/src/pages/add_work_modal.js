import { manageWorksModal } from "./manage_works_modal.js";
import {
  getCategories,
  getWorks,
  createModalWorkFigure,
  createWorkFigure,
} from "../modules/works.js";
import {
  closeDialogOnButtonClick
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
      <input type="file" id="photo" name="image" accept=".jpg, .png" style="opacity:0" required/>
      <p class="errorMsg hidden" id="photo_error"></p>
    </div>
    <div class="preview"></div>
    <p class="errorMsg hidden" id="title_error"></p>
    <label for="title">Titre</label>
    <input class="form_input" type="text" id="title" name="title" required/>
    <p class="errorMsg hidden" id="category_error"></p>
    <label for="category">Catégorie</label>
    <select class="form_input" id="category" name="category"></select>
  </form>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <p class="errorMsg hidden" id="request_error"></p>
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
fileInput.addEventListener("change", () => {
  const curPhoto = fileInput.files;
  const photoError = document.getElementById("photo_error");
  
  for (let i = 0; i < curPhoto.length; i++) {
    const file = curPhoto[i];

    if (
      !file.type.includes("jpg") &&
      !file.type.includes("png") &&
      !file.type.includes("jpeg")
    ) {
      photoError.innerText = "Veuillez choisir une image de type .jpg ou .png";
      photoError.classList.remove("hidden");

    } else if (file.size > 4000000) {
      photoError.innerText = "L'image ne doit pas excéder 4mo";
      photoError.classList.remove("hidden");

    } else {
      handleFiles(curPhoto);

      // Enabling the submit button
      if (selectCategories.value !== "" && title.value !== "") {
        submitButton.disabled = false;
      }
    }
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

// Sending the work once the form is submitted, resetting and updating the site's elements
addWorkForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Handling not valid infos
  const titleError = document.getElementById("title_error");
  const categoryError = document.getElementById("category_error");

  if (title.value.trim() === "") {
    titleError.classList.remove("hidden");
    titleError.innerText = "Veuillez renseigner un titre";

  } else if (selectCategories.value === "") {
    categoryError.classList.remove("hidden");
    categoryError.innerText = "Veuillez choisir une catégorie";

  } else {
    const formData = new FormData(addWorkForm);
    const token = window.localStorage.getItem("token");
    const requestError = document.getElementById("request_error");

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5678/api/works", false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(formData);
    const response = request.responseText;

    if (response === null) {
      requestError.classList.remove("hidden");
      requestError.innerText = "Désolés, quelque chose s'est mal passé. Veuillez réessayer.";

    } else {
      // Resetting the local storage
      window.localStorage.removeItem("works");

      // Resetting the form
      titleError.classList.add("hidden");
      categoryError.classList.add("hidden");
      requestError.classList.add("hidden");

      submitButton.disabled = true;

      const img = document.querySelector(".photo");
      previewDiv.removeChild(img);

      addPhotoDiv.removeAttribute("style");
      photo_error.classList.add("hidden");

      title.value = "";
      selectCategories.value = "";

      // Updating the gallery and the manage works modal gallery
      const newWork = await getNewWork();
      createWorkFigure(newWork);
      createModalWorkFigure(newWork);
    }
  }
});

// Redirecting to the manage works modal when click on the go back arrow button
const goBackButton = document.getElementById("go_back");

goBackButton.addEventListener("click", () => {
  // Closing the add work modal
  addWorkDialog.close();

  // Opening the manage works modal and preventing the autofocus behavior
  manageWorksModal.inert = true;
  manageWorksModal.showModal();
  manageWorksModal.inert = false;
});

// Closing the modal when the closing button is clicked
const closeButton = document.querySelector("#add_work_modal .close_modal");
closeDialogOnButtonClick(closeButton, addWorkDialog);

export const addWorkModal = addWorkDialog;

/**
 * Displays a thumbnail of the image selected by the user.
 *
 * @param {FileList} files - The FileList object returned by the files property of the HTML <input> element.
 */
function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    addPhotoDiv.setAttribute("style", "display:none");

    const img = document.createElement("img");
    img.classList.add("photo");
    img.file = file;
    previewDiv.appendChild(img);

    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

/**
 * Gets the new created work
 *
 * @returns {Object} - The new created work
 */
async function getNewWork() {
  let works = await getWorks();
  const work = works[works.length - 1];
  return work;
}
