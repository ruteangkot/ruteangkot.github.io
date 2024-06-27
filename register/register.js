document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "https://ruteangkot.github.io/login/login.html";
  });
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    const response = await fetch("https://ruteangkotbackend/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const message = document.getElementById("message");
    if (response.status === 201) {
      message.textContent = "Registration successful! Redirecting to login...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      const errorData = await response.json();
      message.textContent = `Error: ${errorData.error}`;
    }
  });
