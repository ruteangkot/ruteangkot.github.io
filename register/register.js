document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "https://ruteangkot.github.io/login/login.html";
  });

  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const confirmPassword = document.getElementById("confirm_password");

  togglePassword.addEventListener("click", () => {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "Show" : "Hide";
  });

  toggleConfirmPassword.addEventListener("click", () => {
    const type =
      confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    toggleConfirmPassword.textContent = type === "password" ? "Show" : "Hide";
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;

      if (password !== confirmPassword) {
        alert("Passwords nya ga sama nih...");
        return;
      }

      const response = await fetch(
        "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const message = document.getElementById("message");
      if (response.status === 201) {
        message.textContent =
          "Registration successful! Redirecting to login...";
        setTimeout(() => {
          window.location.href = "https://ruteangkot.github.io/admin";
        }, 2000);
      } else {
        const errorData = await response.json();
        message.textContent = `Error: ${errorData.error}`;
      }
    });
});
