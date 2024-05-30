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

  addRouteBtn.addEventListener("click", () => {
    openModal();
  });

  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });

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
    const routeData = { rute, jamOperasional, tarif };

    if (routeId) {
      // Update route
      await updateRoute(routeId, routeData);
    } else {
      // Create new route
      await createRoute(routeData);
    }

    closeModal();
    loadRoutes();
  });

  async function loadRoutes() {
    const response = await fetch("/routes");
    const routes = await response.json();
    routesTable.innerHTML = "";

    routes.forEach((route) => {
      const row = routesTable.insertRow();
      row.innerHTML = `
                  <td>${route._id}</td>
                  <td>${route.Rute}</td>
                  <td>${route["Jam Operasional"]}</td>
                  <td>${route.Tarif}</td>
                  <td>
                      <button onclick="editRoute('${route._id}', '${route.Rute}', '${route["Jam Operasional"]}', '${route.Tarif}')">Edit</button>
                      <button onclick="deleteRoute('${route._id}')">Delete</button>
                  </td>
              `;
    });
  }

  async function createRoute(route) {
    await fetch("/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route),
    });
  }

  async function updateRoute(id, route) {
    await fetch(`/routes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route),
    });
  }

  async function deleteRoute(id) {
    await fetch(`/routes/${id}`, {
      method: "DELETE",
    });
    loadRoutes();
  }

  window.editRoute = (id, rute, jamOperasional, tarif) => {
    openModal(id, rute, jamOperasional, tarif);
  };

  function openModal(id = "", rute = "", jamOperasional = "", tarif = "") {
    routeIdInput.value = id;
    ruteInput.value = rute;
    jamOperasionalInput.value = jamOperasional;
    tarifInput.value = tarif;
    modalTitle.textContent = id ? "Edit Rute" : "Tambah Rute";
    routeModal.style.display = "block";
  }

  function closeModal() {
    routeModal.style.display = "none";
    routeForm.reset();
    routeIdInput.value = "";
  }

  loadRoutes();
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logoutLink");

  logoutLink.addEventListener("click", () => {
    alert("Logging out...");
    window.location.href = "../index.html";
  });
});
