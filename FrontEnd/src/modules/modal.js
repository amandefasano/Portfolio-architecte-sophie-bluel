const dialog = document.querySelector("dialog");

dialog.innerHTML = `
 <div class="close_modal">
  <img id="close_modal" src="./assets/icons/xmark.svg" alt="closing cross icon">
 </div>
 <div class="modal_body">
  <h3>Galerie photo</h3>
  <div class="modal_gallery"></div>
  <img src="./assets/icons/bar.svg" alt="bar icon">
  <button>Ajouter une photo</button>
 </div>
`;

// Importing the photos
let works = window.localStorage.getItem("works");

if (works !== null) {
  works = JSON.parse(works);

  const modalGalleryElement = document.querySelector(".modal_gallery");

  for (let i = 0; i < works.length; i++) {
    const workDiv = document.createElement("div");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/icons/delete.svg";
    deleteIcon.alt = "trash can icon";
    deleteIcon.classList.add("delete_work");

    const modalGalleryImg = document.createElement("img");
    modalGalleryImg.src = works[i].imageUrl;
    modalGalleryImg.setAttribute("work_id", works[i].id);
    modalGalleryImg.classList.add("modal_work");

    workDiv.appendChild(deleteIcon);
    workDiv.appendChild(modalGalleryImg);

    modalGalleryElement.appendChild(workDiv);
  }
}

export const modal = dialog;

/**
 
 * Detects if the event took place inside the dialog or not.

 * @param {Event} event - the event that happened inside or outside the dialog 

 * @param {HTMLDialogElement} dialog - the HTML dialog element inside or outside which the event happened

 * @returns {Boolean} 
 
 */
export function isInDialog(event, dialog) {
  let rect = dialog.getBoundingClientRect();

  return (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
}
