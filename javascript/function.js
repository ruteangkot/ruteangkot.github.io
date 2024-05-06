const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://ruteangkot.github.io/";

fetch("./data/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const tableData = data.data;
    const tableHtml = "";
    tableData.forEach((row) => {
      tableHtml += `
        <tr>
          <td>${row.Rute}</td>
          <td>${row["Jam Operasional"]}</td>
          <td>${row.Tarif}</td>
        </tr>
      `;
    });
    document
      .getElementById("table-container")
      .querySelector("tbody").innerHTML = tableHtml;
  })
  .catch((error) => {
    console.error("error:", error);
  });
