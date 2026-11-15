
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("memoria-modal");
  const btnOpen = document.getElementById("btn-open-memoria");
  const btnClose = document.getElementById("btn-close-memoria");
  const grid = document.getElementById("memoria-grid");
  const movesDisplay = document.getElementById("memoria-moves");

  const icons = ["♈","♉","♊","♋","♌","♍","♎","♏"];
  let deck = [];
  let flipped = [];
  let matched = 0;
  let moves = 0;
  let lockBoard = false;

  btnOpen.addEventListener("click", () => { modal.style.display = "flex"; startGame(); });
  btnClose.addEventListener("click", () => modal.style.display = "none");

  function startGame() {
    grid.innerHTML = "";
    deck = [...icons, ...icons].sort(() => 0.5 - Math.random());
    flipped = []; matched = 0; moves = 0; lockBoard = false;
    movesDisplay.innerText = "Movimientos: 0";

    deck.forEach(icon => {
      const card = document.createElement("div");
      card.className = "memoria-card";
      card.dataset.icon = icon;
      card.innerHTML = "<span>?</span>";
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this === flipped[0] || this.classList.contains("matched")) return;
    
    this.innerHTML = `<span>${this.dataset.icon}</span>`;
    this.classList.add("flipped");
    flipped.push(this);

    if (flipped.length === 2) {
      moves++;
      movesDisplay.innerText = `Movimientos: ${moves}`;
      checkMatch();
    }
  }

  function checkMatch() {
    const [c1, c2] = flipped;
    if (c1.dataset.icon === c2.dataset.icon) {
      c1.classList.add("matched"); c2.classList.add("matched");
      flipped = []; matched++;
      if (matched === 8) endGame();
    } else {
      lockBoard = true;
      setTimeout(() => {
        c1.classList.remove("flipped"); c2.classList.remove("flipped");
        c1.innerHTML = "<span>?</span>"; c2.innerHTML = "<span>?</span>";
        flipped = []; lockBoard = false;
      }, 1000);
    }
  }

  function endGame() {
    const reward = Math.max(10, 100 - (moves * 5)); // Menos movimientos = más puntos
    let stardust = parseInt(localStorage.getItem("stardust_y") || "0");
    stardust += reward;
    localStorage.setItem("stardust_y", stardust);
    
    if(document.getElementById("stardust-count")) {
        document.getElementById("stardust-count").innerText = stardust;
    }
    setTimeout(() => alert(`¡Has ganado! Encontraste todos los pares en ${moves} movimientos.\nGanaste ✨ ${reward} Polvo de Estrella.`), 500);
    modal.style.display = "none";
  }
});
