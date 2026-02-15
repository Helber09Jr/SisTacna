/* ============================================================================
   FECHAS.JS - Funciones para manipulación de fechas
   ============================================================================ */

export const Fechas = {
  /**
   * Obtener fecha de hoy
   */
  hoy() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /**
   * Obtener fecha de ayer
   */
  ayer() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /**
   * Obtener fecha de mañana
   */
  manana() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /**
   * Obtener rango de semana actual
   */
  semanaSemanaActual() {
    const d = new Date();
    const dia = d.getDay();
    const inicio = new Date(d);
    inicio.setDate(d.getDate() - dia);
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + 6);
    fin.setHours(23, 59, 59, 999);

    return { inicio, fin };
  },

  /**
   * Obtener rango del mes actual
   */
  mesActual() {
    const d = new Date();
    const inicio = new Date(d.getFullYear(), d.getMonth(), 1);
    const fin = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    fin.setHours(23, 59, 59, 999);

    return { inicio, fin };
  },

  /**
   * Obtener rango del año actual
   */
  anioActual() {
    const d = new Date();
    const inicio = new Date(d.getFullYear(), 0, 1);
    const fin = new Date(d.getFullYear(), 11, 31);
    fin.setHours(23, 59, 59, 999);

    return { inicio, fin };
  },

  /**
   * Obtener rango de últimos N días
   */
  ultimosDias(dias) {
    const fin = new Date();
    fin.setHours(23, 59, 59, 999);

    const inicio = new Date(fin);
    inicio.setDate(fin.getDate() - dias + 1);
    inicio.setHours(0, 0, 0, 0);

    return { inicio, fin };
  },

  /**
   * Diferencia entre dos fechas en días
   */
  diferenciaDias(fecha1, fecha2) {
    const d1 = new Date(fecha1);
    const d2 = new Date(fecha2);
    const diferencia = d2 - d1;
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  },

  /**
   * Diferencia entre dos fechas en horas
   */
  diferenciaHoras(fecha1, fecha2) {
    const d1 = new Date(fecha1);
    const d2 = new Date(fecha2);
    const diferencia = d2 - d1;
    return Math.floor(diferencia / (1000 * 60 * 60));
  },

  /**
   * Diferencia entre dos fechas en minutos
   */
  diferenciaMinutos(fecha1, fecha2) {
    const d1 = new Date(fecha1);
    const d2 = new Date(fecha2);
    const diferencia = d2 - d1;
    return Math.floor(diferencia / (1000 * 60));
  },

  /**
   * Agregar días a una fecha
   */
  agregarDias(fecha, dias) {
    const d = new Date(fecha);
    d.setDate(d.getDate() + dias);
    return d;
  },

  /**
   * Agregar meses a una fecha
   */
  agregarMeses(fecha, meses) {
    const d = new Date(fecha);
    d.setMonth(d.getMonth() + meses);
    return d;
  },

  /**
   * Agregar años a una fecha
   */
  agregarAnios(fecha, anios) {
    const d = new Date(fecha);
    d.setFullYear(d.getFullYear() + anios);
    return d;
  },

  /**
   * Obtener día de la semana (0 = domingo, 6 = sábado)
   */
  diaSemana(fecha) {
    return new Date(fecha).getDay();
  },

  /**
   * Obtener nombre del día
   */
  nombreDia(fecha) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[this.diaSemana(fecha)];
  },

  /**
   * Obtener número de semana del año
   */
  numeroSemana(fecha) {
    const d = new Date(fecha);
    const inicio = new Date(d.getFullYear(), 0, 1);
    const diff = d - inicio;
    const unDia = 1000 * 60 * 60 * 24;
    return Math.floor(diff / unDia / 7) + 1;
  },

  /**
   * Verificar si es fecha válida
   */
  esValida(fecha) {
    const d = new Date(fecha);
    return d instanceof Date && !isNaN(d);
  },

  /**
   * Convertir timestamp a fecha
   */
  desdeTimestamp(timestamp) {
    if (timestamp.toDate) {
      return timestamp.toDate(); // Si es Firestore Timestamp
    }
    return new Date(timestamp);
  },

  /**
   * Convertir fecha a timestamp (Firestore compatible)
   */
  aTimestamp(fecha) {
    return new Date(fecha).getTime();
  },

  /**
   * Fecha en formato ISO
   */
  iso(fecha) {
    return new Date(fecha).toISOString();
  },

  /**
   * Comparar fechas (retorna -1, 0 o 1)
   */
  comparar(fecha1, fecha2) {
    const d1 = new Date(fecha1).getTime();
    const d2 = new Date(fecha2).getTime();
    return d1 < d2 ? -1 : d1 > d2 ? 1 : 0;
  },

  /**
   * Verificar si fecha está entre dos fechas
   */
  entreFechas(fecha, inicio, fin) {
    const d = new Date(fecha).getTime();
    const i = new Date(inicio).getTime();
    const f = new Date(fin).getTime();
    return d >= i && d <= f;
  },

  /**
   * Obtener años desde una fecha
   */
  edadDesde(fecha) {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  },
};

export default Fechas;
