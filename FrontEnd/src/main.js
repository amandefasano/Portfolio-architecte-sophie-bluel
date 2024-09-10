import { header } from "./modules/header.js";
import { footer } from "./modules/footer.js";
import { categoriesFilter } from "./modules/categories_filter.js";
import { modal, isInDialog } from "./modules/modal.js";
import { deleteWork, fillGallery } from "./modules/works.js";

// Hidding the edit mode banner and buttons
const edit_mode_banner = document.querySelector(".edit_mode_banner");
const loginNavItem = document.querySelector("nav .login");
const editButton = document.querySelector(".edit_works");

edit_mode_banner.classList.add("hidden");
loginNavItem.innerText = "login";
editButton.classList.add("hidden");

// Putting the works in the gallery
fillGallery();

// Building the administrator page
const token = window.localStorage.getItem("token");

if (token !== null) {
  // Displaying the edit mode banner
  edit_mode_banner.classList.remove("hidden");

  // Changing the login item in the nav into 'logout'
  loginNavItem.innerText = "logout";

  // Displaying the edit button
  editButton.classList.remove("hidden");
}

// Modal
const closeButton = document.querySelector("#close_modal");

// Opening the modal and preventing the autofocus behavior
editButton.addEventListener("click", () => {
  modal.inert = true;
  modal.showModal();
  modal.inert = false;
});

// Closing the modal when click on the background
modal.addEventListener("click", (event) => {
  if (!isInDialog(event, modal)) {
    modal.close();
  }
});

// Closing the modal when click on close button
closeButton.addEventListener("click", () => {
  modal.close();
});

// Deleting a work
const modalWorks = document.querySelectorAll(".modal_gallery")[0].children;

// on each delete button
for (let i = 0; i < modalWorks.length; i++) {
  const deleteWorkButton = modalWorks[i].firstChild;
  const work = modalWorks[i].lastChild;
  const work_id = work.getAttribute("work_id");

  const galleryWorks = document.querySelector(".gallery").children;
  // console.log(galleryWorks);

  // when the delete button number i is clicked
  deleteWorkButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let response = await deleteWork(work_id);
    
    if(response.ok) {
    // updating the local storage
    window.localStorage.removeItem("works");

    // updating the modal gallery
    modalWorks[i].parentNode.removeChild(modalWorks[i]);

    // updating the gallery
    galleryWorks[i].parentNode.removeChild(galleryWorks[i]);
    }
    
  });
}

// Logging out the user
loginNavItem.addEventListener("click", () => {
  // Removing the token from the local storage
  window.localStorage.removeItem("token");
});
