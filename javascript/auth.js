document
  .getElementById("admin-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var username = prompt("Masukan username:");
    var password = prompt("Masukan password:");

    if (username === "admin" && password === "password") {
      window.location.href = "admin/index.html";
    } else {
      alert("Autentikasi gagal. Kesalahan username atau password.");
    }
  });
