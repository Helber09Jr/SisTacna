/* ============================================================================
   FIREBASE-CONFIG.JS - Configuración central de Firebase
   ============================================================================
   Inicializa Firebase y exporta referencias a db y auth
   IMPORTANTE: Actualizar con credenciales reales antes de deploy
   ============================================================================ */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js';

/* ─────────────────────────────────────────────────────────────────────
   CREDENCIALES FIREBASE (Reemplazar con valores reales)
   ───────────────────────────────────────────────────────────────────── */

const firebaseConfig = {
  apiKey: 'AIzaSyDzB5rZf-G3qQ8pK9vL2mN7oP1sT3uV4wX5yZ',
  authDomain: 'sistacna-demo.firebaseapp.com',
  projectId: 'sistacna-demo',
  storageBucket: 'sistacna-demo.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456',
};

/* ─────────────────────────────────────────────────────────────────────
   INICIALIZAR FIREBASE
   ───────────────────────────────────────────────────────────────────── */

const app = initializeApp(firebaseConfig);

/* Servicios de Firebase */
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/* ─────────────────────────────────────────────────────────────────────
   REFERENCIAS A COLECCIONES (Para facilitar acceso)
   ───────────────────────────────────────────────────────────────────── */

export const colecciones = {
  usuarios_admin: collection(db, 'usuarios_admin'),
  menus: collection(db, 'menus'),
  platos: collection(db, 'platos'),
  comandas: collection(db, 'comandas'),
  boletas: collection(db, 'boletas'),
  auditoria: collection(db, 'auditoria'),
};

/* ─────────────────────────────────────────────────────────────────────
   CONFIGURACIÓN GLOBAL
   ───────────────────────────────────────────────────────────────────── */

export const CONFIG = {
  /* Información del restaurante */
  restaurante: {
    nombre: 'SISTACNA',
    ruc: '12345678901',
    direccion: 'Calle Principal 123, Lima, Perú',
    telefono: '+51 1 2345678',
    email: 'contacto@sistacna.com',
    web: 'https://sistacna.pe',
  },

  /* Configuración de operación */
  operacion: {
    horarioApertura: '11:00',
    horarioCierre: '23:00',
    diasAbierto: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    mesasTotal: 20,
    zonas: ['cocina', 'bebidas', 'panaderia'], // Zonas para impresoras
  },

  /* Configuración de pagos */
  pagos: {
    moneda: 'PEN',
    simbolo: 'S/.',
    metodos: ['efectivo', 'tarjeta', 'transferencia'],
    igv: 0.18, // 18% en Perú
  },

  /* Configuración de auditoría */
  auditoria: {
    registrarTodo: true,
    retentionDays: 180, // Guardar 6 meses
  },

  /* Rutas de la aplicación */
  rutas: {
    home: '/',
    carta: '/carta.html',
    admin: '/admin.html',
    login: '/admin.html?login=true',
  },

  /* Límites y restricciones */
  limites: {
    maxItemsCarrito: 50,
    maxComandas: 999, // Número correlativo de comandas
    maxInventario: 10000,
  },
};

/* ─────────────────────────────────────────────────────────────────────
   FUNCIONES AUXILIARES
   ───────────────────────────────────────────────────────────────────── */

/**
 * Obtener información del restaurante
 */
export function obtenerConfigRestaurante() {
  return CONFIG.restaurante;
}

/**
 * Verificar si el restaurante está abierto
 */
export function estaAbierto() {
  const ahora = new Date();
  const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;
  const diaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][ahora.getDay()];

  const abierto =
    hora >= CONFIG.operacion.horarioApertura &&
    hora <= CONFIG.operacion.horarioCierre &&
    CONFIG.operacion.diasAbierto.includes(diaSemana);

  return abierto;
}

/**
 * Formatear moneda según configuración
 */
export function formatearMoneda(valor) {
  return `${CONFIG.pagos.simbolo} ${valor.toFixed(2)}`;
}

/**
 * Calcular IGV
 */
export function calcularIGV(monto) {
  return monto * CONFIG.pagos.igv;
}

/**
 * Calcular total con IGV
 */
export function calcularTotalConIGV(monto) {
  return monto + calcularIGV(monto);
}

export default app;
