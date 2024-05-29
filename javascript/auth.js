document
  .getElementById("admin-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var username = prompt("Enter username:");
    var password = prompt("Enter password:");

    // Simple hardcoded authentication for demonstration purposes
    if (username === "admin" && password === "password") {
      window.location.href = "admin/index.html";
    } else {
      alert("Authentication failed. Incorrect username or password.");
    }
  });
