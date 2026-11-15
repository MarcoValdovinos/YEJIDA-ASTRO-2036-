
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("padrinos-modal");
  const btnClose = document.getElementById("btn-close-padrinos");
  const list = document.getElementById("padrinos-list");
  const input = document.getElementById("padrino-name");

  document.getElementById("dash-padrinos").addEventListener("click", () => {
    modal.style.display = "flex";
    renderList();
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  // Cargar lista inicial
  let padrinos = JSON.parse(localStorage.getItem("padrinos_yejida") || '["Marco", "Los Gatitos"]');

  document.getElementById("btn-add-padrino").addEventListener("click", () => {
    const name = input.value.trim();
    if (name && !padrinos.includes(name)) {
      padrinos.push(name);
      localStorage.setItem("padrinos_yejida", JSON.stringify(padrinos));
      input.value = "";
      renderList();
    }
  });

  function renderList() {
    list.innerHTML = padrinos.map(p => `<li>🐾 <strong>${p}</strong> - Protector Estelar</li>`).join("");
  }
});
