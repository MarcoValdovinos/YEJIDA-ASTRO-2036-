document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("mandala-modal");
  const btnOpen = document.getElementById("btn-open-mandala");
  const btnClose = document.getElementById("btn-close-mandala");
  const btnGenerate = document.getElementById("btn-generate");
  
  btnOpen.addEventListener("click", () => modal.style.display = "flex");
  btnClose.addEventListener("click", () => modal.style.display = "none");

  btnGenerate.addEventListener("click", () => {
    const dateInput = document.getElementById("birthdate").value;
    if (!dateInput) return alert("Por favor, ingresa tu fecha de nacimiento.");

    // 1. Calcular Número de Vida (Numerología)
    const digits = dateInput.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    const lifePath = sum;
    
    // 2. Generar el Mandala SVG
    drawMandala(lifePath);
    
    document.getElementById("mandala-result").innerHTML = 
      `<h3>Tu Camino de Vida es el <strong>${lifePath}</strong></h3>`;
  });

  function drawMandala(num) {
    const svg = document.getElementById("mandala-svg");
    svg.innerHTML = ""; // Limpiar
    
    // Paleta de colores astrales basada en el número
    const colors = ['#ff0055', '#ff8800', '#ffff00', '#00ff88', '#00e5ff', '#0055ff', '#b900ff', '#ff00ff', '#ffffff'];
    const color = colors[num % colors.length];
    
    const center = 250; // Centro del canvas (500x500)
    const maxRadius = 200;
    const points = num === 11 || num === 22 || num === 33 ? num * 2 : num * 4; 
    // Los números maestros generan más pétalos

    // Fondo circular
    let bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bg.setAttribute("cx", center); bg.setAttribute("cy", center); bg.setAttribute("r", maxRadius);
    bg.setAttribute("fill", "none"); bg.setAttribute("stroke", color); bg.setAttribute("stroke-width", "1"); bg.setAttribute("opacity", "0.3");
    svg.appendChild(bg);

    // Dibujar los pétalos geométricos
    for (let i = 0; i < points; i++) {
      const angle = (i * 360) / points;
      const rad = (angle - 90) * (Math.PI / 180); // -90 para empezar arriba
      
      const x1 = center + Math.cos(rad) * (maxRadius * 0.2);
      const y1 = center + Math.sin(rad) * (maxRadius * 0.2);
      
      const x2 = center + Math.cos(rad) * maxRadius;
      const y2 = center + Math.sin(rad) * maxRadius;
      
      const x3 = center + Math.cos(rad + (Math.PI / points)) * (maxRadius * 0.7);
      const y3 = center + Math.sin(rad + (Math.PI / points)) * (maxRadius * 0.7);

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // Curva de Bezier para hacer formas de pétalos
      path.setAttribute("d", `M ${center} ${center} Q ${x3} ${y3} ${x2} ${y2} Q ${x3} ${y3} ${center} ${center}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("opacity", "0.7");
      
      // Animación de entrada
      path.innerHTML = `<animate attributeName="opacity" from="0" to="0.7" dur="1.5s" fill="freeze"/>`;
      svg.appendChild(path);
    }

    // Círculo central
    let core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    core.setAttribute("cx", center); core.setAttribute("cy", center); core.setAttribute("r", maxRadius * 0.15);
    core.setAttribute("fill", color); core.setAttribute("opacity", "0.8");
    svg.appendChild(core);
  }
});
