document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(
          "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Login successful");
          // Redirect to the dashboard or another page
          window.location.href = "../admin/admin.html";
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while trying to log in.");
      }
    });
  } else {
    console.error("Login form not found!");
  }
});
