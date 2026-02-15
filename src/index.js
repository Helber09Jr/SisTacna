/* ============================================================================
   INDEX.JS - JavaScript del HOME
   ============================================================================ */

import { DOM, Almacenamiento, registrarServiceWorker, agregarEstilosGlobales } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏠 HOME inicializado');

  // Inicializar
  inicializarNavegacion();
  registrarServiceWorker();
  agregarEstilosGlobales();
});

/**
 * Navegación y menú móvil
 */
function inicializarNavegacion() {
  const navToggle = DOM.q('.nav-toggle');
  const navMenu = DOM.q('.nav-menu');
  const navLinks = DOM.qa('.nav-link');

  // Toggle menú
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });

  // Cerrar menú al clickear un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  // Cerrar menú al hacer scroll
  window.addEventListener('scroll', () => {
    navMenu?.classList.remove('active');
  });
}
