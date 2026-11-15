
document.addEventListener("DOMContentLoaded", () => {
  const calculateMoonPhase = () => {
    const now = new Date();
    let r = now.getFullYear() % 100; r %= 19;
    if (r > 9) r -= 19;
    r = ((r * 11) % 30) + (now.getMonth() + 1) + now.getDate();
    if (now.getMonth() + 1 < 3) r += 2;
    r -= ((now.getFullYear() < 2000) ? 4 : 8.3);
    r = Math.floor(r + 0.5) % 30;
    if (r < 0) r += 30;
    if (r < 1) return "🌑 Luna Nueva";
    if (r < 7) return "🌒 Luna Creciente";
    if (r < 8) return "🌓 Cuarto Creciente";
    if (r < 14) return "🌔 Gibosa Creciente";
    if (r < 15) return "🌕 Luna Llena";
    if (r < 21) return "🌖 Gibosa Menguante";
    if (r < 22) return "🌗 Cuarto Menguante";
    if (r < 29) return "🌘 Luna Menguante";
    return "🌑 Luna Nueva";
  };

  const getZodiacSign = () => {
    const now = new Date();
    const m = now.getMonth() + 1; const d = now.getDate();
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "♒ Acuario";
    if ((m == 2 && d >= 19) || (m == 3 && d <= 20)) return "♓ Piscis";
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "♈ Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "♉ Tauro";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "♊ Géminis";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "♋ Cáncer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "♌ Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "♍ Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "♎ Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "♏ Escorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "♐ Sagitario";
    return "♑ Capricornio";
  };

  document.getElementById("moon-phase").innerText = calculateMoonPhase();
  document.getElementById("sun-sign").innerText = getZodiacSign();

  const facts = [
    "La luz del Sol tarda 8 minutos y 20 segundos en llegar a la Tierra.",
    "La Luna se aleja de la Tierra 3.8 centímetros cada año.",
    "Un día en Venus es más largo que un año en Venus.",
    "El 99.86% de la masa del Sistema Solar está en el Sol.",
    "Júpiter tiene la rotación más rápida de todos los planetas.",
    "En Marte, las puestas de sol son azules.",
    "Hay más estrellas en el universo que granos de arena en la Tierra.",
    "El punto más frío conocido del universo es la Nebulosa Boomerang (-272°C).",
    "Neptuno tarda 165 años terrestres en dar una vuelta al Sol.",
    "El planeta 55 Cancri e es tan caliente que llueve lava líquida."
  ];

  let stardust = parseInt(localStorage.getItem("stardust_y") || "0");
  const btn = document.getElementById("btn-stardust");
  const display = document.getElementById("fact-display");
  const counter = document.getElementById("stardust-count");
  counter.innerText = stardust;

  btn.addEventListener("click", () => {
    stardust += Math.floor(Math.random() * 5) + 1;
    localStorage.setItem("stardust_y", stardust);
    counter.innerText = stardust;
    display.innerText = facts[Math.floor(Math.random() * facts.length)];
    
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 150);

    if (stardust >= 100) {
      display.innerHTML = "<strong style='color: gold'>🌟 ¡Has desbloqueado la frecuencia 528Hz! 🌟</strong><br>Has sintonizado con el pulso de la Tierra.";
    }
  });
});
