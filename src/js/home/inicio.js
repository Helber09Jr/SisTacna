/* ============================================================================
   HOME/INICIO.JS - Inicializador del Home (DOMContentLoaded)
   ============================================================================ */

import HeaderNav from './header-nav.js';
import { inicializarHero, inicializarScrollHint } from './hero.js';
import ModalGaleria from './modal-galeria.js';
import { inicializarScrollSuave, observarElementos } from './scroll-suave.js';

/**
 * Inicializar toda la página HOME cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏠 Inicializando Home...');

  // Inicializar módulos
  inicializarHeaderNav();
  inicializarHero();
  inicializarScrollHint();
  inicializarGaleria();
  inicializarScrollSuave();

  // Funcionalidades adicionales
  inicializarAnimacionesElementos();
  registrarServiceWorker();

  console.log('✅ Home inicializado correctamente');
});

/**
 * Inicializar navegación del header
 */
function inicializarHeaderNav() {
  new HeaderNav();
}

/**
 * Inicializar galería modal
 */
function inicializarGaleria() {
  new ModalGaleria();
}

/**
 * Animar elementos al scrollear (Intersection Observer)
 */
function inicializarAnimacionesElementos() {
  observarElementos('.valor-card', (elemento) => {
    elemento.classList.add('animate-fadeInUp');
  });

  observarElementos('.nosotros-imagen', (elemento) => {
    elemento.classList.add('animate-fadeInLeft');
  });

  observarElementos('.estadistica-item', (elemento) => {
    elemento.classList.add('animate-fadeInUp');
  });
}

/**
 * Registrar Service Worker para PWA
 */
async function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registro = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registrado:', registro.scope);

      // Detectar actualizaciones
      registro.addEventListener('updatefound', () => {
        const nuevoWorker = registro.installing;
        nuevoWorker.addEventListener('statechange', () => {
          if (nuevoWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('📦 Nueva versión disponible');
            mostrarNotificacionActualizacion();
          }
        });
      });
    } catch (error) {
      console.warn('⚠️ Error registrando Service Worker:', error);
    }
  }
}

/**
 * Mostrar notificación de actualización disponible
 */
function mostrarNotificacionActualizacion() {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: var(--color-primary);
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: var(--z-fixed);
    display: flex;
    align-items: center;
    gap: 16px;
  `;

  notif.innerHTML = `
    <span>Nueva versión disponible</span>
    <button style="
      background-color: white;
      color: var(--color-primary);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    ">Recargar</button>
  `;

  notif.querySelector('button').addEventListener('click', () => {
    window.location.reload();
  });

  document.body.appendChild(notif);
}

/**
 * Descargar archivo manifest.json y registrar PWA
 */
async function registrarPWA() {
  const link = document.querySelector('link[rel="manifest"]');
  if (link) {
    console.log('📱 PWA manifest encontrado:', link.href);
  }
}

// Inicializar PWA al cargar
registrarPWA();

export default document;
