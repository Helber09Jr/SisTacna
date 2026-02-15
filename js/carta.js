/* ============================================================================
   CARTA.JS - JavaScript del Menú Digital
   ============================================================================ */

import { DOM, Almacenamiento, Notificaciones, Formatos } from './utils.js';

// Datos de ejemplo
const PLATOS = [
  { id: 1, nombre: 'Ceviche Clásico', precio: 45, categoria: 'ceviche', desc: 'Ceviche tradicional con pescado fresco', img: '/imagenes/platos/ceviche.jpg' },
  { id: 2, nombre: 'Ceviche Mixto', precio: 55, categoria: 'ceviche', desc: 'Con pescado y mariscos variados', img: '/imagenes/platos/ceviche-mixto.jpg' },
  { id: 3, nombre: 'Coca Cola', precio: 5, categoria: 'bebidas', desc: 'Bebida fría y refrescante', img: '/imagenes/platos/bebida.jpg' },
  { id: 4, nombre: 'Agua Mineral', precio: 3, categoria: 'bebidas', desc: 'Agua mineral pura', img: '/imagenes/platos/agua.jpg' },
  { id: 5, nombre: 'Helado de Vainilla', precio: 8, categoria: 'postres', desc: 'Postre frío y cremoso', img: '/imagenes/platos/helado.jpg' },
  { id: 6, nombre: 'Flan de Caramelo', precio: 10, categoria: 'postres', desc: 'Postre tradicional y delicioso', img: '/imagenes/platos/flan.jpg' },
];

let carrito = [];
let platoSeleccionado = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🍽️ CARTA inicializada');

  inicializarCarrito();
  renderizarPlatos(PLATOS);
  inicializarFiltros();
  inicializarModal();
  inicializarModalCarrito();
});

/**
 * Renderizar platos en el grid
 */
function renderizarPlatos(platos) {
  const grid = DOM.q('#gridPlatos');

  grid.innerHTML = platos.map(plato => `
    <div class="tarjeta-plato" data-id="${plato.id}">
      <div class="contenedor-img">
        <img src="${plato.img}" alt="${plato.nombre}">
      </div>
      <div class="info-plato">
        <h3>${plato.nombre}</h3>
        <p>${plato.desc}</p>
        <div class="precio-plato">${Formatos.moneda(plato.precio)}</div>
      </div>
    </div>
  `).join('');

  // Event listeners para cada tarjeta
  DOM.qa('.tarjeta-plato').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const id = tarjeta.dataset.id;
      platoSeleccionado = PLATOS.find(p => p.id == id);
      abrirModal();
    });
  });
}

/**
 * Inicializar filtros
 */
function inicializarFiltros() {
  const searchBox = DOM.q('#searchBox');
  const btnsCategoria = DOM.qa('.btn-categoria');

  searchBox?.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = PLATOS.filter(p => p.nombre.toLowerCase().includes(termino));
    renderizarPlatos(filtrados);
  });

  btnsCategoria.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btnsCategoria.forEach(b => b.classList.remove('activo'));
      e.target.classList.add('activo');

      const categoria = e.target.dataset.cat;
      const filtrados = categoria === 'todos' ? PLATOS : PLATOS.filter(p => p.categoria === categoria);
      renderizarPlatos(filtrados);
    });
  });
}

/**
 * Modal de plato individual
 */
function inicializarModal() {
  const modal = DOM.q('#modalPlato');
  const btnMas = DOM.q('#btnMas');
  const btnMenos = DOM.q('#btnMenos');
  const inputCantidad = DOM.q('#inputCantidad');
  const btnAgregar = DOM.q('#btnAgregarCarrito');
  const btnCerrar = DOM.q('#modalPlato .modal-cerrar');

  btnMas?.addEventListener('click', () => {
    inputCantidad.value = Math.min(parseInt(inputCantidad.value) + 1, 10);
  });

  btnMenos?.addEventListener('click', () => {
    inputCantidad.value = Math.max(parseInt(inputCantidad.value) - 1, 1);
  });

  btnAgregar?.addEventListener('click', () => {
    agregarAlCarrito();
  });

  btnCerrar?.addEventListener('click', () => {
    cerrarModal();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
  });
}

function abrirModal() {
  const modal = DOM.q('#modalPlato');
  DOM.q('#imgPlato').src = platoSeleccionado.img;
  DOM.q('#nombrePlato').textContent = platoSeleccionado.nombre;
  DOM.q('#descPlato').textContent = platoSeleccionado.desc;
  DOM.q('#precioPlato').textContent = Formatos.moneda(platoSeleccionado.precio);
  DOM.q('#inputCantidad').value = 1;
  modal?.classList.add('activo');
}

function cerrarModal() {
  DOM.q('#modalPlato')?.classList.remove('activo');
}

function agregarAlCarrito() {
  const cantidad = parseInt(DOM.q('#inputCantidad').value);
  const item = {
    id: platoSeleccionado.id,
    nombre: platoSeleccionado.nombre,
    precio: platoSeleccionado.precio,
    cantidad,
  };

  // Verificar si ya existe en el carrito
  const existente = carrito.find(c => c.id === item.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push(item);
  }

  guardarCarrito();
  Notificaciones.exito(`${platoSeleccionado.nombre} agregado al carrito`);
  cerrarModal();
}

/**
 * Modal del carrito
 */
function inicializarModalCarrito() {
  const btnCarrito = DOM.q('#btnCarrito');
  const modal = DOM.q('#modalCarrito');
  const btnCerrar = DOM.q('#modalCarrito .modal-cerrar');
  const btnPedir = DOM.q('#btnPedir');

  btnCarrito?.addEventListener('click', () => {
    abrirModalCarrito();
  });

  btnCerrar?.addEventListener('click', () => {
    modal?.classList.remove('activo');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('activo');
  });

  btnPedir?.addEventListener('click', () => {
    if (carrito.length === 0) {
      Notificaciones.advertencia('El carrito está vacío');
      return;
    }
    Notificaciones.exito('¡Pedido realizado correctamente!');
    carrito = [];
    guardarCarrito();
    modal?.classList.remove('activo');
  });
}

function abrirModalCarrito() {
  const modal = DOM.q('#modalCarrito');
  const itemsContainer = DOM.q('#itemsCarrito');

  if (carrito.length === 0) {
    itemsContainer.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
  } else {
    itemsContainer.innerHTML = carrito.map((item, index) => `
      <div class="item-carrito">
        <div class="info-item">
          <h4>${item.nombre}</h4>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
        <div class="precio-item">${Formatos.moneda(item.precio * item.cantidad)}</div>
        <button class="btn-eliminar" onclick="window.eliminarDelCarrito(${index})">Eliminar</button>
      </div>
    `).join('');
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  DOM.setText('#totalCarrito', Formatos.moneda(total));
  modal?.classList.add('activo');
}

/**
 * Gestión del carrito
 */
function inicializarCarrito() {
  carrito = Almacenamiento.obtener('carrito', []);
  actualizarContador();
}

function guardarCarrito() {
  Almacenamiento.guardar('carrito', carrito);
  actualizarContador();
}

function actualizarContador() {
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  DOM.setText('#cantCarrito', total.toString());
}

// Función global para eliminar del carrito
window.eliminarDelCarrito = function (index) {
  carrito.splice(index, 1);
  guardarCarrito();
  abrirModalCarrito();
};
