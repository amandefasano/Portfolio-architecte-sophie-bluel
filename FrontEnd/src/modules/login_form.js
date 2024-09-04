export async function submitForm(information) {
    return await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: information,
    });
  }