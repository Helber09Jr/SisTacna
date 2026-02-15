/* ============================================================================
   AUDITORIA.JS - Registro de auditoría en Firebase
   ============================================================================ */

import { db, CONFIG } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

export const Auditoria = {
  /**
   * Registrar acción en la base de datos
   */
  async registrar(datos) {
    if (!CONFIG.auditoria.registrarTodo) return false;

    try {
      const registro = {
        ...datos,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        idioma: navigator.language,
      };

      // Agregar a Firestore
      const docRef = await addDoc(collection(db, 'auditoria'), registro);
      console.log(`✅ Auditoría registrada: ${docRef.id}`);
      return true;
    } catch (error) {
      console.error('Error al registrar auditoría:', error);
      return false;
    }
  },

  /**
   * Registrar login
   */
  async login(email, uid) {
    return this.registrar({
      accion: 'LOGIN',
      email,
      uid,
      tipo: 'autenticacion',
    });
  },

  /**
   * Registrar logout
   */
  async logout(email, uid) {
    return this.registrar({
      accion: 'LOGOUT',
      email,
      uid,
      tipo: 'autenticacion',
    });
  },

  /**
   * Registrar creación de comanda
   */
  async crearComanda(comandaId, datos) {
    return this.registrar({
      accion: 'COMANDA_CREAR',
      entityId: comandaId,
      datos,
      tipo: 'comanda',
    });
  },

  /**
   * Registrar cambio de estado de comanda
   */
  async cambiarEstadoComanda(comandaId, estadoAnterior, estadoNuevo) {
    return this.registrar({
      accion: 'COMANDA_ESTADO_CAMBIO',
      entityId: comandaId,
      estadoAnterior,
      estadoNuevo,
      tipo: 'comanda',
    });
  },

  /**
   * Registrar creación de boleta
   */
  async crearBoleta(boletaId, total, items) {
    return this.registrar({
      accion: 'BOLETA_CREAR',
      entityId: boletaId,
      total,
      cantidadItems: items?.length || 0,
      tipo: 'boleta',
    });
  },

  /**
   * Registrar anulación de boleta
   */
  async anularBoleta(boletaId, motivo) {
    return this.registrar({
      accion: 'BOLETA_ANULAR',
      entityId: boletaId,
      motivo,
      tipo: 'boleta',
    });
  },

  /**
   * Registrar cambio en carta (platos)
   */
  async cambiarPlato(platoId, campo, valorAnterior, valorNuevo) {
    return this.registrar({
      accion: 'PLATO_CAMBIO',
      entityId: platoId,
      campo,
      valorAnterior,
      valorNuevo,
      tipo: 'plato',
    });
  },

  /**
   * Registrar creación de usuario
   */
  async crearUsuario(uid, email, rol) {
    return this.registrar({
      accion: 'USUARIO_CREAR',
      entityId: uid,
      email,
      rol,
      tipo: 'usuario',
    });
  },

  /**
   * Registrar cambio de rol
   */
  async cambiarRol(uid, rolAnterior, rolNuevo) {
    return this.registrar({
      accion: 'USUARIO_ROL_CAMBIO',
      entityId: uid,
      rolAnterior,
      rolNuevo,
      tipo: 'usuario',
    });
  },

  /**
   * Registrar desactivación de usuario
   */
  async desactivarUsuario(uid, razon) {
    return this.registrar({
      accion: 'USUARIO_DESACTIVAR',
      entityId: uid,
      razon,
      tipo: 'usuario',
    });
  },

  /**
   * Registrar error
   */
  async registrarError(mensaje, stack, pagina) {
    return this.registrar({
      accion: 'ERROR',
      tipo: 'error',
      mensaje,
      stack,
      pagina,
    });
  },

  /**
   * Registrar acceso a área restringida
   */
  async accesoRestringido(pagina, razon) {
    return this.registrar({
      accion: 'ACCESO_DENEGADO',
      tipo: 'seguridad',
      pagina,
      razon,
    });
  },

  /**
   * Registrar cambio en configuración
   */
  async cambiarConfiguracion(campo, valorAnterior, valorNuevo) {
    return this.registrar({
      accion: 'CONFIG_CAMBIO',
      tipo: 'configuracion',
      campo,
      valorAnterior,
      valorNuevo,
    });
  },

  /**
   * Registrar impresión de documento
   */
  async impresion(tipo, documentoId) {
    return this.registrar({
      accion: 'IMPRESION',
      tipo: 'impresion',
      tipoDocumento: tipo,
      entityId: documentoId,
    });
  },

  /**
   * Registrar exportación de datos
   */
  async exportacion(formato, cantidad, rango) {
    return this.registrar({
      accion: 'EXPORTACION',
      tipo: 'exportacion',
      formato,
      cantidad,
      rango,
    });
  },
};

// Capturar errores globales
window.addEventListener('error', (event) => {
  Auditoria.registrarError(
    event.message,
    event.error?.stack || 'Sin stack trace',
    window.location.pathname,
  );
});

export default Auditoria;
