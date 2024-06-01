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
    const routeData = {
      Rute: rute,
      JamOperasional: jamOperasional,
      Tarif: tarif,
    };

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
                      <button class="edit-btn" onclick="editRoute('${route._id}', '${route.Rute}', '${route["Jam Operasional"]}', '${route.Tarif}')">Edit</button>
                      <button class="delete-btn" onclick="deleteRoute('${route._id}')">Delete</button>
                  </td>
              `;
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
      loadRoutes(); // Reload routes after successful creation
    } catch (error) {
      console.error("Error creating route:", error);
    }
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

  loadRoutes();
});
