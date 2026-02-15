/* ============================================================================
   HOME/SCROLL-SUAVE.JS - Scroll smooth en links internos
   ============================================================================ */

export function inicializarScrollSuave() {
  // Los navegadores modernos soportan scroll-behavior: smooth en CSS
  // Este archivo proporciona funciones auxiliares para más control

  // Event listeners en todos los links internos
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      scrollAlElemento(target, 100); // offset de 100px para el header sticky
    }
  });
}

/**
 * Scroll suave a un elemento con offset
 */
export function scrollAlElemento(elemento, offset = 0) {
  const posicion = elemento.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: posicion,
    behavior: 'smooth',
  });
}

/**
 * Scroll a la parte superior
 */
export function scrollAlTop(duracion = 800) {
  const inicio = window.scrollY;
  const distancia = inicio;
  let tiempoTranscurrido = 0;

  const animar = () => {
    tiempoTranscurrido += 16; // 60 fps
    const progreso = Math.min(tiempoTranscurrido / duracion, 1);

    // Easing: ease-out-cubic
    const easing = 1 - Math.pow(1 - progreso, 3);
    window.scrollTo(0, inicio - distancia * easing);

    if (progreso < 1) {
      requestAnimationFrame(animar);
    }
  };

  requestAnimationFrame(animar);
}

/**
 * Detectar elemento visible en viewport
 */
export function elementoVisible(elemento, porcentaje = 50) {
  const rect = elemento.getBoundingClientRect();
  const altura = rect.height;
  const elementoEnViewport = rect.top < window.innerHeight && rect.bottom > 0;
  const elementoVisible = window.innerHeight - rect.top > altura * (porcentaje / 100);

  return elementoEnViewport && elementoVisible;
}

/**
 * Observar elementos y ejecutar callback cuando se hacen visibles
 */
export function observarElementos(selector, callback) {
  const elementos = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
  });

  elementos.forEach(el => observer.observe(el));

  return observer;
}

export default inicializarScrollSuave;
