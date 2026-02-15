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
    const contenedor = document.getElementById('contenedor-notificaciones') || (() => {
      const div = document.createElement('div');
      div.id = 'contenedor-notificaciones';
      document.body.appendChild(div);
      return div;
    })();

    const notif = document.createElement('div');
    const clases = {
      exito: 'notificacion-exito',
      error: 'notificacion-error',
      advertencia: 'notificacion-advertencia',
      info: 'notificacion-info',
    };

    notif.className = `notificacion ${clases[tipo] || clases.info}`;
    notif.textContent = mensaje;

    contenedor.appendChild(notif);

    if (duracion > 0) {
      setTimeout(() => notif.remove(), duracion);
    }

    return notif;
  },
  exito: (msg) => Notificaciones.mostrar('exito', msg, 3000),
  error: (msg) => Notificaciones.mostrar('error', msg, 5000),
  info: (msg) => Notificaciones.mostrar('info', msg, 3000),
  advertencia: (msg) => Notificaciones.mostrar('advertencia', msg, 4000),
};

// ==================== DOM ====================

export const DOM = {
  q: (selector) => document.querySelector(selector),
  qa: (selector) => document.querySelectorAll(selector),
  crearElemento: (tag, clases = '', html = '') => {
    const el = document.createElement(tag);
    if (clases) el.className = clases;
    if (html) el.innerHTML = html;
    return el;
  },
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
  agregarClase: (selector, clase) => DOM.q(selector)?.classList.add(clase),
  quitarClase: (selector, clase) => DOM.q(selector)?.classList.remove(clase),
  toggleClase: (selector, clase) => DOM.q(selector)?.classList.toggle(clase),
  mostrar: (selector) => DOM.q(selector) && (DOM.q(selector).style.display = 'block'),
  ocultar: (selector) => DOM.q(selector) && (DOM.q(selector).style.display = 'none'),
};

// ==================== UTILIDADES ====================

export const Utils = {
  alInicio: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  desplazarA: (selector, offset = 0) => {
    const el = DOM.q(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  debounce: (func, espera = 300) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), espera);
    };
  },
  uuid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  }),
  esperar: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
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

export default {
  Validaciones,
  Formatos,
  Almacenamiento,
  Notificaciones,
  DOM,
  Utils,
};
