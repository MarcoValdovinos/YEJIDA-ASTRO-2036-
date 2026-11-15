
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("perfil-modal");
  const btnClose = document.getElementById("btn-close-perfil");
  
  document.getElementById("dash-perfil").addEventListener("click", () => {
    modal.style.display = "flex";
    updateProfile();
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  function updateProfile() {
    const stardust = parseInt(localStorage.getItem("stardust_y") || "0");
    const streak = parseInt(localStorage.getItem("streak_y") || "1");
    
    // 1. Determinar el Rango
    let rank = "Iniciado";
    let nextLevelPoints = 50;
    let color = "#a69bbd";

    if (stardust >= 300) { rank = "Maestro Ascendido"; nextLevelPoints = 500; color = "#ffcc00"; }
    else if (stardust >= 150) { rank = "Mago Estelar"; nextLevelPoints = 300; color = "#00ffcc"; }
    else if (stardust >= 50) { rank = "Adepto de la Luz"; nextLevelPoints = 150; color = "#ff66cc"; }

    document.getElementById("perfil-rank").innerText = rank;
    document.getElementById("perfil-rank").style.color = color;
    document.getElementById("perfil-points").innerText = `${stardust} / ${nextLevelPoints} ✨`;
    document.getElementById("perfil-streak").innerText = `🔥 Racha: ${streak} días`;

    // Barra de progreso al siguiente nivel
    let percentage = (stardust / nextLevelPoints) * 100;
    if (percentage > 100) percentage = 100;
    document.getElementById("perfil-progress").style.width = percentage + "%";

    // 2. Logros (Medallas)
    // Verificamos acciones cruzando datos del localStorage
    const hasMandala = localStorage.getItem("mandala_gen") ? true : false;
    const hasNatal = localStorage.getItem("natal_gen") ? true : false;
    const hasPlayed = stardust > 0 ? true : false; // Si tiene puntos, jugó

    document.getElementById("badge-mandala").className = hasMandala ? "badge unlocked" : "badge locked";
    document.getElementById("badge-natal").className = hasNatal ? "badge unlocked" : "badge locked";
    document.getElementById("badge-play").className = hasPlayed ? "badge unlocked" : "badge locked";
  }
});
