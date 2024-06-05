document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validasi login hanya untuk admin
    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      // Redirect to the admin page or perform any other action
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Invalid username or password");
    }
  });
