/* ============================================================================
   ALMACENAMIENTO.JS - Wrapper para localStorage y sessionStorage
   ============================================================================ */

export const Almacenamiento = {
  /**
   * Guardar en localStorage
   */
  guardar(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error(`Error al guardar en localStorage: ${e}`);
      return false;
    }
  },

  /**
   * Obtener de localStorage
   */
  obtener(clave, porDefecto = null) {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : porDefecto;
    } catch (e) {
      console.error(`Error al obtener de localStorage: ${e}`);
      return porDefecto;
    }
  },

  /**
   * Eliminar de localStorage
   */
  eliminar(clave) {
    try {
      localStorage.removeItem(clave);
      return true;
    } catch (e) {
      console.error(`Error al eliminar de localStorage: ${e}`);
      return false;
    }
  },

  /**
   * Limpiar todo localStorage
   */
  limpiar() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error(`Error al limpiar localStorage: ${e}`);
      return false;
    }
  },

  /**
   * Verificar si existe una clave
   */
  existe(clave) {
    return localStorage.getItem(clave) !== null;
  },

  /**
   * Obtener todas las claves
   */
  claves() {
    return Object.keys(localStorage);
  },

  /**
   * Obtener tamaño total (en bytes)
   */
  tamano() {
    let total = 0;
    for (let clave in localStorage) {
      if (localStorage.hasOwnProperty(clave)) {
        total += localStorage[clave].length + clave.length;
      }
    }
    return total;
  },

  /**
   * === SESSION STORAGE ===
   */

  /**
   * Guardar en sessionStorage
   */
  guardarSesion(clave, valor) {
    try {
      sessionStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error(`Error al guardar en sessionStorage: ${e}`);
      return false;
    }
  },

  /**
   * Obtener de sessionStorage
   */
  obtenerSesion(clave, porDefecto = null) {
    try {
      const item = sessionStorage.getItem(clave);
      return item ? JSON.parse(item) : porDefecto;
    } catch (e) {
      console.error(`Error al obtener de sessionStorage: ${e}`);
      return porDefecto;
    }
  },

  /**
   * Eliminar de sessionStorage
   */
  eliminarSesion(clave) {
    try {
      sessionStorage.removeItem(clave);
      return true;
    } catch (e) {
      console.error(`Error al eliminar de sessionStorage: ${e}`);
      return false;
    }
  },

  /**
   * Limpiar todo sessionStorage
   */
  limpiarSesion() {
    try {
      sessionStorage.clear();
      return true;
    } catch (e) {
      console.error(`Error al limpiar sessionStorage: ${e}`);
      return false;
    }
  },

  /**
   * === INDEXEDDB (Para datos más grandes) ===
   */

  /**
   * Abrir base de datos IndexedDB
   */
  async abrirDB(nombreDB = 'SisTacna', version = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(nombreDB, version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('datos')) {
          db.createObjectStore('datos', { keyPath: 'id' });
        }
      };
    });
  },

  /**
   * Guardar en IndexedDB
   */
  async guardarIndexed(nombreDB, key, valor) {
    try {
      const db = await this.abrirDB(nombreDB);
      const tx = db.transaction('datos', 'readwrite');
      const store = tx.objectStore('datos');
      store.put({ id: key, valor });

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {
      console.error(`Error al guardar en IndexedDB: ${e}`);
      return false;
    }
  },

  /**
   * Obtener de IndexedDB
   */
  async obtenerIndexed(nombreDB, key) {
    try {
      const db = await this.abrirDB(nombreDB);
      const tx = db.transaction('datos', 'readonly');
      const store = tx.objectStore('datos');
      const request = store.get(key);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result?.valor || null);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error(`Error al obtener de IndexedDB: ${e}`);
      return null;
    }
  },
};

export default Almacenamiento;
