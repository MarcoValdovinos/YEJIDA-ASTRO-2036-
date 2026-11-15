
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("sinastria-modal");
  const btnClose = document.getElementById("btn-close-sinastria");
  
  document.getElementById("dash-sinastria").addEventListener("click", () => modal.style.display = "flex");
  btnClose.addEventListener("click", () => modal.style.display = "none");

  document.getElementById("btn-calc-sinastria").addEventListener("click", () => {
    const d1 = document.getElementById("sin-date1").value;
    const d2 = document.getElementById("sin-date2").value;
    const res = document.getElementById("sin-result");
    
    if(!d1 || !d2) return alert("Ingresa ambas fechas.");

    const date1 = new Date(d1 + "T12:00:00Z");
    const date2 = new Date(d2 + "T12:00:00Z");

    // Calcular longitud solar real para ambos
    const lon1 = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, date1, true)).elon;
    const lon2 = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, date2, true)).elon;
    
    // Diferencia angular
    let diff = Math.abs(lon1 - lon2);
    if (diff > 180) diff = 360 - diff;

    let aspecto = "Neutral";
    let color = "#a69bbd";
    let msg = "Sus energías fluyen en direcciones distintas. Hay independencia.";

    if (diff <= 8 || diff >= 172) { aspecto = "Conjunción ☌"; color = "#ffcc00"; msg = "Fusión total. Se entienden sin hablar, pero pueden chocar por falta de espacio."; }
    else if (Math.abs(diff - 60) <= 6) { aspecto = "Sextil ⚹"; color = "#00ffcc"; msg = "Oportunidad y comunicación fluida. Una amistad o romance muy estimulante."; }
    else if (Math.abs(diff - 90) <= 8) { aspecto = "Cuadratura □"; color = "#ff3300"; msg = "Tensión y fricción. Hay atracción, pero necesitan trabajar en sus diferencias."; }
    else if (Math.abs(diff - 120) <= 8) { aspecto = "Trígono △"; color = "#00ccff"; msg = "Armonía natural. Se apoyan mutuamente y es una relación muy estable."; }

    res.innerHTML = `
      <div style="font-size:2rem; color:${color}; margin-bottom:10px;">${aspecto}</div>
      <p style="font-size:0.9rem; line-height:1.5;">${msg}</p>
      <p style="font-size:0.75rem; color:#666; margin-top:15px;">Diferencia orbital: ${diff.toFixed(1)}°</p>
    `;
    res.style.display = "block";
  });
});
