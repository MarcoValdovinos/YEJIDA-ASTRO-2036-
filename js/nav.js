
document.addEventListener("DOMContentLoaded", () => {
  // 1. Elementos de la barra
  const navHome = document.getElementById("nav-home");
  const navPerfil = document.getElementById("nav-perfil");
  const navDonacion = document.getElementById("nav-donacion");
  const navSalir = document.getElementById("nav-salir");

  // 2. Navegación a Perfil
  navPerfil.addEventListener("click", () => {
    history.pushState({ modal: 'perfil' }, '', '#perfil');
    document.getElementById("perfil-modal").style.display = "flex";
    document.getElementById("perfil-modal").querySelector(".perfil-content").scrollIntoView();
    setActiveNav(navPerfil);
  });

  // 3. Navegación a Donación
  navDonacion.addEventListener("click", () => {
    history.pushState({ modal: 'donacion' }, '', '#donacion');
    document.getElementById("donacion-modal").style.display = "flex";
    setActiveNav(navDonacion);
  });

  // 4. Volver al inicio (Cierra modales)
  navHome.addEventListener("click", () => {
    closeAllModals();
    setActiveNav(navHome);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navSalir.addEventListener("click", () => {
    alert("¡Gracias por visitar Yejidá! Vuelve pronto.");
  });

  // 5. Lógica para el botón físico de ATRÁS (History API)
  window.addEventListener("popstate", (e) => {
    // Si el estado anterior no tenía un modal abierto, cerramos todo
    closeAllModals();
    setActiveNav(navHome);
  });

  function closeAllModals() {
    // Busca todas las ventanas emergentes y las oculta
    const modals = document.querySelectorAll('.modal-overlay, [id$="-modal"]');
    modals.forEach(m => m.style.display = "none");
    if (history.state && history.state.modal) {
      history.back(); // Limpia el historial
    }
  }

  function setActiveNav(activeElement) {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    activeElement.classList.add("active");
  }

  // 6. Interceptar todos los clicks de "Abrir Modal" para que se guarden en el historial
  document.querySelectorAll('.dash-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.id.replace('dash-', '') + '-modal';
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        history.pushState({ modal: modalId }, '', '#' + modalId);
      }
    });
  });

  // 7. Añadir botón de "Atrás" visual a cada modal
  const modals = document.querySelectorAll('.modal-overlay, [id$="-modal"]');
  modals.forEach(m => {
    if (!m.querySelector('.btn-back')) {
      const btn = document.createElement('button');
      btn.className = 'btn-back';
      btn.innerHTML = '⬅ Volver';
      btn.onclick = () => {
        closeAllModals();
        setActiveNav(navHome);
      };
      m.appendChild(btn);
    }
  });
});
