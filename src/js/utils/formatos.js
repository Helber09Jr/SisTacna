/* ============================================================================
   FORMATOS.JS - Funciones de formateo de datos
   ============================================================================ */

import { CONFIG } from './firebase-config.js';

export const Formatos = {
  /**
   * Formatear moneda
   */
  moneda(valor, simbolo = CONFIG.pagos.simbolo) {
    return `${simbolo} ${Number(valor).toFixed(2)}`;
  },

  /**
   * Formatear número con separador de miles
   */
  numero(valor, decimales = 2) {
    return Number(valor).toLocaleString('es-PE', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });
  },

  /**
   * Formatear fecha a DD/MM/YYYY
   */
  fecha(date, formato = 'DD/MM/YYYY') {
    const d = new Date(date);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();

    if (formato === 'DD/MM/YYYY') return `${dia}/${mes}/${anio}`;
    if (formato === 'YYYY-MM-DD') return `${anio}-${mes}-${dia}`;
    if (formato === 'MMMM DD, YYYY') {
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return `${meses[d.getMonth()]} ${dia}, ${anio}`;
    }
    return date.toString();
  },

  /**
   * Formatear hora a HH:MM:SS
   */
  hora(date, conSegundos = false) {
    const d = new Date(date);
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    const segundos = String(d.getSeconds()).padStart(2, '0');

    return conSegundos ? `${horas}:${minutos}:${segundos}` : `${horas}:${minutos}`;
  },

  /**
   * Formatear fecha y hora completa
   */
  fechaHora(date) {
    return `${this.fecha(date)} ${this.hora(date)}`;
  },

  /**
   * Formatear teléfono: 999999999 → (9) 9999-9999
   */
  telefono(tel) {
    const clean = tel.replace(/\D/g, '');
    if (clean.length !== 9) return tel;
    return `(${clean[0]}) ${clean.slice(1, 5)}-${clean.slice(5)}`;
  },

  /**
   * Formatear RUC: 12345678901 → 12.345.678.901
   */
  ruc(ruc) {
    const clean = ruc.toString().replace(/\D/g, '');
    if (clean.length !== 11) return ruc;
    return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}.${clean.slice(8)}`;
  },

  /**
   * Convertir nombre a mayúsculas
   */
  mayusculas(texto) {
    return texto.toUpperCase();
  },

  /**
   * Convertir nombre a minúsculas
   */
  minusculas(texto) {
    return texto.toLowerCase();
  },

  /**
   * Capitalizar primera letra
   */
  capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  },

  /**
   * Titulo: Capitalizar cada palabra
   */
  titulo(texto) {
    return texto.split(' ').map(p => this.capitalizar(p)).join(' ');
  },

  /**
   * Slug: convertir a url-friendly
   */
  slug(texto) {
    return texto
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  /**
   * Truncar texto
   */
  truncar(texto, longitud = 50, sufijo = '...') {
    if (texto.length <= longitud) return texto;
    return texto.substring(0, longitud - sufijo.length) + sufijo;
  },

  /**
   * Formatear tamaño de archivo: 1024000 → 1.00 MB
   */
  tamanioArchivo(bytes) {
    const unidades = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < unidades.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${unidades[unitIndex]}`;
  },

  /**
   * Formatear tiempo de diferencia: 1000 → "1s", 60000 → "1m"
   */
  tiempoTranscurrido(ms) {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias}d`;
    if (horas > 0) return `${horas}h`;
    if (minutos > 0) return `${minutos}m`;
    return `${segundos}s`;
  },

  /**
   * Porcentaje: 0.15 → "15%"
   */
  porcentaje(valor, decimales = 0) {
    return `${(valor * 100).toFixed(decimales)}%`;
  },
};

export default Formatos;
