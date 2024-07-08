document
  .getElementById("reset-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    fetch(
      "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("message").innerText = data.message;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
