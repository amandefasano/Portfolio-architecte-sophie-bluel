/**
 
 * Adds an event listener on the closing button in order to close the dialog when the 
 * button is clicked.

 * @param {HTMLElement} button - the closing button

 * @param {HTMLDialogElement} dialog - the HTML dialog element in which the closing button is clicked
 
 */
export function closeDialogOnButtonClick(button, dialog) {
  button.addEventListener("click", () => {
    dialog.close();
  });
}