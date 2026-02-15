/* ============================================================================
   HOME/HEADER-NAV.JS - Navegación del header y menú hamburguesa
   ============================================================================ */

export class HeaderNav {
  constructor() {
    this.hamburgerBtn = document.querySelector('.hamburger-toggle');
    this.navMobile = document.querySelector('.nav-mobile');
    this.navLinks = document.querySelectorAll('.nav-mobile a, .nav-horizontal a');
    this.header = document.querySelector('.header');

    this.init();
  }

  init() {
    // Event listener para hamburger
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Event listeners para links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });

    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => this.updateHeader());

    // Event delegation para links de navegación
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-mobile a, .nav-horizontal a')) {
        this.cerrarMenu();
      }
    });
  }

  toggleMenu() {
    this.hamburgerBtn.classList.toggle('active');
    this.navMobile.classList.toggle('active');
  }

  cerrarMenu() {
    if (this.hamburgerBtn && this.navMobile) {
      this.hamburgerBtn.classList.remove('active');
      this.navMobile.classList.remove('active');
    }
  }

  handleLinkClick(e) {
    const href = e.target.getAttribute('href');

    // Si es un link interno
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Marcar como activo
    this.navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');

    // Cerrar menú móvil
    this.cerrarMenu();
  }

  updateHeader() {
    if (window.scrollY > 50) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
  }

  setActiveLink(selector) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === selector) {
        link.classList.add('active');
      }
    });
  }
}

export default HeaderNav;
