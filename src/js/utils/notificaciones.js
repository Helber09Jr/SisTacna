/* ============================================================================
   NOTIFICACIONES.JS - Sistema de notificaciones tipo Toast
   ============================================================================ */

export const Notificaciones = {
  /**
   * Mostrar toast genérico
   * @param {string} tipo - 'success', 'error', 'warning', 'info'
   * @param {string} mensaje - Texto del mensaje
   * @param {number} duracion - Milisegundos antes de desaparecer (0 = manual)
   */
  mostrar(tipo = 'info', mensaje = '', duracion = 3000) {
    // Crear contenedor si no existe
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: var(--spacing-lg);
        right: var(--spacing-lg);
        z-index: var(--z-tooltip);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        max-width: 500px;
      `;
      document.body.appendChild(container);
    }

    // Crear elemento toast
    const toast = document.createElement('div');
    const id = `toast-${Date.now()}`;
    toast.id = id;
    toast.className = `toast toast-${tipo} animate-slideRight`;

    // Estilos base
    const colores = {
      success: { bg: 'var(--color-success)', border: '#22c55e' },
      error: { bg: 'var(--color-danger)', border: '#ef4444' },
      warning: { bg: 'var(--color-warning)', border: '#eab308' },
      info: { bg: 'var(--color-info)', border: '#06b6d4' },
    };

    const color = colores[tipo] || colores.info;

    toast.style.cssText = `
      background-color: ${color.bg};
      color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 300px;
      border-left: 4px solid ${color.border};
      animation: slideRight var(--transition-normal);
    `;

    // HTML
    toast.innerHTML = `
      <span style="flex: 1; font-weight: var(--font-weight-medium);">${mensaje}</span>
      <button type="button" style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.5rem;
        margin-left: var(--spacing-md);
        padding: 0;
        line-height: 1;
      ">×</button>
    `;

    // Agregar a contenedor
    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Botón cerrar
    toast.querySelector('button').addEventListener('click', () => {
      toast.classList.add('animate-fadeOut');
      setTimeout(() => toast.remove(), 300);
    });

    // Auto cerrar si hay duración
    if (duracion > 0) {
      setTimeout(() => {
        if (document.contains(toast)) {
          toast.classList.add('animate-fadeOut');
          setTimeout(() => toast.remove(), 300);
        }
      }, duracion);
    }
  },

  /**
   * Toast éxito
   */
  exito(mensaje, duracion = 3000) {
    this.mostrar('success', mensaje, duracion);
  },

  /**
   * Toast error
   */
  error(mensaje, duracion = 5000) {
    this.mostrar('error', mensaje, duracion);
  },

  /**
   * Toast advertencia
   */
  advertencia(mensaje, duracion = 4000) {
    this.mostrar('warning', mensaje, duracion);
  },

  /**
   * Toast información
   */
  info(mensaje, duracion = 3000) {
    this.mostrar('info', mensaje, duracion);
  },

  /**
   * Diálogo de confirmación
   */
  confirmar(mensaje, titulo = 'Confirmar') {
    return new Promise((resolve) => {
      // Crear modal
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: var(--z-modal);
        animation: fadeIn var(--transition-normal);
      `;

      modal.innerHTML = `
        <div style="
          background-color: white;
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          max-width: 400px;
          box-shadow: var(--shadow-2xl);
          animation: scaleIn var(--transition-normal);
        ">
          <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-black);">${titulo}</h3>
          <p style="margin: 0 0 var(--spacing-xl) 0; color: var(--color-gray-600);">${mensaje}</p>
          <div style="display: flex; gap: var(--spacing-md); justify-content: flex-end;">
            <button type="button" class="btn btn-outline" style="border-color: var(--color-gray-300); color: var(--color-gray-700);">Cancelar</button>
            <button type="button" class="btn btn-primary">Confirmar</button>
          </div>
        </div>
      `;

      const botones = modal.querySelectorAll('button');
      botones[0].addEventListener('click', () => {
        modal.remove();
        resolve(false);
      });

      botones[1].addEventListener('click', () => {
        modal.remove();
        resolve(true);
      });

      document.body.appendChild(modal);
    });
  },

  /**
   * Loading spinner
   */
  cargar(mensaje = 'Cargando...') {
    const id = `loading-${Date.now()}`;
    const loading = document.createElement('div');
    loading.id = id;
    loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: var(--z-modal);
      flex-direction: column;
      gap: var(--spacing-lg);
    `;

    loading.innerHTML = `
      <div style="
        border: 4px solid var(--color-gray-200);
        border-top-color: var(--color-primary);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      "></div>
      <p style="color: white; font-weight: var(--font-weight-medium);">${mensaje}</p>
    `;

    document.body.appendChild(loading);
    return id;
  },

  /**
   * Cerrar loading
   */
  cerrarCargar(id) {
    const element = document.getElementById(id);
    if (element) {
      element.style.animation = 'fadeOut var(--transition-normal)';
      setTimeout(() => element.remove(), 300);
    }
  },
};

export default Notificaciones;
