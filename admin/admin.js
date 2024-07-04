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
  const logoutLink = document.getElementById("logoutLink");

  tarifInput.addEventListener("input", () => {
    let tarifValue = tarifInput.value.trim();
    if (!tarifValue.startsWith("Rp")) {
      tarifValue = "Rp " + tarifValue;
    }
    tarifInput.value = tarifValue;
  });

  tarifInput.addEventListener("focus", () => {
    let tarifValue = tarifInput.value.trim();

    if (tarifValue.startsWith("Rp")) {
      tarifValue = tarifValue.slice(3);
      tarifInput.value = tarifValue;
    }
  });

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    const userConfirmed = confirm("Apakah Anda yakin ingin keluar?");
    if (userConfirmed) {
      window.location.href = "https://ruteangkot.github.io/";
    }
  });

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
      id: routeId,
      Rute: rute,
      JamOperasional: jamOperasional,
      Tarif: tarif,
    };

    if (routeId) {
      // Jika routeId diberikan, maka jalankan fungsi editRoute
      await editRoute(routeId, routeData);
    } else {
      // Jika tidak dikonfirmasi, jalankan fungsi createRoute
      await createRoute(routeData);
    }
    closeModal();
    loadRoutes();
  });

  async function loadRoutes() {
    const response = await fetch(
      "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/data"
    );
    const routes = await response.json();
    routesTable.innerHTML = "";

    routes.forEach((route) => {
      const row = routesTable.insertRow();
      row.innerHTML = `
        <td>${route.Rute}</td>
        <td>${route["Jam Operasional"]}</td>
        <td>${route.Tarif}</td>
        <td>
          <button class="edit-btn"><span>Edit</span></button>
          <button class="delete-btn"><span>Delete</span></button>
        </td>
      `;

      // Menambahkan event listener untuk tombol "Edit"
      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", () => {
        editModal(route.id, route.Rute, route["Jam Operasional"], route.Tarif);
      });

      // Menambahkan event listener untuk tombol "Delete"
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        if (confirm("Apakah Anda yakin ingin menghapus rute?")) {
          await deleteRoute(route.id);
        }
      });
    });
  }

  async function createRoute(route) {
    try {
      const response = await fetch(
        "https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Rute: route.Rute,
            "Jam Operasional": route.JamOperasional, // Menggunakan kunci "Jam Operasional"
            Tarif: route.Tarif,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create route");
      }
      alert("Berhasil Menambahkan Rute!");
      loadRoutes();
    } catch (error) {
      console.error("Error creating route:", error);
    }
  }

  async function editRoute(routeId, route) {
    try {
      const response = await fetch(
        `https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/data`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: route.id,
            Rute: route.Rute,
            "Jam Operasional": route.JamOperasional, // Menggunakan kunci "Jam Operasional"
            Tarif: route.Tarif,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update route");
      }
      alert("Rute Berhasil Di Update!");
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

  async function deleteRoute(route) {
    try {
      const response = await fetch(
        `https://asia-southeast2-awangga.cloudfunctions.net/ruteangkot/data`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: route,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete route");
      }
      loadRoutes(); // Memuat ulang daftar rute setelah menghapus
    } catch (error) {
      console.error("Error deleting route:", error);
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

  loadRoutes(); // Memuat rute saat dokumen dimuat
});
