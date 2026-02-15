/* ============================================================================
   UTILS.JS - Utilidades compartidas reutilizables
   ============================================================================ */

// ==================== VALIDACIONES ====================

export const Validaciones = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  telefono: (tel) => /^[0-9]{9}$/.test(tel.replace(/[-\s]/g, '')),
  ruc: (ruc) => /^[0-9]{11}$/.test(ruc),
  requerido: (valor) => valor !== null && valor !== undefined && valor.toString().trim() !== '',
  esNumero: (valor) => !isNaN(valor) && valor !== '',
  esPositivo: (valor) => !isNaN(valor) && Number(valor) > 0,
  moneda: (valor) => /^\d+(\.\d{1,2})?$/.test(valor.toString()),
};

// ==================== FORMATOS ====================

export const Formatos = {
  moneda: (valor) => `S/. ${Number(valor).toFixed(2)}`,
  numero: (valor, decimales = 2) => Number(valor).toLocaleString('es-PE', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }),
  fecha: (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  },
  hora: (date) => {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  },
  telefono: (tel) => {
    const clean = tel.replace(/\D/g, '');
    if (clean.length !== 9) return tel;
    return `(${clean[0]}) ${clean.slice(1, 5)}-${clean.slice(5)}`;
  },
  capitalizar: (texto) => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase(),
  truncar: (texto, longitud = 50) => texto.length <= longitud ? texto : texto.substring(0, longitud - 3) + '...',
};

// ==================== ALMACENAMIENTO ====================

export const Almacenamiento = {
  guardar: (clave, valor) => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error('Error al guardar:', e);
      return false;
    }
  },
  obtener: (clave, porDefecto = null) => {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : porDefecto;
    } catch (e) {
      return porDefecto;
    }
  },
  eliminar: (clave) => localStorage.removeItem(clave),
  limpiar: () => localStorage.clear(),
};

// ==================== NOTIFICACIONES ====================

export const Notificaciones = {
  mostrar: (tipo = 'info', mensaje = '', duracion = 3000) => {
    const container = document.getElementById('toast-container') || (() => {
      const div = document.createElement('div');
      div.id = 'toast-container';
      div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(div);
      return div;
    })();

    const toast = document.createElement('div');
    const colores = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    };

    toast.style.cssText = `
      background-color: ${colores[tipo] || colores.info};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 300px;
      animation: slideInRight 0.3s ease;
    `;
    toast.textContent = mensaje;

    container.appendChild(toast);

    if (duracion > 0) {
      setTimeout(() => toast.remove(), duracion);
    }

    return toast;
  },
  exito: (msg) => Notificaciones.mostrar('success', msg, 3000),
  error: (msg) => Notificaciones.mostrar('error', msg, 5000),
  info: (msg) => Notificaciones.mostrar('info', msg, 3000),
  advertencia: (msg) => Notificaciones.mostrar('warning', msg, 4000),
};

// ==================== DOM ====================

export const DOM = {
  q: (selector) => document.querySelector(selector),
  qa: (selector) => document.querySelectorAll(selector),
  on: (selector, event, callback) => {
    document.addEventListener(event, (e) => {
      if (e.target.matches(selector)) {
        callback(e);
      }
    });
  },
  setHTML: (selector, html) => {
    const el = DOM.q(selector);
    if (el) el.innerHTML = html;
  },
  setText: (selector, text) => {
    const el = DOM.q(selector);
    if (el) el.textContent = text;
  },
  addClass: (selector, clase) => DOM.q(selector)?.classList.add(clase),
  removeClass: (selector, clase) => DOM.q(selector)?.classList.remove(clase),
  toggleClass: (selector, clase) => DOM.q(selector)?.classList.toggle(clase),
  show: (selector) => DOM.q(selector) && (DOM.q(selector).style.display = 'block'),
  hide: (selector) => DOM.q(selector) && (DOM.q(selector).style.display = 'none'),
};

// ==================== UTILIDADES ====================

export const Utils = {
  scrollTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  scrollTo: (selector, offset = 0) => {
    const el = DOM.q(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  debounce: (func, wait = 300) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  }),
  sleep: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
};

// ==================== INICIALIZACIONES ====================

export function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('✅ Service Worker registrado');
    }).catch(err => {
      console.warn('⚠️ Error SW:', err);
    });
  }
}

export function agregarEstilosGlobales() {
  if (!document.getElementById('estilos-globales')) {
    const style = document.createElement('style');
    style.id = 'estilos-globales';
    style.textContent = `
      :root {
        --color-primary: #ff6b35;
        --color-white: #ffffff;
        --color-gray-100: #f8f9fa;
        --color-gray-500: #6c757d;
        --color-gray-700: #343a40;
        --color-success: #28a745;
        --color-danger: #dc3545;
        --color-warning: #ffc107;
        --transition: 0.3s ease;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Poppins', sans-serif; color: var(--color-gray-700); }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: var(--transition);
      }

      .btn-primary {
        background-color: var(--color-primary);
        color: white;
      }

      .btn-primary:hover {
        background-color: #e55a2a;
        transform: translateY(-2px);
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default {
  Validaciones,
  Formatos,
  Almacenamiento,
  Notificaciones,
  DOM,
  Utils,
};
