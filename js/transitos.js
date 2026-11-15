
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("transitos-modal");
  const btnClose = document.getElementById("btn-close-transitos");
  const wheel = document.getElementById("transitos-wheel");
  const dateText = document.getElementById("transitos-date");
  
  document.getElementById("dash-transitos").addEventListener("click", () => {
    modal.style.display = "flex";
    calculateTransits(new Date());
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const planets = [
    { id: Astronomy.Body.Sun, name: "Sol", color: "#ffcc00", size: 6 },
    { id: Astronomy.Body.Moon, name: "Luna", color: "#ffffff", size: 5 },
    { id: Astronomy.Body.Mercury, name: "Mercurio", color: "#00ccff", size: 4 },
    { id: Astronomy.Body.Venus, name: "Venus", color: "#ff66cc", size: 5 },
    { id: Astronomy.Body.Mars, name: "Marte", color: "#ff3300", size: 4 },
    { id: Astronomy.Body.Jupiter, name: "Júpiter", color: "#ff9900", size: 6 },
    { id: Astronomy.Body.Saturn, name: "Saturno", color: "#996633", size: 5 },
    { id: Astronomy.Body.Uranus, name: "Urano", color: "#00ffff", size: 4 },
    { id: Astronomy.Body.Neptune, name: "Neptuno", color: "#3366ff", size: 4 },
    { id: Astronomy.Body.Pluto, name: "Plutón", color: "#a6a6a6", size: 3 }
  ];

  function calculateTransits(dateObj) {
    wheel.innerHTML = "";
    dateText.innerText = "Posiciones planetarias al: " + dateObj.toLocaleDateString('es-ES');

    const center = 200;
    const radius = 150;

    // Dibujar el círculo base
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", center); circle.setAttribute("cy", center); circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none"); circle.setAttribute("stroke", "rgba(180,100,255,0.4)"); circle.setAttribute("stroke-width", "2");
    wheel.appendChild(circle);

    // Dibujar las 12 divisiones de los signos
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x1 = center + Math.cos(angle) * (radius - 10);
      const y1 = center + Math.sin(angle) * (radius - 10);
      const x2 = center + Math.cos(angle) * radius;
      const y2 = center + Math.sin(angle) * radius;
      
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
      line.setAttribute("stroke", "rgba(180,100,255,0.6)"); line.setAttribute("stroke-width", "1");
      wheel.appendChild(line);
    }

    // Calcular y dibujar planetas
    planets.forEach(p => {
      const vector = Astronomy.GeoVector(p.id, dateObj, true);
      const ecliptic = Astronomy.Ecliptic(vector);
      const lon = ecliptic.elon;
      
      const angle = (lon - 90) * (Math.PI / 180);
      const x = center + Math.cos(angle) * (radius * 0.85);
      const y = center + Math.sin(angle) * (radius * 0.85);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("r", p.size);
      dot.setAttribute("fill", p.color);
      dot.setAttribute("style", `filter: drop-shadow(0 0 5px ${p.color});`);
      wheel.appendChild(dot);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x + 8); text.setAttribute("y", y + 4);
      text.setAttribute("fill", p.color); text.setAttribute("font-size", "10");
      text.setAttribute("font-family", "sans-serif");
      text.textContent = p.name;
      wheel.appendChild(text);
    });
  }

  // Actualizar cada minuto
  setInterval(() => {
    if (modal.style.display === "flex") {
      calculateTransits(new Date());
    }
  }, 60000);
});
