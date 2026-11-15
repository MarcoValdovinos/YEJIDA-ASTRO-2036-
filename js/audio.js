
document.addEventListener("DOMContentLoaded", () => {
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isPlaying = false;

  const btnPlay = document.getElementById("btn-play-audio");
  const freqLabel = document.getElementById("current-freq");
  const selectFreq = document.getElementById("freq-select");
  const audioStatus = document.getElementById("audio-status");

  function playTone(freq) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (oscillator) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
      }, 500);
    }

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Volumen bajo para no lastimar los oídos
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    
    freqLabel.innerText = freq + " Hz";
    audioStatus.style.opacity = 1;
    btnPlay.innerHTML = "🛑 Detener Frecuencia";
    isPlaying = true;
  }

  function stopTone() {
    if (oscillator && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
      }, 500);
      audioStatus.style.opacity = 0;
      freqLabel.innerText = "--- Hz";
      btnPlay.innerHTML = "▶ Iniciar Frecuencia";
      isPlaying = false;
    }
  }

  btnPlay.addEventListener("click", () => {
    if (isPlaying) {
      stopTone();
    } else {
      playTone(parseInt(selectFreq.value));
    }
  });

  selectFreq.addEventListener("change", () => {
    if (isPlaying) {
      playTone(parseInt(selectFreq.value));
    }
  });
});
