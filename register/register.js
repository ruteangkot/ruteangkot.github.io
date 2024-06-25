document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
