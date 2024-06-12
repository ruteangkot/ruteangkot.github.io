document.addEventListener("DOMContentLoaded", () => {
  // Event listener untuk tautan Admin Page
  const adminLink = document.getElementById("admin-link");

  adminLink.addEventListener("click", (event) => {
    event.preventDefault(); // Mencegah default action dari tautan

    // Arahkan ke halaman login
    window.location.href = "../login/login.html";
  });

  //Connect HTML
  function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          displayData(data);
        } else {
          console.error("Gagal memuat data: " + xhr.status);
        }
      }
    };
    xhr.open(
      "GET",
      "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/data",
      true
    );
    xhr.send();
  }

  function displayData(data) {
    var container = document.getElementById("data-container");
    var html = "";

    html += "<table>";
    html += "<tr><th>Rute</th><th>Jam Operasional</th><th>Tarif</th></tr>";
    data.forEach(function (item) {
      html +=
        "<tr><td>" +
        item.Rute +
        "</td><td>" +
        item["Jam Operasional"] +
        "</td><td>" +
        item.Tarif +
        "</td></tr>";
    });
    html += "</table>";

    container.innerHTML = html;
  }

  //Placeholder
  function cari() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputCari");
    filter = input.value.toUpperCase();
    table = document.querySelector("#data-container table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  document.getElementById("inputCari").addEventListener("input", function () {
    cari();
  });

  window.onload = function () {
    loadData();
  };
});
