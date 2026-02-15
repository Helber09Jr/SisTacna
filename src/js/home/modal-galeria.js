/* ============================================================================
   HOME/MODAL-GALERIA.JS - Modal de galería con navegación
   ============================================================================ */

export class ModalGaleria {
  constructor() {
    this.modal = document.querySelector('.modal-galeria');
    this.imagenModal = document.querySelector('.modal-imagen');
    this.imagenActual = 0;
    this.imagenes = [];
    this.card = null;

    this.init();
  }

  init() {
    // Eventos en tarjetas de galería
    const galeriaCards = document.querySelectorAll('.galeria-card');
    galeriaCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.obtenerImagenes();
        this.abrirModal(index);
      });
    });

    // Botones del modal
    const btnCerrar = this.modal?.querySelector('.modal-cerrar');
    const btnAnterior = this.modal?.querySelector('[data-dir="anterior"]');
    const btnSiguiente = this.modal?.querySelector('[data-dir="siguiente"]');

    btnCerrar?.addEventListener('click', () => this.cerrarModal());
    btnAnterior?.addEventListener('click', () => this.navegar(-1));
    btnSiguiente?.addEventListener('click', () => this.navegar(1));

    // Teclado
    document.addEventListener('keydown', (e) => this.handleTecla(e));

    // Click fuera del modal
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.cerrarModal();
      }
    });
  }

  obtenerImagenes() {
    const cards = document.querySelectorAll('.galeria-card');
    this.imagenes = Array.from(cards).map(card => card.querySelector('img').src);
  }

  abrirModal(index = 0) {
    if (!this.modal || this.imagenes.length === 0) return;

    this.imagenActual = index;
    this.modal.classList.add('active');
    this.actualizarGaleria();
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  navegar(direccion) {
    this.imagenActual += direccion;

    // Navegar en círculo
    if (this.imagenActual < 0) {
      this.imagenActual = this.imagenes.length - 1;
    } else if (this.imagenActual >= this.imagenes.length) {
      this.imagenActual = 0;
    }

    this.actualizarGaleria();
  }

  actualizarGaleria() {
    if (!this.imagenModal) return;

    // Cambiar imagen con transición
    this.imagenModal.style.animation = 'none';
    setTimeout(() => {
      this.imagenModal.src = this.imagenes[this.imagenActual];
      this.imagenModal.style.animation = 'scaleIn 0.3s ease-out';
    }, 10);

    // Actualizar indicador
    const indicador = this.modal?.querySelector('.modal-indicadores');
    if (indicador) {
      indicador.textContent = `${this.imagenActual + 1} / ${this.imagenes.length}`;
    }
  }

  handleTecla(e) {
    if (!this.modal?.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
      this.navegar(-1);
    } else if (e.key === 'ArrowRight') {
      this.navegar(1);
    } else if (e.key === 'Escape') {
      this.cerrarModal();
    }
  }
}

export default ModalGaleria;
