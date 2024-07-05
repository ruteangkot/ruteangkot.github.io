document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("register-link");
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const message = document.getElementById("message");
  const resetPasswordLink = document.getElementById("reset-password-link");
  const resetPasswordModal = document.getElementById("resetPasswordModal");
  const closeModal = document.querySelector(".close");
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  // Toggle Password Visibility
  togglePassword.addEventListener("click", () => {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // Handle Login
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginDetail = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch(
          "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetail),
          }
        );

        if (response.status === 200) {
          message.textContent = "Login berhasil! Tunggu sebentar...";
          setTimeout(() => {
            window.location.href = "https://ruteangkot.github.io/admin/";
          }, 2000);
        } else {
          const errorData = await response.json();
          message.textContent = `Password salah. Coba lagi.`;
          if (errorData.error.toLowerCase().includes("password")) {
            message.textContent = "Password salah. Coba lagi.";
          }
        }
      } catch (error) {
        message.textContent = `Error: ${error.message}`;
        console.error("Error during login:", error);
      }
    });

  // Show Reset Password Modal
  resetPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    resetPasswordModal.style.display = "block";
  });

  // Close Modal
  closeModal.addEventListener("click", () => {
    resetPasswordModal.style.display = "none";
  });

  // Submit Reset Password Form
  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;

    try {
      const response = await fetch(
        "http://localhost:8080/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      alert(data.message);
      resetPasswordModal.style.display = "none";
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error during password reset request:", error);
    }
  });

  // Redirect to Register Page
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href =
      "https://ruteangkot.github.io/register/register.html";
  });
});
