import { header } from "../modules/header.js";
import { footer } from "../modules/footer.js";
import { submitForm } from "../modules/login_form.js";

// Getting the form's information
const loginForm = document.querySelector(".login_form");

// Adding an eventListenener on the form
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.querySelector("[name=email]");
  const password = event.target.querySelector("[name=pwd");
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+.[a-z{2,}]/g;
  const pwdRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[[A-zÀ-ÿ0-9\p{P}\p{S}]{6,}/gu
  const errorMsg = document.getElementById('login_error');

  if (emailRegex.test(email.value) && pwdRegex.test(password.value)) {
    const identifiers = {
      email: email.value,
      password: password.value,
    };
  
    const JSONidentifiers = JSON.stringify(identifiers);
  
    const response = await submitForm(JSONidentifiers);
    
    if(response === 'KO') {
      errorMsg.classList.remove('hidden');
      
    } else {
      const token = response.token;
      window.localStorage.setItem('token', token);
      
      window.location.replace("./index.html");
    }

  } else {
    errorMsg.classList.remove('hidden');
  }

  email.value = "";
  password.value = "";
});
