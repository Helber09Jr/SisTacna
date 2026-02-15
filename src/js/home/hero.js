/* ============================================================================
   HOME/HERO.JS - Efectos del hero: parallax y animaciones
   ============================================================================ */

export function inicializarHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (!hero) return;

  // Efecto parallax (solo en desktop)
  if (window.innerWidth >= 768) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    });
  }

  // Animar elementos dentro del hero
  animarElementosHero();

  // Event listeners para botones CTA
  const botones = hero.querySelectorAll('.btn');
  botones.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target');
      if (target) {
        const elemento = document.querySelector(target);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * Animar elementos del hero con delay
 */
function animarElementosHero() {
  const h1 = document.querySelector('.hero h1');
  const p = document.querySelector('.hero > p');
  const botones = document.querySelector('.hero-buttons');

  if (h1) {
    h1.style.animation = 'fadeInDown 0.8s ease-out forwards';
  }

  if (p) {
    p.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
    p.style.opacity = '0';
  }

  if (botones) {
    botones.style.animation = 'fadeInUp 0.8s ease-out 0.4s forwards';
    botones.style.opacity = '0';
  }
}

/**
 * Inicializar efecto scroll hint
 */
export function inicializarScrollHint() {
  const scrollHint = document.querySelector('.scroll-hint');
  if (!scrollHint) return;

  scrollHint.addEventListener('click', () => {
    const proximaSeccion = document.querySelector('section:nth-of-type(2)');
    if (proximaSeccion) {
      proximaSeccion.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Ocultar scroll hint después de scrollear
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollHint.style.opacity = '0';
      scrollHint.style.pointerEvents = 'none';
    } else {
      scrollHint.style.opacity = '1';
      scrollHint.style.pointerEvents = 'auto';
    }
  });
}

export default inicializarHero;
