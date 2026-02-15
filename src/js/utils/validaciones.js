/* ============================================================================
   VALIDACIONES.JS - Funciones reutilizables de validación
   ============================================================================ */

export const Validaciones = {
  /**
   * Validar email
   */
  email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Validar contraseña (mínimo 8 caracteres)
   */
  contrasena(pass) {
    return pass && pass.length >= 8;
  },

  /**
   * Validar teléfono (solo números y 9 dígitos)
   */
  telefono(tel) {
    const regex = /^[0-9]{9}$/;
    return regex.test(tel.replace(/[-\s]/g, ''));
  },

  /**
   * Validar RUC (11 dígitos)
   */
  ruc(ruc) {
    const regex = /^[0-9]{11}$/;
    return regex.test(ruc);
  },

  /**
   * Validar URL
   */
  url(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validar que no esté vacío
   */
  requerido(valor) {
    return valor !== null && valor !== undefined && valor.toString().trim() !== '';
  },

  /**
   * Validar longitud mínima
   */
  minLength(valor, min) {
    return valor && valor.toString().length >= min;
  },

  /**
   * Validar longitud máxima
   */
  maxLength(valor, max) {
    return valor && valor.toString().length <= max;
  },

  /**
   * Validar que sea número
   */
  esNumero(valor) {
    return !isNaN(valor) && valor !== '';
  },

  /**
   * Validar que sea número positivo
   */
  esPositivo(valor) {
    return this.esNumero(valor) && Number(valor) > 0;
  },

  /**
   * Validar dinero/moneda
   */
  moneda(valor) {
    return /^\d+(\.\d{1,2})?$/.test(valor.toString());
  },

  /**
   * Validar fecha (DD/MM/YYYY o YYYY-MM-DD)
   */
  fecha(fecha) {
    const regex1 = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
    const regex2 = /^\d{4}-\d{2}-\d{2}$/;   // YYYY-MM-DD
    return regex1.test(fecha) || regex2.test(fecha);
  },

  /**
   * Validar hora (HH:MM)
   */
  hora(hora) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
  },

  /**
   * Validar que sea iguales (para confirmación de contraseña)
   */
  sonIguales(valor1, valor2) {
    return valor1 === valor2;
  },
};

export default Validaciones;
