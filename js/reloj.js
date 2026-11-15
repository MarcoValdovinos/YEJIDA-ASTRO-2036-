
document.addEventListener("DOMContentLoaded", () => {
  const clockDisplay = document.getElementById("planet-clock");
  
  // Tradición de las Horas Planetarias (Orden Caldeo)
  const planets = ["♄ Saturno", "♃ Júpiter", "♂ Marte", "☉ Sol", "♀ Venus", "☿ Mercurio", "☽ Luna"];
  
  function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    
    // Aproximación: Dividimos el día en 24 horas y asignamos los planetas cíclicamente
    // (Una hora planetaria real depende del amanecer local, esta es una aproximación visual diurna/nocturna)
    const planetIndex = hour % 7;
    const planet = planets[planetIndex];
    
    // Reloj visual
    const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    if (clockDisplay) {
      clockDisplay.innerHTML = `
        <div style="font-size: 0.8rem; color: #a69bbd; letter-spacing: 2px;">HORA PLANETARIA ACTUAL</div>
        <div style="font-size: 2rem; color: #fff; font-family: 'Cinzel', serif; margin: 5px 0; text-shadow: 0 0 10px rgba(180,100,255,0.8);">${planet}</div>
        <div style="font-size: 1.2rem; color: #00ffcc; font-family: monospace;">${timeString}</div>
      `;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();
});
