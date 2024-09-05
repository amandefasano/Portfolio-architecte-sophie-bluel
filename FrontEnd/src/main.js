import { buildHeader } from "./modules/header.js";
import { buildFooter } from "./modules/footer.js";
import { getCategories, fillGallery } from "./modules/works.js";

// Building the site header
buildHeader();

// Building the site footer
buildFooter();

const edit_mode_banner = document.querySelector("#edit_mode_banner");
const loginNavItem = document.querySelector("nav .login");
const editButton = document.querySelector(".edit_works a");

// Hidding the edit mode banner and buttons
edit_mode_banner.classList.add("hidden");
loginNavItem.innerText = "login";
editButton.classList.add("hidden");

// Building the administrator page
const token = window.localStorage.getItem("token");
console.log(token);

if (token !== null) {
  // Displaying the edit mode banner
  edit_mode_banner.classList.remove("hidden");

  // Changing the login item in the nav into 'logout'
  loginNavItem.innerText = "logout";

  // Displaying the edit button
  editButton.classList.remove("hidden");

  // Logging out the user
  loginNavItem.addEventListener("click", () => {
    // Removing the token from the local storage
    window.localStorage.removeItem("token");

    // Redirecting on the home page
    window.location.replace("./index.html");
  });
}

// Getting the div "gallery"
const galleryDiv = document.querySelector(".gallery");

// Getting the div "categoriesFilter"
const categoriesFilterDiv = document.querySelector(".categoriesFilter");

// Getting the categories
const categories = await getCategories();
// Building a category "Tous"
const categoryAll = {};
categoryAll.id = 0;
categoryAll.name = "Tous";
// Adding the category "Tous" in the array
categories.unshift(categoryAll);

// Putting the works in the gallery
fillGallery();

// Putting the categories buttons in the div "categoriesFilter"
for (let j = 0; j < categories.length; j++) {
  // Creating the button element
  let categoryBtnElement = document.createElement("button");
  categoryBtnElement.innerText = categories[j].name;

  // Appending the button to the div "categoriesFilter"
  categoriesFilterDiv.appendChild(categoryBtnElement);
}

// Getting all the categories buttons
const categoriesButtons = document.querySelectorAll(".categoriesFilter button");

// Adding an eventListener on each button
for (let k = 0; k < categoriesButtons.length; k++) {
  categoriesButtons[k].addEventListener("click", async () => {
    const figures = galleryDiv.children;

    for (let l = 0; l < figures.length; l++) {
      figures[l].classList.add("hidden");

      const figure_category_name = figures[l].getAttribute("category_name");
      if (categoriesButtons[k].innerText === "Tous") {
        figures[l].classList.remove("hidden");
      } else if (figure_category_name === categoriesButtons[k].innerText) {
        figures[l].classList.remove("hidden");
      }
    }
  });
}
