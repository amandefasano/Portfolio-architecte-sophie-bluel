/**
 
 * Sends a post request to the api with the information writen in the login form by the user.

 * @returns {Array} - A javascript array that contains the response body if there is no error.

 * @returns {String} - A string "KO" if there is an error.
 
 */
export async function submitForm(information) {
  return await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: information,
  }).then((response)=>{
    if (!response.ok) {
      return "KO";
    }
    return response.json();
});
}
