// Select elements
const destinationInput = document.getElementById("destination-input");
const searchButton = document.getElementById("search-button");
const resultDiv = document.getElementById("result");

// Create table
const routeTable = document.createElement("table");
routeTable.id = "route-table";
document.body.appendChild(routeTable);

// Add rows to table
const rows = [
  ["Jurusan", "Rute"],
  ["Terminal", "Terminal - Pasar - Terminal"],
  ["Pasar", "Pasar - Terminal - Pasar"],
  ["Stasiun", "Stasiun - Pasar - Stasiun"],
  ["Terminal", "Terminal - Stasiun - Terminal"],
];

for (let i = 0; i < rows.length; i++) {
  const row = routeTable.insertRow();
  for (let j = 0; j < rows[i].length; j++) {
    const cell = row.insertCell();
    cell.innerText = rows[i][j];
    cell.style.padding = "8px 16px";
  }
}

// Add event listener to search button
searchButton.addEventListener("click", () => {
  // Get the input value
  const destination = destinationInput.value.trim();

  // Check if the input is empty
  if (destination === "") {
    alert("Masukkan tujuan terlebih dahulu!");
    return;
  }

  // Search for the route in the table
  let foundRoute = false;
  for (let i = 1; i < routeTable.rows.length; i++) {
    const row = routeTable.rows[i];
    const destinationCell = row.cells[0];
    const routeCell = row.cells[1];

    if (destinationCell.innerText.includes(destination)) {
      // Change the background color of the row
      row.style.backgroundColor = "yellow";

      // Show the result
      resultDiv.innerText = `Rute yang sesuai: ${destinationCell.innerText} - ${routeCell.innerText}`;
      foundRoute = true;
      break;
    } else {
      // Reset the background color of the row
      row.style.backgroundColor = "";
    }
  }

  // If no route is found, show a message
  if (!foundRoute) {
    resultDiv.innerText = "Rute tidak ditemukan.";
  }
});
// Create footer
const footer = document.createElement("footer");
footer.classList.add("footer");
document.body.appendChild(footer);

// Add content to footer
const container = document.createElement("div");
container.classList.add("container");
footer.appendChild(container);

const contact = document.createElement("p");
contact.textContent = "Hubungi kami:";
container.appendChild(contact);

const contactList = document.createElement("ul");
contact.appendChild(contactList);

const email = document.createElement("li");
email.textContent = "Email: info@angkot-routefinder.com";
contactList.appendChild(email);

const phone = document.createElement("li");
phone.textContent = "Telepon: 021-1234567";
contactList.appendChild(phone);

const address = document.createElement("li");
address.textContent = "Alamat: Jl. Angkot No. 1, Jakarta, Indonesia";
contactList.appendChild(address);

const social = document.createElement("p");
social.textContent = "Ikuti kami di media sosial:";
container.appendChild(social);

const socialList = document.createElement("ul");
social.appendChild(socialList);

const facebook = document.createElement("li");
const facebookLink = document.createElement("a");
facebookLink.href = "https://www.facebook.com/angkot.routefinder";
facebookLink.textContent = "Facebook";
facebook.appendChild(facebookLink);
socialList.appendChild(facebook);

const twitter = document.createElement("li");
const twitterLink = document.createElement("a");
twitterLink.href = "https://twitter.com/angkot_routefinder";
twitterLink.textContent = "Twitter";
twitter.appendChild(twitterLink);
socialList.appendChild(twitter);

const instagram = document.createElement("li");
const instagramLink = document.createElement("a");
instagramLink.href = "https://www.instagram.com/angkot.routefinder";
instagramLink.textContent = "Instagram";
instagram.appendChild(instagramLink);
socialList.appendChild(instagram);
