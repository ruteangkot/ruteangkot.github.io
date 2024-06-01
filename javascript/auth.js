document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Authentication failed. Invalid username or password."
          );
        }
        // Redirect to admin page if authentication successful
        window.location.href = "admin/index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
