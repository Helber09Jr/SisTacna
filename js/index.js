/* ============================================================================
   INDEX.JS - JavaScript del HOME
   ============================================================================ */

import { DOM, registrarServiceWorker } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏠 HOME inicializado');

  inicializarNavegacion();
  registrarServiceWorker();
});

/**
 * Navegación y menú móvil
 */
function inicializarNavegacion() {
  const navToggle = DOM.q('.nav-toggle');
  const navMenu = DOM.q('.nav-menu');
  const navLinks = DOM.qa('.nav-enlace');

  // Toggle menú
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('activo');
  });

  // Cerrar menú al clickear un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('activo');
    });
  });

  // Cerrar menú al hacer scroll
  window.addEventListener('scroll', () => {
    navMenu?.classList.remove('activo');
  });
}
