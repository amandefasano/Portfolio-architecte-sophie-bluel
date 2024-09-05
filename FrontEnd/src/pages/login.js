import { header } from "../modules/header.js";
import { footer } from "../modules/footer.js";
import { submitForm } from "../modules/login_form.js";

// Getting the form's information
const loginForm = document.querySelector(".login_form");

// Adding an eventListenener on the form
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const identifiers = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=pwd").value,
  };

  const JSONidentifiers = JSON.stringify(identifiers);

  
  const response = await submitForm(JSONidentifiers);
  
  if(response === 'KO') {
    const errorMsg = document.querySelector('.errorMsg');

    errorMsg.classList.remove('hidden');
  } else {
    const token = response.token;
    window.localStorage.setItem('token', token);
    
    window.location.replace("./index.html");
  }
});
