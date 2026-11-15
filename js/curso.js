
document.addEventListener("DOMContentLoaded", () => {
  // Control de Modales
  ['curso', 'ofiuco', 'meditacion'].forEach(mod => {
    document.getElementById(`dash-${mod}`).addEventListener('click', () => {
      document.getElementById(`${mod}-modal`).style.display = 'flex';
    });
    document.getElementById(`btn-close-${mod}`).addEventListener('click', () => {
      document.getElementById(`${mod}-modal`).style.display = 'none';
    });
  });

  // --- 1. ACORDEÓN DEL CURSO ---
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // --- 2. TEMPORIZADOR DE MEDITACIÓN ---
  let timerInterval;
  let timeLeft = 300; // 5 minutos
  const display = document.getElementById('timer-display');
  const btnStart = document.getElementById('btn-start-meditacion');

  btnStart.addEventListener('click', () => {
    if (timerInterval) {
      // Detener
      clearInterval(timerInterval);
      timerInterval = null;
      btnStart.innerText = 'Iniciar (5 min)';
      btnStart.style.background = '#00ffcc';
      timeLeft = 300;
      updateDisplay();
      return;
    }
    
    // Iniciar
    btnStart.innerText = 'Detener';
    btnStart.style.background = '#ff3300';
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        btnStart.innerText = 'Iniciar (5 min)';
        btnStart.style.background = '#00ffcc';
        timeLeft = 300;
        
        // Reproducir un tono de finalización (usando la Web Audio API nativa)
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 528; // Frecuencia de paz
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 3);
        
        alert("Práctica de Hitbodedut completada. Has regresado en paz.");
      }
    }, 1000);
  });

  function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
  }
  updateDisplay();
});
