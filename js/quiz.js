
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quiz-modal");
  const btnOpen = document.getElementById("btn-open-quiz");
  const btnClose = document.getElementById("btn-close-quiz");
  const startScreen = document.getElementById("quiz-start");
  const questionScreen = document.getElementById("quiz-question");
  const resultScreen = document.getElementById("quiz-result");
  const btnStart = document.getElementById("btn-start-quiz");
  const btnRestart = document.getElementById("btn-restart-quiz");
  
  const qText = document.getElementById("q-text");
  const qOptions = document.getElementById("q-options");
  const qProgress = document.getElementById("q-progress");

  const questions = [
    { q: "¿Cuál es el planeta regente del signo Aries?", a: ["Marte", "Venus", "Júpiter", "Saturno"], c: 0 },
    { q: "¿Qué signo zodiacal es conocido como 'La Balanza'?", a: ["Escorpio", "Libra", "Tauro", "Virgo"], c: 1 },
    { q: "¿Qué elemento corresponde a los signos Cáncer, Escorpio y Piscis?", a: ["Fuego", "Tierra", "Aire", "Agua"], c: 3 },
    { q: "¿En qué fase lunar hay más probabilidades de un eclipse solar?", a: ["Luna Llena", "Luna Nueva", "Cuarto Creciente", "Gibosa"], c: 1 },
    { q: "¿Qué planeta es conocido como el 'Mensajero de los Dioses'?", a: ["Marte", "Mercurio", "Neptuno", "Urano"], c: 1 },
    { q: "¿Cuál es el signo del zodiaco regido por Venus?", a: ["Aries y Leo", "Tauro y Libra", "Géminis y Virgo", "Acuario y Capricornio"], c: 1 },
    { q: "¿Qué científico descubrió las leyes del movimiento planetario?", a: ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Nicolás Copérnico"], c: 2 },
    { q: "¿Cuántas constelaciones oficiales reconoce la Unión Astronómica Internacional?", a: ["12", "48", "88", "100"], c: 2 }
  ];

  let currentQ = 0;
  let score = 0;
  let gameQuestions = [];

  btnOpen.addEventListener("click", () => {
    modal.style.display = "flex";
    showScreen(startScreen);
  });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  function showScreen(screen) {
    [startScreen, questionScreen, resultScreen].forEach(s => s.style.display = "none");
    screen.style.display = "block";
  }

  btnStart.addEventListener("click", startGame);
  btnRestart.addEventListener("click", startGame);

  function startGame() {
    gameQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentQ = 0;
    score = 0;
    showScreen(questionScreen);
    loadQuestion();
  }

  function loadQuestion() {
    const q = gameQuestions[currentQ];
    qText.innerText = q.q;
    qProgress.innerText = `Pregunta ${currentQ + 1} de 5`;
    qOptions.innerHTML = "";

    q.a.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(index, btn);
      qOptions.appendChild(btn);
    });
  }

  function checkAnswer(selected, btnElement) {
    const q = gameQuestions[currentQ];
    const allBtns = document.querySelectorAll(".quiz-option");
    allBtns.forEach(b => b.disabled = true); // Deshabilitar todos

    if (selected === q.c) {
      btnElement.classList.add("correct");
      score++;
    } else {
      btnElement.classList.add("wrong");
      allBtns[q.c].classList.add("correct");
    }

    setTimeout(() => {
      currentQ++;
      if (currentQ < 5) {
        loadQuestion();
      } else {
        endGame();
      }
    }, 1200);
  }

  function endGame() {
    showScreen(resultScreen);
    document.getElementById("final-score").innerText = `Acertaste ${score} de 5`;
    
    // Recompensa: 10 puntos de Polvo de Estrella por acierto
    let reward = score * 10;
    let stardust = parseInt(localStorage.getItem("stardust_y") || "0");
    stardust += reward;
    localStorage.setItem("stardust_y", stardust);
    
    // Actualizar el HUD del Oráculo
    const hudCounter = document.getElementById("stardust-count");
    if (hudCounter) hudCounter.innerText = stardust;

    document.getElementById("reward-text").innerText = reward > 0 ? `¡Has ganado ✨ ${reward} Polvo de Estrella!` : "Sigue practicando para ganar polvo estelar.";
  }
});
