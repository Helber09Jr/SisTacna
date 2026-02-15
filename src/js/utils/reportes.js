/* ============================================================================
   REPORTES.JS - Generación y exportación de reportes
   ============================================================================ */

import { Formatos } from './formatos.js';
import { Notificaciones } from './notificaciones.js';

export const Reportes = {
  /**
   * Exportar datos a CSV
   */
  exportarCSV(datos, nombreArchivo = 'reporte') {
    try {
      if (!datos || datos.length === 0) {
        Notificaciones.advertencia('No hay datos para exportar');
        return;
      }

      // Obtener encabezados
      const encabezados = Object.keys(datos[0]);
      const headers = encabezados.join(',');

      // Convertir datos a CSV
      const filas = datos.map(fila => {
        return encabezados.map(encabezado => {
          let valor = fila[encabezado];
          // Escapar comillas
          if (typeof valor === 'string' && valor.includes(',')) {
            valor = `"${valor}"`;
          }
          return valor || '';
        }).join(',');
      });

      const csv = [headers, ...filas].join('\n');

      // Crear blob y descargar
      this.descargarArchivo(csv, `${nombreArchivo}.csv`, 'text/csv;charset=utf-8;');
      Notificaciones.exito('Archivo exportado correctamente');
    } catch (error) {
      Notificaciones.error('Error al exportar CSV');
      console.error(error);
    }
  },

  /**
   * Exportar datos a JSON
   */
  exportarJSON(datos, nombreArchivo = 'reporte') {
    try {
      const json = JSON.stringify(datos, null, 2);
      this.descargarArchivo(json, `${nombreArchivo}.json`, 'application/json;charset=utf-8;');
      Notificaciones.exito('Archivo JSON exportado');
    } catch (error) {
      Notificaciones.error('Error al exportar JSON');
      console.error(error);
    }
  },

  /**
   * Exportar a Excel (CSV compatible)
   */
  exportarExcel(datos, nombreArchivo = 'reporte') {
    try {
      // Excel requiere BOM para UTF-8
      const BOM = '\uFEFF';

      if (!datos || datos.length === 0) {
        Notificaciones.advertencia('No hay datos para exportar');
        return;
      }

      const encabezados = Object.keys(datos[0]);
      const headers = encabezados.join('\t');

      const filas = datos.map(fila => {
        return encabezados.map(encabezado => {
          let valor = fila[encabezado];
          if (typeof valor === 'object') {
            valor = JSON.stringify(valor);
          }
          return valor || '';
        }).join('\t');
      });

      const tsv = BOM + [headers, ...filas].join('\n');

      this.descargarArchivo(tsv, `${nombreArchivo}.xlsx`, 'application/vnd.ms-excel;charset=utf-8;');
      Notificaciones.exito('Archivo Excel exportado');
    } catch (error) {
      Notificaciones.error('Error al exportar Excel');
      console.error(error);
    }
  },

  /**
   * Exportar a PDF (requiere librería externa)
   */
  exportarPDF(contenidoHTML, nombreArchivo = 'reporte') {
    try {
      // Usar window.print() para imprimir a PDF
      const ventana = window.open('', '', 'width=1200,height=800');
      ventana.document.write(contenidoHTML);
      ventana.document.close();
      ventana.print();

      Notificaciones.exito('Abierto en vista previa de impresión');
    } catch (error) {
      Notificaciones.error('Error al generar PDF');
      console.error(error);
    }
  },

  /**
   * Función auxiliar para descargar archivos
   */
  descargarArchivo(contenido, nombreArchivo, tipo) {
    const blob = new Blob([contenido], { type: tipo });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  /**
   * Generar reporte HTML imprimible
   */
  generarReporteHTML(titulo, datos, columnas) {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${titulo}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h1 { text-align: center; color: #004e89; }
          .info-reporte {
            text-align: right;
            margin-bottom: 20px;
            font-size: 12px;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background-color: #004e89;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #f0f0f0;
          }
          .total-row {
            background-color: #e8f1f8;
            font-weight: bold;
          }
          @media print {
            body { margin: 10px; }
            table { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <h1>${titulo}</h1>
        <div class="info-reporte">
          <p>Generado: ${new Date().toLocaleString('es-PE')}</p>
        </div>
        <table>
          <thead>
            <tr>
              ${columnas.map(col => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${datos.map(fila => `
              <tr>
                ${Object.values(fila).map(valor => `<td>${valor}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    return html;
  },

  /**
   * Imprimir tabla
   */
  imprimirTabla(elementId, titulo = 'Reporte') {
    try {
      const elemento = document.getElementById(elementId);
      if (!elemento) {
        Notificaciones.error('Elemento no encontrado');
        return;
      }

      const ventana = window.open('', '', 'width=1200,height=800');
      ventana.document.write(`
        <html><head><title>${titulo}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #004e89; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #004e89; color: white; }
        </style>
        </head><body>
        <h1>${titulo}</h1>
        ${elemento.innerHTML}
        </body></html>
      `);
      ventana.document.close();
      ventana.print();
    } catch (error) {
      Notificaciones.error('Error al imprimir');
      console.error(error);
    }
  },

  /**
   * Generar estadísticas básicas
   */
  generarEstadisticas(datos, campos) {
    const estadisticas = {};

    campos.forEach(campo => {
      const valores = datos.map(d => Number(d[campo])).filter(v => !isNaN(v));

      if (valores.length === 0) {
        estadisticas[campo] = null;
        return;
      }

      const suma = valores.reduce((a, b) => a + b, 0);
      const promedio = suma / valores.length;
      const minimo = Math.min(...valores);
      const maximo = Math.max(...valores);

      estadisticas[campo] = {
        total: datos.length,
        suma,
        promedio,
        minimo,
        maximo,
      };
    });

    return estadisticas;
  },

  /**
   * Agrupar datos por campo
   */
  agrupar(datos, porCampo) {
    const grupos = {};

    datos.forEach(item => {
      const valor = item[porCampo];
      if (!grupos[valor]) {
        grupos[valor] = [];
      }
      grupos[valor].push(item);
    });

    return grupos;
  },

  /**
   * Generar reporte de ventas
   */
  generarReporteVentas(boletas) {
    const estadisticas = {
      totalVentas: 0,
      cantidadBoletas: boletas.length,
      ticketPromedio: 0,
      ventaPorHora: {},
      ventaPorDia: {},
    };

    boletas.forEach(boleta => {
      estadisticas.totalVentas += boleta.total || 0;
      const fecha = new Date(boleta.fecha);
      const hora = fecha.getHours();
      const dia = Formatos.fecha(fecha);

      estadisticas.ventaPorHora[hora] = (estadisticas.ventaPorHora[hora] || 0) + (boleta.total || 0);
      estadisticas.ventaPorDia[dia] = (estadisticas.ventaPorDia[dia] || 0) + (boleta.total || 0);
    });

    estadisticas.ticketPromedio = estadisticas.totalVentas / boletas.length;

    return estadisticas;
  },

  /**
   * Generar reporte de productos
   */
  generarReporteProductos(comandas) {
    const productos = {};

    comandas.forEach(comanda => {
      comanda.items?.forEach(item => {
        if (!productos[item.platoId]) {
          productos[item.platoId] = {
            nombre: item.nombre,
            cantidad: 0,
            monto: 0,
          };
        }
        productos[item.platoId].cantidad += item.cantidad;
        productos[item.platoId].monto += (item.precio * item.cantidad);
      });
    });

    return Object.values(productos).sort((a, b) => b.cantidad - a.cantidad);
  },
};

export default Reportes;
