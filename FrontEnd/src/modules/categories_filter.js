import { getCategories } from "./works.js";

// Getting the div "categoriesFilter"
const categoriesFilterDiv = document.querySelector(".categoriesFilter");

// Getting the categories
let categories = window.localStorage.getItem("categories");
if (categories !== null) {
  categories = JSON.parse(categories);
} else {
  categories = await getCategories();
  const cateogriesValues = JSON.stringify(categories);
  window.localStorage.setItem("categories", cateogriesValues);
}

// Building a category "Tous"
const categoryAll = {};
categoryAll.id = 0;
categoryAll.name = "Tous";
// Adding the category "Tous" in the array
categories.unshift(categoryAll);

// Putting the categories buttons in the div "categoriesFilter"
for (let j = 0; j < categories.length; j++) {
  // Creating the button element
  let categoryBtnElement = document.createElement("button");
  categoryBtnElement.innerText = categories[j].name;

  // Appending the button to the div "categoriesFilter"
  categoriesFilterDiv.appendChild(categoryBtnElement);
}

// Getting the div "gallery"
const galleryDiv = document.querySelector(".gallery");

// Getting all the categories buttons
const categoriesButtons = document.querySelectorAll(".categoriesFilter button");

// Adding an eventListener on each button
categoriesButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const figures = galleryDiv.children;

    for (let l = 0; l < figures.length; l++) {
      figures[l].classList.add("hidden");

      const figure_category_name = figures[l].getAttribute("category_name");
      if (button.innerText === "Tous") {
        figures[l].classList.remove("hidden");
      } else if (figure_category_name === button.innerText) {
        figures[l].classList.remove("hidden");
      }
    }
  });
});

export const categoriesFilter = categoriesFilterDiv;
