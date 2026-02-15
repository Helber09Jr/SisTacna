/* ============================================================================
   FIREBASE-CONFIG.JS - Configuración central de Firebase
   ============================================================================ */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDzB5rZf-G3qQ8pK9vL2mN7oP1sT3uV4wX5yZ',
  authDomain: 'sistacna-demo.firebaseapp.com',
  projectId: 'sistacna-demo',
  storageBucket: 'sistacna-demo.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const CONFIG = {
  restaurante: {
    nombre: 'SISTACNA',
    ruc: '12345678901',
    direccion: 'Calle Principal 123, Lima, Perú',
    telefono: '+51 1 2345678',
    email: 'contacto@sistacna.com',
  },
  operacion: {
    horarioApertura: '11:00',
    horarioCierre: '23:00',
    zonas: ['cocina', 'bebidas'],
  },
  pagos: {
    moneda: 'PEN',
    simbolo: 'S/.',
    igv: 0.18,
  },
};

export default app;
