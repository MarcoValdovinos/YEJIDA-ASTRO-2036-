
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("multiverso-modal");
  const btnClose = document.getElementById("btn-close-multiverso");
  
  document.getElementById("dash-multiverso").addEventListener("click", () => {
    let stardust = parseInt(localStorage.getItem("stardust_y") || "0");
    
    if (stardust < 100) {
      alert(`🔒 Portal bloqueado. Necesitas 100 de Polvo de Estrella para entrar al Multiverso.\n\nActualmente tienes: ${stardust} ✨\n\nJuega a la Trivia o recoge Polvo en el Oráculo para desbloquearlo.`);
      return;
    }
    
    modal.style.display = "flex";
    
    // Activar frecuencia 963Hz automáticamente
    const freqSelect = document.getElementById("freq-select");
    const btnPlay = document.getElementById("btn-play-audio");
    if (freqSelect && btnPlay) {
      freqSelect.value = "963";
      if (btnPlay.innerHTML.includes("Iniciar")) {
        btnPlay.click(); // Simula el clic para encender el audio
      }
    }
  });

  btnClose.addEventListener("click", () => {
    modal.style.display = "none";
    // Detener audio al salir
    const btnPlay = document.getElementById("btn-play-audio");
    if (btnPlay && btnPlay.innerHTML.includes("Detener")) {
      btnPlay.click();
    }
  });
});
