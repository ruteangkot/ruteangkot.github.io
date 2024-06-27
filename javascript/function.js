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

// connect admin
const adminlink = document.getElementById("adminLink");
adminlink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href("https://ruteangkot.github.io/register/register.html");
});

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
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("inputCari");
  filter = input.value.toUpperCase();
  table = document.querySelector("#data-container table");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    var rowVisible = false;
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          rowVisible = true;
          break;
        }
      }
    }
    tr[i].style.display = rowVisible ? "" : "none";
  }
}

document.getElementById("inputCari").addEventListener("input", function () {
  cari();
});

window.onload = function () {
  loadData();
};
