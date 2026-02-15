/**
 * MÓDULO ADMIN
 * Panel administrativo completo
 * - Gestión de comandas
 * - Caja y reportes
 * - Boletas
 * - Usuarios
 * - Auditoría
 */

import { DOM, Almacenamiento, Notificaciones, Formatos } from './utils.js';

// ======================================
// VARIABLES GLOBALES
// ======================================

let usuarioActual = { id: 1, nombre: 'Admin', rol: 'admin' };
let filtroComandaActual = {};
let comandasEnMemoria = [];
let usuariosRegistrados = [];
let logAuditoria = [];

// ======================================
// INICIALIZACIÓN
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});

function inicializar() {
    cargarDatos();
    configurarNavMenu();
    configurarTabs();
    configurarEventosComandas();
    configurarEventosCaja();
    configurarEventosBoletas();
    configurarEventosUsuarios();
    configurarEventosAuditoria();
    renderizarComandas();
    renderizarCaja();
    renderizarBoletas();
    renderizarUsuarios();
    renderizarAuditoria();
}

// ======================================
// CARGAR DATOS DESDE STORAGE
// ======================================

function cargarDatos() {
    // Cargar pedidos/comandas
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    comandasEnMemoria = pedidosGuardados.map((pedido, index) => ({
        ...pedido,
        estado: pedido.estado || 'pendiente',
        hora: pedido.fecha || new Date().toLocaleTimeString('es-PE')
    }));

    // Cargar usuarios
    usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios_sistacna') || '[]');
    if (usuariosRegistrados.length === 0) {
        usuariosRegistrados = [
            { id: 1, nombre: 'Admin', email: 'admin@sistacna.com', rol: 'admin' },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@sistacna.com', rol: 'cocinero' },
            { id: 3, nombre: 'María García', email: 'maria@sistacna.com', rol: 'caja' }
        ];
        guardarUsuarios();
    }

    // Cargar auditoria
    logAuditoria = JSON.parse(localStorage.getItem('auditoria_sistacna') || '[]');
}

// ======================================
// TABS NAVEGACION
// ======================================

function configurarTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => cambiarTab(btn.dataset.tab));
    });
}

function cambiarTab(tabName) {
    // Remover clase activo de todos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('activo'));
    document.querySelectorAll('.tab-contenido').forEach(tab => tab.classList.remove('activo'));

    // Agregar clase activo al seleccionado
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('activo');
    document.getElementById(`tab-${tabName}`).classList.add('activo');

    // Refrescar datos del tab
    setTimeout(() => {
        if (tabName === 'comandas') renderizarComandas();
        if (tabName === 'caja') renderizarCaja();
        if (tabName === 'boletas') renderizarBoletas();
        if (tabName === 'usuarios') renderizarUsuarios();
        if (tabName === 'auditoria') renderizarAuditoria();
    }, 100);
}

// ======================================
// SECCION: COMANDAS
// ======================================

function configurarEventosComandas() {
    const filtroEstado = DOM.obtener('#filtroEstado');
    const filtroPago = DOM.obtener('#filtroPago');
    const buscarComanda = DOM.obtener('#buscarComanda');
    const btnRefresh = DOM.obtener('#btnRefreshComandas');

    filtroEstado?.addEventListener('change', () => renderizarComandas());
    filtroPago?.addEventListener('change', () => renderizarComandas());
    buscarComanda?.addEventListener('input', () => renderizarComandas());
    btnRefresh?.addEventListener('click', () => {
        cargarDatos();
        renderizarComandas();
    });
}

function renderizarComandas() {
    const listaComandas = DOM.obtener('#listaComandas');
    const contadorComandas = DOM.obtener('#totalComandas');

    if (!listaComandas) return;

    // Obtener filtros
    const filtroEstado = DOM.obtener('#filtroEstado')?.value || '';
    const filtroPago = DOM.obtener('#filtroPago')?.value || '';
    const buscarComanda = DOM.obtener('#buscarComanda')?.value.toUpperCase() || '';

    // Filtrar comandas
    let comandasFiltradas = comandasEnMemoria.filter(comanda => {
        let cumple = true;
        if (filtroEstado && comanda.estado !== filtroEstado) cumple = false;
        if (filtroPago && comanda.metodo !== filtroPago) cumple = false;
        if (buscarComanda && !comanda.id.includes(buscarComanda)) cumple = false;
        return cumple;
    });

    listaComandas.innerHTML = '';

    if (comandasFiltradas.length === 0) {
        listaComandas.innerHTML = '<p style="text-align:center; padding: 2rem; color: var(--color-gris-oscuro);">No hay comandas con estos filtros</p>';
        contadorComandas.textContent = '0';
        return;
    }

    comandasFiltradas.forEach((comanda, idx) => {
        const card = crearCardComanda(comanda, idx);
        listaComandas.appendChild(card);
    });

    contadorComandas.textContent = comandasFiltradas.length;
}

function crearCardComanda(comanda, idx) {
    const div = document.createElement('div');
    div.className = 'comanda-card';
    div.style.cursor = 'pointer';

    const itemsHtml = comanda.items.map(item =>
        `<div class="item-comanda"><span>${item.cantidad}x ${item.nombre}</span><span>${Formatos.moneda(item.cantidad * item.precio)}</span></div>`
    ).join('');

    const iconoEstado = {
        'pendiente': '🕐',
        'preparacion': '👨‍🍳',
        'listo': '✅',
        'entregado': '🎉'
    }[comanda.estado] || '❓';

    div.innerHTML = `
        <div class="comanda-header">
            <div class="comanda-id">${comanda.id}</div>
            <span class="badge-estado ${comanda.estado}">${iconoEstado} ${comanda.estado.charAt(0).toUpperCase() + comanda.estado.slice(1)}</span>
        </div>

        <div class="comanda-info">
            <div class="info-item">
                <span class="info-label">Hora</span>
                <span class="info-valor">${comanda.hora}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Método Pago</span>
                <span class="info-valor">${comanda.metodo}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Observaciones</span>
                <span class="info-valor">${comanda.observaciones || 'Ninguna'}</span>
            </div>
        </div>

        <div class="comanda-items">
            ${itemsHtml}
        </div>

        <div class="comanda-total">
            Total: ${Formatos.moneda(comanda.total)}
        </div>
    `;

    div.addEventListener('click', () => abrirDetalleComanda(comanda));

    return div;
}

function abrirDetalleComanda(comanda) {
    const modal = DOM.obtener('#modalComanda');
    const detalle = DOM.obtener('#detalleComanda');
    const nuevoEstado = DOM.obtener('#nuevoEstado');

    if (!modal || !detalle) return;

    const itemsHtml = comanda.items.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
            <span>${item.cantidad}x ${item.nombre}</span>
            <span>${Formatos.moneda(item.precio * item.cantidad)}</span>
        </div>
    `).join('');

    detalle.innerHTML = `
        <div class="detalleComanda">
            <div class="detalle-grupo">
                <div class="detalle-label">ID Comanda</div>
                <div class="detalle-valor">${comanda.id}</div>
            </div>
            <div class="detalle-grupo">
                <div class="detalle-label">Fecha y Hora</div>
                <div class="detalle-valor">${comanda.hora}</div>
            </div>
            <div class="detalle-grupo">
                <div class="detalle-label">Items</div>
                <div style="color: var(--color-oscuro);">
                    ${itemsHtml}
                    <div style="border-top: 1px solid var(--color-gris-claro); padding-top: 0.5rem; margin-top: 0.5rem; font-weight: bold;">
                        Subtotal: ${Formatos.moneda(comanda.subtotal)}<br>
                        IGV: ${Formatos.moneda(comanda.igv)}<br>
                        Total: ${Formatos.moneda(comanda.total)}
                    </div>
                </div>
            </div>
            <div class="detalle-grupo">
                <div class="detalle-label">Método de Pago</div>
                <div class="detalle-valor">${comanda.metodo}</div>
            </div>
            <div class="detalle-grupo">
                <div class="detalle-label">Observaciones</div>
                <div class="detalle-valor">${comanda.observaciones || 'Ninguna'}</div>
            </div>
        </div>
    `;

    nuevoEstado.value = comanda.estado;

    DOM.obtener('#btnActualizarComanda').onclick = () => {
        comanda.estado = nuevoEstado.value;
        guardarComandas();
        registrarAuditoria('editar_comanda', `Cambió estado a ${comanda.estado}`, { comanda_id: comanda.id });
        renderizarComandas();
        modal.classList.remove('activo');
        Notificaciones.mostrar('exito', 'Estado actualizado');
    };

    modal.classList.add('activo');
}

function guardarComandas() {
    localStorage.setItem('pedidos', JSON.stringify(comandasEnMemoria));
}

// ======================================
// SECCION: CAJA
// ======================================

function configurarEventosCaja() {
    const btnCerrarCaja = DOM.obtener('#btnCerrarCaja');
    btnCerrarCaja?.addEventListener('click', cerrarCaja);
}

function renderizarCaja() {
    const totalVendido = DOM.obtener('#totalVendido');
    const totalIGV = DOM.obtener('#totalIGV');
    const totalSubtotal = DOM.obtener('#totalSubtotal');
    const contadorVentas = DOM.obtener('#contadorVentas');
    const contadorPlatos = DOM.obtener('#contadorPlatos');

    if (!totalVendido) return;

    // Calcular totales
    let sumTotal = 0;
    let sumIGV = 0;
    let sumSubtotal = 0;
    let contPlatos = 0;

    comandasEnMemoria.forEach(comanda => {
        sumTotal += comanda.total || 0;
        sumIGV += comanda.igv || 0;
        sumSubtotal += comanda.subtotal || 0;
        contPlatos += (comanda.items?.length || 0);
    });

    totalVendido.textContent = Formatos.moneda(sumTotal);
    totalIGV.textContent = Formatos.moneda(sumIGV);
    totalSubtotal.textContent = Formatos.moneda(sumSubtotal);
    contadorVentas.textContent = `${comandasEnMemoria.length} pedidos`;
    contadorPlatos.textContent = `${contPlatos} platos`;

    // Desglose por método de pago
    renderizarDesgloseMetodos();

    // Top platos
    renderizarTopPlatos();
}

function renderizarDesgloseMetodos() {
    const container = DOM.obtener('#desgloseMetodos');
    if (!container) return;

    const metodos = { 'efectivo': 0, 'tarjeta': 0, 'yape': 0 };
    const montos = { 'efectivo': 0, 'tarjeta': 0, 'yape': 0 };
    let totalGeneral = 0;

    comandasEnMemoria.forEach(comanda => {
        const metodo = comanda.metodo || 'efectivo';
        metodos[metodo]++;
        montos[metodo] += comanda.total || 0;
        totalGeneral += comanda.total || 0;
    });

    container.innerHTML = Object.entries(metodos).map(([metodo, cantidad]) => {
        const monto = montos[metodo];
        const porcentaje = totalGeneral > 0 ? ((monto / totalGeneral) * 100).toFixed(1) : 0;
        const iconos = { 'efectivo': '💵', 'tarjeta': '💳', 'yape': '📱' };

        return `
            <div class="fila-desglose">
                <div class="col-metodo">${iconos[metodo]} ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}</div>
                <div class="col-cantidad">${cantidad}</div>
                <div class="col-monto">${Formatos.moneda(monto)}</div>
                <div class="col-porcentaje">${porcentaje}%</div>
            </div>
        `;
    }).join('');
}

function renderizarTopPlatos() {
    const container = DOM.obtener('#topPlatos');
    if (!container) return;

    const conteoPlatos = {};

    comandasEnMemoria.forEach(comanda => {
        (comanda.items || []).forEach(item => {
            if (!conteoPlatos[item.nombre]) {
                conteoPlatos[item.nombre] = { cantidad: 0, monto: 0, precio: item.precio };
            }
            conteoPlatos[item.nombre].cantidad += item.cantidad;
            conteoPlatos[item.nombre].monto += item.precio * item.cantidad;
        });
    });

    const topPlatos = Object.entries(conteoPlatos)
        .map(([nombre, datos]) => ({ nombre, ...datos }))
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 5);

    if (topPlatos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-gris-oscuro);">Sin datos</p>';
        return;
    }

    container.innerHTML = topPlatos.map(plato => `
        <div class="item-top">
            <div>
                <div class="item-top-nombre" style="font-weight: bold;">${plato.nombre}</div>
                <div class="item-top-cantidad">${plato.cantidad} unidad${plato.cantidad > 1 ? 'es' : ''}</div>
            </div>
            <div class="item-top-monto">${Formatos.moneda(plato.monto)}</div>
        </div>
    `).join('');
}

function cerrarCaja() {
    if (confirm('¿Deseas cerrar la caja del día? Esta acción no se puede deshacer.')) {
        const totalVendido = comandasEnMemoria.reduce((sum, c) => sum + (c.total || 0), 0);
        registrarAuditoria('cerrar_caja', `Caja cerrada con total: ${Formatos.moneda(totalVendido)}`);
        Notificaciones.mostrar('exito', 'Caja cerrada correctamente');
        // Limpiar comandas del día
        comandasEnMemoria = [];
        guardarComandas();
        renderizarCaja();
    }
}

// ======================================
// SECCION: BOLETAS
// ======================================

function configurarEventosBoletas() {
    const btnGenerar = DOM.obtener('#btnGenerarBoleta');
    const btnCerrarBoleta = DOM.obtener('#btnCerrarModalBoleta');
    const btnImprimir = DOM.obtener('#btnImprimirBoleta');
    const btnDescargar = DOM.obtener('#btnDescargarBoleta');

    btnGenerar?.addEventListener('click', generarBoleta);
    btnCerrarBoleta?.addEventListener('click', () => {
        DOM.obtener('#modalBoleta').classList.remove('activo');
    });
    btnImprimir?.addEventListener('click', imprimirBoleta);
    btnDescargar?.addEventListener('click', descargarBoleta);
}

function renderizarBoletas() {
    const filasBody = DOM.obtener('#filasBoletasBody');
    if (!filasBody) return;

    const boletasGuardadas = JSON.parse(localStorage.getItem('boletas_sistacna') || '[]');

    if (boletasGuardadas.length === 0) {
        filasBody.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--color-gris-oscuro);">No hay boletas generadas</p>';
        return;
    }

    filasBody.innerHTML = boletasGuardadas.map(boleta => `
        <div class="fila-boleta">
            <div class="col-numero">${boleta.numero}</div>
            <div class="col-fecha">${boleta.fecha}</div>
            <div class="col-cliente">${boleta.cliente || 'General'}</div>
            <div class="col-monto">${Formatos.moneda(boleta.monto)}</div>
            <div class="col-estado">
                <span class="badge-estado ${boleta.estado}">${boleta.estado}</span>
            </div>
            <div class="col-acciones">
                <button class="btn-ver" onclick="window.verBoletaModal(${boletasGuardadas.indexOf(boleta)})">Ver</button>
            </div>
        </div>
    `).join('');
}

function generarBoleta() {
    const boletas = JSON.parse(localStorage.getItem('boletas_sistacna') || '[]');
    const numero = `B-${String(boletas.length + 1).padStart(6, '0')}`;
    const monto = comandasEnMemoria.reduce((sum, c) => sum + (c.total || 0), 0);

    const boleta = {
        numero: numero,
        fecha: new Date().toLocaleString('es-PE'),
        cliente: 'General',
        monto: monto,
        detalles: [...comandasEnMemoria],
        estado: 'emitida'
    };

    boletas.push(boleta);
    localStorage.setItem('boletas_sistacna', JSON.stringify(boletas));
    registrarAuditoria('generar_boleta', `Boleta generada: ${numero}`, { monto });

    Notificaciones.mostrar('exito', `Boleta ${numero} generada`);
    renderizarBoletas();
}

window.verBoletaModal = (idx) => {
    const boletasGuardadas = JSON.parse(localStorage.getItem('boletas_sistacna') || '[]');
    const boleta = boletasGuardadas[idx];
    const modal = DOM.obtener('#modalBoleta');
    const detalleModal = DOM.obtener('#detalleBoletaModal');

    const detallesHtml = (boleta.detalles || []).map(d => `
        <tr>
            <td>${d.nombre || d.id}</td>
            <td>${d.cantidad || 1}</td>
            <td>${Formatos.moneda(d.total || (d.cantidad * d.precio))}</td>
        </tr>
    `).join('');

    detalleModal.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <p><strong>Número:</strong> ${boleta.numero}</p>
            <p><strong>Fecha:</strong> ${boleta.fecha}</p>
            <p><strong>Cliente:</strong> ${boleta.cliente}</p>
            <hr>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <th style="text-align: left;">Item</th>
                    <th>Cant</th>
                    <th style="text-align: right;">Total</th>
                </tr>
                ${detallesHtml}
            </table>
            <hr>
            <p style="text-align: right; font-size: 1.2rem; font-weight: bold;">
                Total: ${Formatos.moneda(boleta.monto)}
            </p>
        </div>
    `;

    modal.classList.add('activo');
};

function imprimirBoleta() {
    window.print();
}

function descargarBoleta() {
    Notificaciones.mostrar('info', 'Función de descarga en desarrollo');
}

// ======================================
// SECCION: USUARIOS
// ======================================

function configurarEventosUsuarios() {
    const formNuevo = DOM.obtener('#formNuevoUsuario');
    formNuevo?.addEventListener('submit', (e) => {
        e.preventDefault();
        crearNuevoUsuario();
    });
}

function renderizarUsuarios() {
    const filasUsuarios = DOM.obtener('#filasUsuarios');
    if (!filasUsuarios) return;

    filasUsuarios.innerHTML = usuariosRegistrados.map((usuario, idx) => `
        <div class="fila-usuario">
            <div class="usuario-nombre">
                <span class="usuario-label">Nombre</span>
                <span class="usuario-valor">${usuario.nombre}</span>
            </div>
            <div class="usuario-email">
                <span class="usuario-label">Email</span>
                <span class="usuario-valor">${usuario.email}</span>
            </div>
            <div class="usuario-rol">
                <span class="usuario-label">Rol</span>
                <span class="usuario-valor">${usuario.rol}</span>
            </div>
            <div class="usuario-acciones">
                <button class="btn-xs btn-editar" onclick="alert('Editar en desarrollo')">✏️ Editar</button>
                <button class="btn-xs btn-eliminar-usuario" onclick="eliminarUsuario(${idx})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function crearNuevoUsuario() {
    const nombre = DOM.obtener('#nuevoNombre').value;
    const email = DOM.obtener('#nuevoEmail').value;
    const password = DOM.obtener('#nuevoPassword').value;
    const rol = DOM.obtener('#nuevoRol').value;

    if (!nombre || !email || !password || !rol) {
        Notificaciones.mostrar('advertencia', 'Completa todos los campos');
        return;
    }

    const nuevoUsuario = {
        id: usuariosRegistrados.length + 1,
        nombre,
        email,
        password, // En producción, encriptar!
        rol
    };

    usuariosRegistrados.push(nuevoUsuario);
    guardarUsuarios();
    registrarAuditoria('crear_usuario', `Usuario creado: ${nombre}`, { rol });

    DOM.obtener('#formNuevoUsuario').reset();
    renderizarUsuarios();
    Notificaciones.mostrar('exito', `Usuario ${nombre} creado`);
}

window.eliminarUsuario = (idx) => {
    if (confirm('¿Eliminar este usuario?')) {
        const nombre = usuariosRegistrados[idx].nombre;
        usuariosRegistrados.splice(idx, 1);
        guardarUsuarios();
        registrarAuditoria('eliminar_usuario', `Usuario eliminado: ${nombre}`);
        renderizarUsuarios();
        Notificaciones.mostrar('info', `Usuario ${nombre} eliminado`);
    }
};

function guardarUsuarios() {
    localStorage.setItem('usuarios_sistacna', JSON.stringify(usuariosRegistrados));
}

// ======================================
// SECCION: AUDITORIA
// ======================================

function configurarEventosAuditoria() {
    const btnRefreshAudit = DOM.obtener('#btnRefreshAudit');
    btnRefreshAudit?.addEventListener('click', renderizarAuditoria);
}

function renderizarAuditoria() {
    const logContainer = DOM.obtener('#logAuditoria');
    if (!logContainer) return;

    if (logAuditoria.length === 0) {
        logContainer.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--color-gris-oscuro);">Sin registros de auditoría</p>';
        return;
    }

    logContainer.innerHTML = logAuditoria.slice().reverse().map(entrada => {
        const iconos = {
            'crear': '✨',
            'editar': '✏️',
            'eliminar': '🗑️',
            'cerrar_caja': '🔐',
            'generar_boleta': '📄',
            'crear_usuario': '👤',
            'eliminar_usuario': '👤',
            'editar_comanda': '📋'
        };

        return `
            <div class="entrada-log">
                <div class="log-icono">${iconos[entrada.accion] || '📝'}</div>
                <div class="log-contenido">
                    <div class="log-accion">${entrada.accion}</div>
                    <div class="log-usuario">Por: ${entrada.usuario}</div>
                    <div class="log-fecha">${entrada.fecha}</div>
                    ${entrada.detalles ? `<div class="log-detalles">${entrada.detalles}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function registrarAuditoria(accion, detalles, extra = {}) {
    const entrada = {
        id: logAuditoria.length + 1,
        accion: accion,
        usuario: usuarioActual.nombre,
        fecha: new Date().toLocaleString('es-PE'),
        detalles: detalles,
        ...extra
    };

    logAuditoria.push(entrada);
    localStorage.setItem('auditoria_sistacna', JSON.stringify(logAuditoria));
}

// ======================================
// MENU HAMBURGUESA
// ======================================

function configurarNavMenu() {
    const btnMenu = DOM.obtener('#btnMenu');
    const navMenu = DOM.obtener('#navMenu');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });
    }
}

// ======================================
// MODALES
// ======================================

document.addEventListener('click', (e) => {
    if (e.target.id === 'modalComanda') {
        DOM.obtener('#modalComanda').classList.remove('activo');
    }
    if (e.target.id === 'modalBoleta') {
        DOM.obtener('#modalBoleta').classList.remove('activo');
    }
});

const btnCerrarComanda = DOM.obtener('#btnCerrarModalComanda');
if (btnCerrarComanda) {
    btnCerrarComanda.addEventListener('click', () => {
        DOM.obtener('#modalComanda').classList.remove('activo');
    });
}

// Exportar para otros módulos
export { registrarAuditoria };
