/**
 
 * Adds an event listener on the closing button in order to close the dialog when the 
 * button is clicked.

 * @param {HTMLElement} button - the closing button

 * @param {HTMLDialogElement} dialog - the HTML dialog element in which the closing button is clicked
 
 */
export function closeDialogOnButtonClick(button, dialog) {
  button.addEventListener("click", () => {
    dialog.close();
  })
}

/**
 
 * Adds an event listener on the dialog in order to close the dialog when the backdrop is clicked.

 * @param {HTMLDialogElement} dialog - the HTML dialog element outside which the backdrop is clicked
 
 */
export function closeDialogOnBackdropClick(dialog) {
  dialog.addEventListener("click", (event) => {
    if (!isInDialog(event, dialog)) {
      dialog.close();
    }
  });
}

/**
 
 * Detects if the event took place inside the dialog or not.

 * @param {Event} event - the event that happened inside or outside the dialog 

 * @param {HTMLDialogElement} dialog - the HTML dialog element inside or outside which the event happened

 * @returns {Boolean} 
 
 */
function isInDialog(event, dialog) {
  let rect = dialog.getBoundingClientRect();

  return (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
}
