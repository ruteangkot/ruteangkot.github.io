document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username.length < 3) {
      alert("Username harus lebih dari 2 karakter");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
