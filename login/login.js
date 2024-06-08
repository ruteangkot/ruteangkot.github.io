document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Membuat objek payload untuk dikirim ke server
    const payload = {
      username: username,
      password: password,
    };

    // Mengirim permintaan POST ke server
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Memeriksa respons JSON dari server
        if (data.message === "Login successful!") {
          alert(data.message);
          // Redirect ke halaman admin jika login berhasil
          window.location.href = "../admin/index.html";
        } else {
          alert(data.error || "Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("There was an error:", error);
        alert("An error occurred. Please try again later.");
      });
  });
