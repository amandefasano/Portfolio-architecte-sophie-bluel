import { header } from "./modules/header.js";
import { footer } from "./modules/footer.js";
import { categoriesFilter } from "./modules/categories_filter.js";
import { manageWorksModal } from "./pages/manage_works_modal.js"
import { fillGallery } from "./modules/works.js";

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

// Manage works modal
// Opening the modal and preventing the autofocus behavior
editButton.addEventListener("click", () => {
  manageWorksModal.inert = true;
  manageWorksModal.showModal();
  manageWorksModal.inert = false;
});

// Logging out the user
loginNavItem.addEventListener("click", () => {
  // Removing the token from the local storage
  window.localStorage.removeItem("token");
});
