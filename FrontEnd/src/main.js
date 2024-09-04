import { buildHeader } from "./modules/header.js";
import { buildFooter } from "./modules/footer.js";
import { getCategories, fillGallery } from "./modules/works.js";

// Building the site header
buildHeader();

// Building the site footer
buildFooter();

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

// Building the administrator page
const token = window.localStorage.getItem("token");

if (token !== null) {
  // Displaying the edit mode banner
  const edit_mode_banner = document.querySelector("#edit_mode_banner");
  edit_mode_banner.classList.remove('hidden');
  
  // Changing the login item in the nav
  const loginNavItem = document.querySelector('nav .login');
  loginNavItem.innerText = "logout";

  // Creating an edit button
  const divEditWorks = document.querySelector(".edit_works");

  const editIcon = document.createElement("img");
  editIcon.src = "./assets/icons/edit.svg";

  const edit = document.createElement("p");
  edit.innerText = "modifier";

  divEditWorks.appendChild(editIcon);
  divEditWorks.appendChild(edit);
}
