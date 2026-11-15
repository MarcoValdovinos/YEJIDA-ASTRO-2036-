
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("arbol-modal");
  const btnClose = document.getElementById("btn-close-arbol");
  
  document.getElementById("dash-arbol").addEventListener("click", () => {
    modal.style.display = "flex";
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  // --- 1. DATOS DEL ÁRBOL DE LA VIDA ---
  const sefirot = {
    "keter": { name: "Keter (Corona)", desc: "La voluntad divina, el origen de todo. Conexión con la fuente." },
    "jokmah": { name: "Jojmá (Sabiduría)", desc: "La chispa de la creación, el pensamiento puro e intuitivo." },
    "binah": { name: "Biná (Entendimiento)", desc: "La forma, la estructura, la comprensión lógica y el tiempo." },
    "jesed": { name: "Jesed (Misericordia)", desc: "La expansión, el amor incondicional y la generosidad." },
    "geburah": { name: "Geburá (Severidad)", desc: "La contracción, la justicia, el límite y la disciplina." },
    "tiferet": { name: "Tiferet (Belleza)", desc: "El equilibrio, el corazón, la armonía entre dar y recibir." },
    "netzach": { name: "Netzaj (Victoria)", desc: "La emoción, el deseo, la creatividad y la perseverancia." },
    "hod": { name: "Hod (Gloria)", desc: "El intelecto, la comunicación, la lógica y la gratitud." },
    "yesod": { name: "Yesod (Fundamento)", desc: "El mundo astral, los sueños, la conexión con la Tierra." },
    "maljut": { name: "Maljut (Reino)", desc: "El mundo físico, la manifestación, la acción en la realidad." }
  };

  // --- 2. CÁLCULO DEL ÁNGEL REGENTE Y PIEDRA ---
  const angeles = ["Vehuiah", "Jeliel", "Sitael", "Elemiah", "Mahasiah", "Lelahel", "Achaiah", "Cahethel", "Haziel", "Aladiah"];
  const piedras = {
    "Aries": "🌋 Rubí (Pasión y coraje)", "Tauro": "🌿 Esmeralda (Prosperidad)",
    "Géminis": "💎 Ágata (Claridad mental)", "Cáncer": "🌕 Perla (Protección emocional)",
    "Leo": "☀️ Ojo de Tigre (Poder y confianza)", "Virgo": "🌲 Jade (Pureza y salud)",
    "Libra": "🌸 Cuarzo Rosa (Amor y equilibrio)", "Escorpio": "🩸 Obsidiana (Transformación)",
    "Sagitario": "🔮 Lapislázuli (Sabiduría y verdad)", "Capricornio": "🪨 Ónix (Disciplina)",
    "Acuario": "💠 Amatista (Intuición y paz)", "Piscis": "🌊 Aguamarina (Sanación)"
  };

  document.getElementById("btn-calc-mistico").addEventListener("click", () => {
    const dateStr = document.getElementById("mistic-date").value;
    if(!dateStr) return alert("Ingresa tu fecha de nacimiento.");

    const d = new Date(dateStr + "T12:00:00Z");
    // Cálculo simple para el ángel (basado en el día del año)
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const angelIndex = dayOfYear % 72;
    
    // Cálculo del signo para la piedra
    const m = d.getMonth() + 1; const day = d.getDate();
    let sign = "Aries";
    if ((m == 1 && day >= 20) || (m == 2 && day <= 18)) sign = "Acuario";
    else if ((m == 2 && day >= 19) || (m == 3 && day <= 20)) sign = "Piscis";
    else if ((m == 3 && day >= 21) || (m == 4 && day <= 19)) sign = "Aries";
    else if ((m == 4 && day >= 20) || (m == 5 && day <= 20)) sign = "Tauro";
    else if ((m == 5 && day >= 21) || (m == 6 && day <= 20)) sign = "Géminis";
    else if ((m == 6 && day >= 21) || (m == 7 && day <= 22)) sign = "Cáncer";
    else if ((m == 7 && day >= 23) || (m == 8 && day <= 22)) sign = "Leo";
    else if ((m == 8 && day >= 23) || (m == 9 && day <= 22)) sign = "Virgo";
    else if ((m == 9 && day >= 23) || (m == 10 && day <= 22)) sign = "Libra";
    else if ((m == 10 && day >= 23) || (m == 11 && day <= 21)) sign = "Escorpio";
    else if ((m == 11 && day >= 22) || (m == 12 && day <= 21)) sign = "Sagitario";
    else sign = "Capricornio";

    document.getElementById("mistic-result").innerHTML = `
        <div style="margin-bottom:10px;"><strong style="color:#d7b4ff;">Ángel Regente:</strong> ${angeles[angelIndex % angeles.length]} (Protección y guía)</div>
        <div><strong style="color:#00ffcc;">Tu Piedra:</strong> ${piedras[sign]}</div>
    `;
  });

  // --- 3. INTERACTIVIDAD DEL ÁRBOL SVG ---
  const nodes = document.querySelectorAll(".sefira-node");
  const infoBox = document.getElementById("sefira-info");

  nodes.forEach(node => {
    node.addEventListener("click", (e) => {
      const id = e.target.id;
      if (sefirot[id]) {
        infoBox.innerHTML = `<h4 style="color:#fff; margin-bottom:5px;">${sefirot[id].name}</h4><p style="font-size:0.85rem; color:#ccc;">${sefirot[id].desc}</p>`;
        // Resaltar nodo
        nodes.forEach(n => n.style.filter = "none");
        e.target.style.filter = "drop-shadow(0 0 15px #fff)";
      }
    });
  });
});
