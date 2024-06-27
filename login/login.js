document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("register-link");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href =
      "https://ruteangkot.github.io/register/register.html";
  });
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

    const response = await fetch("https://ruteangkotbackend/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetail),
    });

    const message = document.getElementById("message");
    if (response.status === 200) {
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "https://ruteangkot.github.io/admin/";
        login;
      }, 2000);
    } else {
      const errorData = await response.json();
      message.textContent = `Error: ${errorData.error}`;
    }
  });
