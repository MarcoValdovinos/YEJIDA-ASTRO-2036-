
document.addEventListener("DOMContentLoaded", () => {
  // Abrir Mandala
  document.getElementById("dash-mandala").addEventListener("click", () => {
    document.getElementById("mandala-modal").style.display = "flex";
  });

  // Abrir Carta Natal
  document.getElementById("dash-natal").addEventListener("click", () => {
    document.getElementById("natal-modal").style.display = "flex";
  });

  // Abrir Quiz
  document.getElementById("dash-quiz").addEventListener("click", () => {
    document.getElementById("quiz-modal").style.display = "flex";
    document.getElementById("quiz-start").style.display = "block";
    document.getElementById("quiz-question").style.display = "none";
    document.getElementById("quiz-result").style.display = "none";
  });

  // Abrir Memoria
  document.getElementById("dash-memoria").addEventListener("click", () => {
    document.getElementById("memoria-modal").style.display = "flex";
  });

  // Mover el panel de audio y el reloj al Dashboard
  const audioPanel = document.getElementById("audio-panel");
  const reloj = document.getElementById("reloj-cabalistico");
  const innerContainer = document.getElementById("dash-media-container");

  if (audioPanel) {
    audioPanel.style.display = "block"; // Mostrar solo dentro del dash
    audioPanel.style.position = "static";
    audioPanel.style.width = "100%";
    audioPanel.style.maxWidth = "350px";
    innerContainer.appendChild(audioPanel);
  }

  if (reloj) {
    reloj.style.display = "block"; // Mostrar solo dentro del dash
    reloj.style.margin = "0";
    innerContainer.appendChild(reloj);
  }
});
