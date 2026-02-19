/**
 * MÓDULO CARRITO
 * Gestión completa del carrito de compras
 * - Cargar desde localStorage
 * - Renderizar items
 * - Editar cantidades
 * - Eliminar items
 * - Procesar pedido
 */

import { DOM, Almacenamiento, Notificaciones, Formatos } from './utils.js';

// ======================================
// VARIABLES GLOBALES
// ======================================

const CLAVE_STORAGE = 'carrito_sistacna';
let carrito = [];

// ======================================
// INICIALIZACIÓN
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
});

function inicializar() {
    cargarCarritoLocal();
    configurarNavMenu();
    renderizarCarrito();
    configurarEventos();
}

// ======================================
// CARGAR Y RENDERIZAR
// ======================================

function cargarCarritoLocal() {
    const carritoGuardado = Almacenamiento.obtener(CLAVE_STORAGE);
    carrito = carritoGuardado || [];
}

function renderizarCarrito() {
    const carritoVacio = DOM.obtener('#carritoVacio');
    const carritoConItems = DOM.obtener('#carritoConItems');
    const listaItems = DOM.obtener('#listaItems');
    const contadorItems = DOM.obtener('#contadorItems');

    if (carrito.length === 0) {
        // Mostrar carrito vacío
        carritoVacio.style.display = 'block';
        carritoConItems.style.display = 'none';
        return;
    }

    // Mostrar carrito con items
    carritoVacio.style.display = 'none';
    carritoConItems.style.display = 'grid';

    // Limpiar lista anterior
    listaItems.innerHTML = '';

    // Renderizar cada item
    carrito.forEach((item, indice) => {
        const itemElement = crearElementoItem(item, indice);
        listaItems.appendChild(itemElement);
    });

    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorItems.textContent = `${totalItems} producto${totalItems !== 1 ? 's' : ''}`;

    // Actualizar totales
    actualizarTotales();
}

function crearElementoItem(item, indice) {
    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
        <div class="item-nombre">${item.nombre}</div>
        <div class="item-precio">${Formatos.moneda(item.precio)}</div>
        <div class="controles-cantidad">
            <button class="btn-cantidad btn-restar" data-indice="${indice}">−</button>
            <input type="number" class="cantidad-input" value="${item.cantidad}" min="1" data-indice="${indice}">
            <button class="btn-cantidad btn-sumar" data-indice="${indice}">+</button>
        </div>
        <div class="item-subtotal">${Formatos.moneda(item.precio * item.cantidad)}</div>
        <button class="btn-eliminar" data-indice="${indice}" title="Eliminar">🗑️</button>
    `;

    // Event listeners
    const btnRestar = div.querySelector('.btn-restar');
    const btnSumar = div.querySelector('.btn-sumar');
    const inputCantidad = div.querySelector('.cantidad-input');
    const btnEliminar = div.querySelector('.btn-eliminar');

    btnRestar.addEventListener('click', () => cambiarCantidad(indice, -1));
    btnSumar.addEventListener('click', () => cambiarCantidad(indice, 1));
    inputCantidad.addEventListener('change', (e) => {
        const cantidad = parseInt(e.target.value) || 1;
        if (cantidad > 0) {
            carrito[indice].cantidad = cantidad;
            guardarYActualizar();
        }
    });
    btnEliminar.addEventListener('click', () => eliminarItem(indice));

    return div;
}

// ======================================
// GESTIÓN DE ITEMS
// ======================================

function cambiarCantidad(indice, cambio) {
    const cantidadNueva = carrito[indice].cantidad + cambio;

    if (cantidadNueva > 0) {
        carrito[indice].cantidad = cantidadNueva;
        guardarYActualizar();
    } else {
        eliminarItem(indice);
    }
}

function eliminarItem(indice) {
    const nombrePlato = carrito[indice].nombre;
    carrito.splice(indice, 1);
    guardarYActualizar();
    Notificaciones.mostrar('info', `${nombrePlato} removido del carrito`);
}

function vaciarCarrito() {
    if (carrito.length === 0) return;

    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        carrito = [];
        guardarYActualizar();
        Notificaciones.mostrar('exito', 'Carrito vaciado');
    }
}

// ======================================
// CALCULAR TOTALES
// ======================================

function actualizarTotales() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    DOM.obtener('#subtotal').textContent = Formatos.moneda(subtotal);
    DOM.obtener('#igv').textContent = Formatos.moneda(igv);
    DOM.obtener('#total').textContent = Formatos.moneda(total);
}

// ======================================
// PROCESAR PEDIDO
// ======================================

function procesarPedido() {
    if (carrito.length === 0) {
        Notificaciones.mostrar('advertencia', 'El carrito está vacío');
        return;
    }

    // Obtener datos del formulario
    const metodo = document.querySelector('input[name="metodo"]:checked').value;
    const observaciones = DOM.obtener('#observaciones').value;

    // Calcular totales
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    // Crear objeto del pedido
    const pedido = {
        id: generarIdPedido(),
        items: [...carrito],
        subtotal: subtotal,
        igv: igv,
        total: total,
        metodo: metodo,
        observaciones: observaciones,
        fecha: new Date().toLocaleString('es-PE'),
        estado: 'pendiente'
    };

    // Guardar pedido en localStorage (simulado)
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidosGuardados.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados));

    // Mostrar modal de confirmación
    mostrarModalConfirmacion(pedido);

    // Limpiar carrito
    carrito = [];
    guardarYActualizar();
}

function generarIdPedido() {
    return '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function mostrarModalConfirmacion(pedido) {
    const modal = DOM.obtener('#modalConfirmacion');
    const mensaje = DOM.obtener('#mensajeConfirmacion');

    mensaje.innerHTML = `
        <strong>Pedido ${pedido.id}</strong><br>
        <strong>Total: ${Formatos.moneda(pedido.total)}</strong><br>
        Método de pago: <strong>${pedido.metodo}</strong><br>
        <small style="color: var(--color-gris-oscuro);">Tu pedido ha sido registrado correctamente. Será preparado en breve.</small>
    `;

    modal.classList.add('activo');
}

function cerrarModalConfirmacion() {
    const modal = DOM.obtener('#modalConfirmacion');
    modal.classList.remove('activo');
    renderizarCarrito();
}

// ======================================
// EVENTOS
// ======================================

function configurarEventos() {
    // Botones de acción
    const btnVaciar = DOM.obtener('#btnVaciarCarrito');
    const btnProcesar = DOM.obtener('#btnProcesar');
    const btnCerrarModal = DOM.obtener('#btnCerrarModal');
    const btnNuevoPedido = DOM.obtener('#btnNuevoPedido');

    if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);
    if (btnProcesar) btnProcesar.addEventListener('click', procesarPedido);
    if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModalConfirmacion);
    if (btnNuevoPedido) btnNuevoPedido.addEventListener('click', () => {
        cerrarModalConfirmacion();
        window.location.href = '/carta.html';
    });
}

// ======================================
// MENU HAMBURGUESA (Mobile)
// ======================================

function configurarNavMenu() {
    const btnMenu = DOM.obtener('#btnMenu');
    const navMenu = DOM.obtener('#navMenu');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });

        // Cerrar menú al hacer click en un enlace
        navMenu.querySelectorAll('.nav-enlace').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('activo');
            });
        });
    }
}

// ======================================
// UTILIDADES
// ======================================

function guardarYActualizar() {
    Almacenamiento.guardar(CLAVE_STORAGE, carrito);
    renderizarCarrito();
}

// Exportar para otros módulos si es necesario
export { carrito, cargarCarritoLocal, guardarYActualizar };
