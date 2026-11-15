
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("natal-modal");
  const btnOpen = document.getElementById("btn-open-natal");
  const btnClose = document.getElementById("btn-close-natal");
  const btnCalc = document.getElementById("btn-calc-natal");
  const wheel = document.getElementById("natal-wheel");
  const resultText = document.getElementById("natal-result");

  btnOpen.addEventListener("click", () => modal.style.display = "flex");
  btnClose.addEventListener("click", () => modal.style.display = "none");

  // Signos y sus longitudes (0 a 360 grados)
  const signs = [
    { name: "Aries", start: 0 }, { name: "Tauro", start: 30 },
    { name: "Géminis", start: 60 }, { name: "Cáncer", start: 90 },
    { name: "Leo", start: 120 }, { name: "Virgo", start: 150 },
    { name: "Libra", start: 180 }, { name: "Escorpio", start: 210 },
    { name: "Sagitario", start: 240 }, { name: "Capricornio", start: 270 },
    { name: "Acuario", start: 300 }, { name: "Piscis", start: 330 }
  ];

  const getSign = (longitude) => {
    for (let i = signs.length - 1; i >= 0; i--) {
      if (longitude >= signs[i].start) return signs[i].name;
    }
    return "Aries";
  };

  btnCalc.addEventListener("click", () => {
    const dateStr = document.getElementById("natal-date").value;
    const timeStr = document.getElementById("natal-time").value || "12:00";
    
    if (!dateStr) return alert("Por favor, ingresa tu fecha de nacimiento.");

    const dateObj = new Date(`${dateStr}T${timeStr}:00Z`); // UTC
    wheel.innerHTML = ""; // Limpiar SVG
    let htmlResult = "<ul>";

    // Lista de planetas a calcular
    const planets = [
      { id: Astronomy.Body.Sun, name: "☉ Sol", color: "#ffcc00" },
      { id: Astronomy.Body.Moon, name: "☽ Luna", color: "#c0c0c0" },
      { id: Astronomy.Body.Mercury, name: "☿ Mercurio", color: "#00ccff" },
      { id: Astronomy.Body.Venus, name: "♀ Venus", color: "#ff66cc" },
      { id: Astronomy.Body.Mars, name: "♂ Marte", color: "#ff3300" },
      { id: Astronomy.Body.Jupiter, name: "♃ Júpiter", color: "#ff9900" },
      { id: Astronomy.Body.Saturn, name: "♄ Saturno", color: "#996633" }
    ];

    planets.forEach(p => {
      // Calcular la posición real en el espacio
      const vector = Astronomy.GeoVector(p.id, dateObj, true);
      const ecliptic = Astronomy.Ecliptic(vector);
      const longitude = ecliptic.elon; // 0 a 360 grados
      
      const sign = getSign(longitude);
      const degree = (longitude % 30).toFixed(1);
      
      htmlResult += `<li><strong style="color:${p.color}">${p.name}</strong>: ${degree}° de ${sign}</li>`;

      // Dibujar en el SVG (Círculo de 300x300, centro en 150)
      const rad = (longitude - 90) * (Math.PI / 180);
      const x = 150 + Math.cos(rad) * 110;
      const y = 150 + Math.sin(rad) * 110;

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("r", "5");
      dot.setAttribute("fill", p.color);
      wheel.appendChild(dot);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x + 8); text.setAttribute("y", y + 4);
      text.setAttribute("fill", p.color); text.setAttribute("font-size", "10");
      text.textContent = p.name.split(" ")[0];
      wheel.appendChild(text);
    });

    htmlResult += "</ul>";
    resultText.innerHTML = htmlResult;

    // Dibujar el círculo base zodiacal
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", 150); circle.setAttribute("cy", 150); circle.setAttribute("r", 120);
    circle.setAttribute("fill", "none"); circle.setAttribute("stroke", "#d7b4ff"); circle.setAttribute("stroke-width", "2");
    wheel.appendChild(circle);
  });
});
