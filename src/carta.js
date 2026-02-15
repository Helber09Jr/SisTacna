/* ============================================================================
   CARTA.JS - JavaScript del Menú Digital
   ============================================================================ */

import { DOM, Almacenamiento, Notificaciones, Formatos } from './utils.js';

// Datos de ejemplo
const PLATOS = [
  { id: 1, nombre: 'Ceviche Clásico', precio: 45, categoria: 'ceviche', desc: 'Ceviche tradicional', img: '/assets/imagenes/platos/ceviche.jpg' },
  { id: 2, nombre: 'Ceviche Mixto', precio: 55, categoria: 'ceviche', desc: 'Con pescado y mariscos', img: '/assets/imagenes/platos/ceviche-mixto.jpg' },
  { id: 3, nombre: 'Coca Cola', precio: 5, categoria: 'bebidas', desc: 'Bebida fría', img: '/assets/imagenes/platos/bebida.jpg' },
  { id: 4, nombre: 'Agua', precio: 3, categoria: 'bebidas', desc: 'Agua mineral', img: '/assets/imagenes/platos/agua.jpg' },
  { id: 5, nombre: 'Helado', precio: 8, categoria: 'postres', desc: 'Postre helado', img: '/assets/imagenes/platos/helado.jpg' },
  { id: 6, nombre: 'Flan', precio: 10, categoria: 'postres', desc: 'Postre cremoso', img: '/assets/imagenes/platos/flan.jpg' },
];

let carrito = [];
let platoSeleccionado = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🍽️ CARTA inicializada');

  inicializarCarrito();
  renderizarPlatos(PLATOS);
  inicializarFiltros();
  inicializarModal();
  inicializarCarritoModal();
});

/**
 * Renderizar platos en el grid
 */
function renderizarPlatos(platos) {
  const grid = DOM.q('#platosGrid');

  grid.innerHTML = platos.map(plato => `
    <div class="plato-card" data-id="${plato.id}">
      <div class="plato-img-container">
        <img src="${plato.img}" alt="${plato.nombre}">
      </div>
      <div class="plato-info">
        <h3>${plato.nombre}</h3>
        <p>${plato.desc}</p>
        <div class="plato-precio">${Formatos.moneda(plato.precio)}</div>
      </div>
    </div>
  `).join('');

  // Event listeners
  DOM.qa('.plato-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
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
  const catBtns = DOM.qa('.cat-btn');

  searchBox?.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = PLATOS.filter(p => p.nombre.toLowerCase().includes(termino));
    renderizarPlatos(filtrados);
  });

  catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      catBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const categoria = e.target.dataset.cat;
      const filtrados = categoria === 'all' ? PLATOS : PLATOS.filter(p => p.categoria === categoria);
      renderizarPlatos(filtrados);
    });
  });
}

/**
 * Modal de plato
 */
function inicializarModal() {
  const modal = DOM.q('#modalPlato');
  const btnMas = DOM.q('#btnMas');
  const btnMenos = DOM.q('#btnMenos');
  const cantidadInput = DOM.q('#cantidadInput');
  const btnAgregar = DOM.q('#btnAgregarCarrito');
  const btnCerrar = DOM.q('#modalPlato .modal-cerrar');

  btnMas?.addEventListener('click', () => {
    cantidadInput.value = Math.min(parseInt(cantidadInput.value) + 1, 10);
  });

  btnMenos?.addEventListener('click', () => {
    cantidadInput.value = Math.max(parseInt(cantidadInput.value) - 1, 1);
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
  DOM.q('#platoImg').src = platoSeleccionado.img;
  DOM.q('#platoNombre').textContent = platoSeleccionado.nombre;
  DOM.q('#platoDesc').textContent = platoSeleccionado.desc;
  DOM.q('#platoPrice').textContent = Formatos.moneda(platoSeleccionado.precio);
  DOM.q('#cantidadInput').value = 1;
  modal?.classList.add('active');
}

function cerrarModal() {
  DOM.q('#modalPlato')?.classList.remove('active');
}

function agregarAlCarrito() {
  const cantidad = parseInt(DOM.q('#cantidadInput').value);
  const item = {
    id: platoSeleccionado.id,
    nombre: platoSeleccionado.nombre,
    precio: platoSeleccionado.precio,
    cantidad,
  };

  // Buscar si ya existe
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
 * Modal carrito
 */
function inicializarCarritoModal() {
  const btnCarrito = DOM.q('#btnCarrito');
  const modal = DOM.q('#carritoModal');
  const btnCerrar = DOM.q('#carritoModal .modal-cerrar');
  const btnPedir = DOM.q('#btnPedir');

  btnCarrito?.addEventListener('click', () => {
    abrirCarritoModal();
  });

  btnCerrar?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  btnPedir?.addEventListener('click', () => {
    if (carrito.length === 0) {
      Notificaciones.advertencia('El carrito está vacío');
      return;
    }
    Notificaciones.exito('Pedido realizado correctamente');
    carrito = [];
    guardarCarrito();
    modal?.classList.remove('active');
  });
}

function abrirCarritoModal() {
  const modal = DOM.q('#carritoModal');
  const itemsContainer = DOM.q('#carritoItems');

  if (carrito.length === 0) {
    itemsContainer.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
  } else {
    itemsContainer.innerHTML = carrito.map((item, index) => `
      <div class="carrito-item">
        <div class="carrito-item-info">
          <h4>${item.nombre}</h4>
          <p>Cantidad: ${item.cantidad}</p>
        </div>
        <div class="carrito-item-precio">${Formatos.moneda(item.precio * item.cantidad)}</div>
        <button class="carrito-item-eliminar" onclick="window.eliminarDelCarrito(${index})">Eliminar</button>
      </div>
    `).join('');
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  DOM.q('#totalCarrito').textContent = Formatos.moneda(total);
  modal?.classList.add('active');
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
  abrirCarritoModal();
};
