document.addEventListener("DOMContentLoaded", () => {
  const routesTable = document
    .getElementById("routesTable")
    .getElementsByTagName("tbody")[0];
  const routeModal = document.getElementById("routeModal");
  const modalTitle = document.getElementById("modalTitle");
  const routeForm = document.getElementById("routeForm");
  const routeIdInput = document.getElementById("routeId");
  const ruteInput = document.getElementById("rute");
  const jamOperasionalInput = document.getElementById("jamOperasional");
  const tarifInput = document.getElementById("tarif");
  const addRouteBtn = document.getElementById("addRouteBtn");
  const saveRouteBtn = document.getElementById("saveRouteBtn");
  const closeModalBtn = document.getElementsByClassName("close")[0];

  addRouteBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  window.onclick = (event) => {
    if (event.target === routeModal) {
      closeModal();
    }
  };

  routeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const routeId = routeIdInput.value;
    const rute = ruteInput.value;
    const jamOperasional = jamOperasionalInput.value;
    const tarif = tarifInput.value;
    const routeData = {
      Rute: rute,
      JamOperasional: jamOperasional,
      Tarif: tarif,
    };

    if (routeId) {
      await editRoute(routeId, routeData); // Menghapus "editModal," karena tidak diperlukan
    } else {
      await createRoute(routeData);
    }

    closeModal();
    loadRoutes();
  });

  async function loadRoutes() {
    const response = await fetch("http://localhost:3000/routes");
    const routes = await response.json();
    routesTable.innerHTML = "";

    routes.forEach((route) => {
      const row = routesTable.insertRow();
      row.innerHTML = `
        <td>${route.Rute}</td>
        <td>${route["Jam Operasional"]}</td>
        <td>${route.Tarif}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn" onclick="deleteRoute('${route._id}')">Delete</button>
        </td>
      `;

      // Menambahkan event listener untuk tombol "Edit"
      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", () => {
        editModal(route._id, route.Rute, route["Jam Operasional"], route.Tarif);
      });
    });
  }

  async function createRoute(route) {
    try {
      const response = await fetch("http://localhost:3000/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      });
      if (!response.ok) {
        throw new Error("Failed to create route");
      }
      loadRoutes();
    } catch (error) {
      console.error("Error creating route:", error);
    }
  }

  async function editRoute(routeId, route) {
    try {
      const response = await fetch(`http://localhost:3000/routes/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      });
      if (!response.ok) {
        throw new Error("Failed to update route");
      }
      loadRoutes();
    } catch (error) {
      console.error("Error updating route:", error);
    }
  }

  function editModal(id, rute, jamOperasional, tarif) {
    routeIdInput.value = id;
    ruteInput.value = rute;
    jamOperasionalInput.value = jamOperasional;
    tarifInput.value = tarif;
    modalTitle.innerText = "Edit Route";
    saveRouteBtn.innerText = "Update";
    routeModal.style.display = "block";
  }

  function openModal() {
    routeIdInput.value = "";
    ruteInput.value = "";
    jamOperasionalInput.value = "";
    tarifInput.value = "";
    modalTitle.innerText = "Add Route";
    saveRouteBtn.innerText = "Add";
    routeModal.style.display = "block";
  }

  function closeModal() {
    routeModal.style.display = "none";
  }

  loadRoutes(); // Memuat rute saat dokumen dimuat
});
