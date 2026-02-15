/* ============================================================================
   MANEJO-ERRORES.JS - Gestor centralizado de errores
   ============================================================================ */

import { Notificaciones } from './notificaciones.js';
import { Auditoria } from './auditoria.js';

export class GestorErrores {
  static registrarErrorGlobal() {
    // Errores no capturados
    window.addEventListener('error', (event) => {
      GestorErrores.manejar({
        tipo: 'error_global',
        mensaje: event.message,
        stack: event.error?.stack,
      });
    });

    // Promesas rechazadas no capturadas
    window.addEventListener('unhandledrejection', (event) => {
      GestorErrores.manejar({
        tipo: 'promesa_rechazada',
        mensaje: event.reason?.message || event.reason,
        stack: event.reason?.stack,
      });
    });
  }

  /**
   * Manejar error de forma centralizada
   */
  static manejar(error) {
    const { tipo, mensaje, stack, mostrarUsuario = true } = error;

    // Loguear en consola
    console.error(`[${tipo}]`, mensaje, stack);

    // Registrar en auditoría
    if (typeof Auditoria !== 'undefined') {
      Auditoria.registrarError(mensaje, stack, window.location.pathname);
    }

    // Mostrar al usuario
    if (mostrarUsuario) {
      const mensajeUsuario = GestorErrores.obtenerMensajeUsuario(tipo, mensaje);
      Notificaciones.error(mensajeUsuario, 5000);
    }

    // Notificar a servidor (opcional)
    GestorErrores.notificarServidor(error);
  }

  /**
   * Obtener mensaje amigable según tipo de error
   */
  static obtenerMensajeUsuario(tipo, mensaje) {
    const mensajes = {
      error_global: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
      promesa_rechazada: 'Error en la operación. Por favor, intenta de nuevo.',
      firebase_auth: 'Error de autenticación. Verifica tus credenciales.',
      firebase_db: 'Error en la base de datos. Por favor, intenta de nuevo.',
      red: 'Sin conexión a internet. Verifica tu conexión.',
      validacion: mensaje || 'Los datos ingresados no son válidos.',
      permiso: 'No tienes permiso para realizar esta acción.',
    };

    return mensajes[tipo] || mensajes.error_global;
  }

  /**
   * Enviar error a servidor de logs (opcional)
   */
  static notificarServidor(error) {
    // Si tienes un servidor de logs, puedes enviar acá
    // fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(error)
    // });
  }

  /**
   * Manejo específico para Firebase
   */
  static manejarErrorFirebase(error) {
    const codigo = error.code;
    const mensajes = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El email ya está registrado',
      'auth/weak-password': 'La contraseña es muy débil',
      'auth/invalid-email': 'Email no válido',
      'permission-denied': 'Acceso denegado. No tienes permisos.',
      'not-found': 'El recurso no existe',
      'unavailable': 'El servicio no está disponible. Intenta más tarde.',
      'unauthenticated': 'Debes estar autenticado',
    };

    const mensaje = mensajes[codigo] || error.message;

    this.manejar({
      tipo: 'firebase_' + error.code.split('/')[0],
      mensaje,
      stack: error.stack,
      mostrarUsuario: true,
    });
  }

  /**
   * Manejo específico para errores de red
   */
  static manejarErrorRed(error) {
    this.manejar({
      tipo: 'red',
      mensaje: 'Error de conexión: ' + error.message,
      stack: error.stack,
      mostrarUsuario: true,
    });
  }

  /**
   * Manejo específico para errores de validación
   */
  static manejarErrorValidacion(mensaje) {
    this.manejar({
      tipo: 'validacion',
      mensaje,
      mostrarUsuario: true,
    });
  }

  /**
   * Manejo específico para errores de permiso
   */
  static manejarErrorPermiso(mensaje = 'No tienes permiso para esta acción') {
    this.manejar({
      tipo: 'permiso',
      mensaje,
      mostrarUsuario: true,
    });
  }

  /**
   * Wrapper para try-catch asincrónico
   */
  static async ejecutarSeguro(funcion, contexto = null) {
    try {
      return await funcion.call(contexto);
    } catch (error) {
      this.manejar({
        tipo: 'error_ejecucion',
        mensaje: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Wrapper para fetch con manejo de errores
   */
  static async fetchSeguro(url, opciones = {}) {
    try {
      const respuesta = await fetch(url, opciones);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      return respuesta;
    } catch (error) {
      if (error instanceof TypeError) {
        this.manejarErrorRed(error);
      } else {
        this.manejar({
          tipo: 'fetch_error',
          mensaje: error.message,
          stack: error.stack,
        });
      }
      throw error;
    }
  }
}

// Registrar manejador global en carga
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GestorErrores.registrarErrorGlobal());
} else {
  GestorErrores.registrarErrorGlobal();
}

export default GestorErrores;
