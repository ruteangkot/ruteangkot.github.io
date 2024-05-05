// Membuat objek XMLHttpRequest
var xhr = new XMLHttpRequest();

// Mengatur tindakan yang dilakukan ketika permintaan selesai
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // Jika permintaan berhasil dan status kode adalah 200 (OK)
      var data = JSON.parse(xhr.responseText);
      populateTable(data); // Memanggil fungsi untuk menampilkan data dalam tabel
    } else {
      console.error("Failed to load JSON file"); // Jika permintaan gagal
    }
  }
};

// Mengirimkan permintaan GET ke file JSON
xhr.open("GET", "data.json", true);
xhr.send();

// Fungsi untuk menampilkan data dalam tabel
function populateTable(data) {
  var tableBody = document.querySelector("#data-table tbody");
  data.forEach((el) => {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${el.id}</td>
      <td>${el.Rute}</td>
      <td>${el["Jam Operasional"]}</td>
      <td>${el.Tarif}</td>
    `;
    tableBody.appendChild(row);
  });
}
