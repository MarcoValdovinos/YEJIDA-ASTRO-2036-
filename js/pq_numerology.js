
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pq-num-modal");
  const btnClose = document.getElementById("btn-close-pq-num");
  
  document.getElementById("dash-pq-num").addEventListener("click", () => {
    modal.style.display = "flex";
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  document.getElementById("btn-calc-pq-num").addEventListener("click", async () => {
    const name = document.getElementById("pq-name").value.trim();
    const date = document.getElementById("pq-date").value;
    
    if (!name || !date) return alert("Ingresa tu nombre completo y fecha de nacimiento.");

    // 1. Numerología Clásica (Pitagórica)
    const cleanDate = date.replace(/-/g, '');
    let sum = cleanDate.split('').map(Number).reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    const lifePath = sum;

    // 2. Criptografía Post-Cuántica (Simulación de Hash de Retículos)
    // Usamos la Web Crypto API para generar un hash SHA-256 real de sus datos
    const dataString = `${name}-${date}-ARKHE-ZERO`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(dataString);
    
    // Generar el Hash (Firma digital)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // 3. Derivar el Vector de Retículo (Lattice Vector) del Hash
    // Tomamos partes del hash para simular los parámetros de Kyber
    const latticeX = hashHex.substring(0, 8).toUpperCase();
    const latticeY = hashHex.substring(8, 16).toUpperCase();
    const quantumPhase = (parseInt(hashHex.substring(16, 20), 16) % 360).toFixed(2);

    // 4. Renderizar Resultados
    document.getElementById("pq-num-result").style.display = "block";
    document.getElementById("pq-life-path").innerText = lifePath;
    
    // Generar el "Sello Criptográfico"
    document.getElementById("pq-hash").innerText = hashHex.substring(0, 32) + "...";
    document.getElementById("pq-vector").innerText = `[${latticeX} : ${latticeY}]`;
    document.getElementById("pq-phase").innerText = `${quantumPhase}°`;

    // Evaluar la "Resonancia"
    let resonance = "Estable";
    if (lifePath === 11 || lifePath === 22 || lifePath === 33) resonance = "Maestro (Superposición)";
    else if (lifePath % 2 === 0) resonance = "Armónico (Simétrico)";
    else resonance = "Asimétrico (Entrópico)";

    document.getElementById("pq-resonance").innerText = resonance;
  });
});
