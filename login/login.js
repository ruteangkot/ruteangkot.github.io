document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("register-link");
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const message = document.getElementById("message");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href =
      "https://ruteangkot.github.io/register/register.html";
  });

  togglePassword.addEventListener("click", () => {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

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
          message.textContent = "Login nya berhasil mangg! Tunggu sebentar...";
          setTimeout(() => {
            window.location.href = "https://ruteangkot.github.io/admin/";
          }, 2000);
        } else {
          const errorData = await response.json();
          message.textContent = `Error: ${errorData.error}`;
          if (errorData.error.toLowerCase().includes("password")) {
            alert("Password salah nih. Coba lagi.");
          }
        }
      } catch (error) {
        message.textContent = `Error: ${error.message}`;
        console.error("Error during login:", error);
      }
    });
});
