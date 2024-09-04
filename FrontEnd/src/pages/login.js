import { buildHeader } from "../modules/header.js";
import { buildFooter } from "../modules/footer.js";
import { submitForm } from "../modules/login_form.js";

buildHeader();
buildFooter();

// Getting the form's information
const loginForm = document.querySelector(".login_form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const identifiers = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=pwd").value,
  };

  const JSONidentifiers = JSON.stringify(identifiers);

  const response = await submitForm(JSONidentifiers);
  console.log(response);
});
