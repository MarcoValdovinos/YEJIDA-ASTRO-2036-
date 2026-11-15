
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("donacion-modal");
  const btnOpen = document.getElementById("btn-open-donacion");
  const btnClose = document.getElementById("btn-close-donacion");
  const progressBar = document.getElementById("food-progress");
  const kgText = document.getElementById("food-kg");

  // Simulamos que hemos recaudado 15kg de una meta de 50kg (puedes cambiar esto)
  let recaudado = 15;
  const meta = 50;

  function updateProgress() {
    if (progressBar && kgText) {
      const percentage = (recaudado / meta) * 100;
      progressBar.style.width = percentage + "%";
      kgText.innerText = `${recaudado} kg / ${meta} kg`;
    }
  }
  updateProgress();

  btnOpen.addEventListener("click", () => modal.style.display = "flex");
  btnClose.addEventListener("click", () => modal.style.display = "none");

  // Botones de donación
  const donarBtns = document.querySelectorAll(".btn-donar-amount");
  donarBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const amount = e.target.getAttribute("data-amount");
      // AQUÍ PUEDES PONER TU ENLACE REAL DE PAYPAL, KO-FI O MERCADOPAGO
      const enlacePago = `https://ko-fi.com/tu-usuario`; 
      
      // Simulamos la redirección
      alert(`Redirigiendo a la pasarela de pago para donar $${amount} USD...\n\n(Recuerda cambiar el enlace en js/donacion.js)`);
      window.open(enlacePago, '_blank');
    });
  });
});
