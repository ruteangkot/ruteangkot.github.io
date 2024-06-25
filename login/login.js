document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const message = document.getElementById("message");
    if (response.status === 200) {
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "home.html"; // Redirect to the home page or another page after login
      }, 2000);
    } else {
      const errorData = await response.json();
      message.textContent = `Error: ${errorData.error}`;
    }
  });
