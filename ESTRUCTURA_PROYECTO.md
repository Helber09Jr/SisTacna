# ESTRUCTURA DEL PROYECTO - SISTACNA

## 📁 Organización Modular Completa

```
sistacna/
│
├── 📄 README.md                    ← Documentación principal
├── 📄 CRONOGRAMA_TRABAJO.md        ← Este documento
├── 📄 MEJORAS_PROPUESTAS.md
├── 📄 ESTRUCTURA_PROYECTO.md
│
├── 🌐 public/                      ← Archivos HTML públicos
│   ├── index.html                  ← HOME (página pública)
│   ├── carta.html                  ← MENÚ DIGITAL
│   ├── admin.html                  ← PANEL ADMINISTRATIVO
│   ├── manifest.json               ← Configuración PWA
│   └── sw.js                       ← Service Worker
│
├── 🎨 src/
│   │
│   ├── css/                        ← Estilos (separados por módulo)
│   │   │
│   │   ├── variables.css           ⭐ ARCHIVO CENTRAL
│   │   │   └── Contiene: colores, tipografía, espaciado, sombras, transiciones
│   │   │
│   │   ├── reset.css
│   │   │   └── Normalización de estilos por defecto del navegador
│   │   │
│   │   ├── base.css
│   │   │   └── Estilos globales: body, headings, links, etc.
│   │   │
│   │   ├── responsive.css
│   │   │   └── Media queries globales (breakpoints)
│   │   │
│   │   ├── animaciones.css
│   │   │   └── @keyframes reutilizables (fade, slide, pulse, etc.)
│   │   │
│   │   └── home/                   ← Estilos HOME
│   │       ├── header.css
│   │       │   └── Barra de navegación, logo, menú hamburguesa
│   │       ├── hero.css
│   │       │   └── Sección hero con imagen de fondo
│   │       ├── seccion-nosotros.css
│   │       │   └── About, misión, visión
│   │       ├── galeria.css
│   │       │   └── Grid de tarjetas, modal galería
│   │       └── footer.css
│   │           └── Contacto, redes, mapa
│   │
│   │   ├── carta/                  ← Estilos MENÚ DIGITAL
│   │       ├── header.css
│   │       │   └── Header idéntico a home
│   │       ├── filtros.css
│   │       │   └── Tabs categorías, searchbox, filtros
│   │       ├── grid-platos.css
│   │       │   └── Grid responsive de platos (vista detallada + simple)
│   │       ├── modal-plato.css
│   │       │   └── Modal de personalización
│   │       ├── carrito-sidebar.css
│   │       │   └── Sidebar en desktop, modal en móvil
│   │       └── toast.css
│   │           └── Notificaciones flotantes
│   │
│   │   └── admin/                  ← Estilos PANEL ADMIN
│   │       ├── login.css
│   │       │   └── Pantalla de autenticación
│   │       ├── sidebar-nav.css
│   │       │   └── Navegación lateral + tabs
│   │       ├── tab-comandas.css
│   │       │   └── Grid/cards de comandas, filtros
│   │       ├── tab-caja.css
│   │       │   └── Resumen KPI, tabla boletas, modal boleta
│   │       ├── tab-carta.css
│   │       │   └── Lista platos, modal editar etiquetas
│   │       ├── tab-usuarios.css
│   │       │   └── Tabla usuarios, modal crear usuario
│   │       └── tab-auditoria.css
│   │           └── Tabla logs con filtros
│   │
│   ├── js/                         ← JavaScript modular
│   │   │
│   │   ├── utils/                  ← Utilidades reutilizables
│   │   │   │
│   │   │   ├── firebase-config.js  ⭐ ARCHIVO CENTRAL
│   │   │   │   ├── Inicialización Firebase
│   │   │   │   ├── Exportar: db, auth
│   │   │   │   └── Todas las colecciones mapeadas
│   │   │   │
│   │   │   ├── validaciones.js
│   │   │   │   └── Objeto Validaciones: email(), telefono(), ruc(), moneda(), etc.
│   │   │   │
│   │   │   ├── formatos.js
│   │   │   │   └── Formateo: moneda(), fecha(), hora(), telefono()
│   │   │   │
│   │   │   ├── fechas.js
│   │   │   │   └── Funciones: obtenerHoy(), obtenerSemana(), difDias(), etc.
│   │   │   │
│   │   │   ├── almacenamiento.js
│   │   │   │   └── localStorage wrapper: guardar(), obtener(), limpiar()
│   │   │   │
│   │   │   ├── notificaciones.js
│   │   │   │   └── Función: mostrarToast(tipo, mensaje, duracion)
│   │   │   │
│   │   │   ├── auditoria.js
│   │   │   │   └── Función: registrarAuditoria(datos)
│   │   │   │
│   │   │   ├── manejo-errores.js
│   │   │   │   └── Clase GestorErrores con catch global
│   │   │   │
│   │   │   └── reportes.js
│   │   │       └── Exportar Excel, PDF, genera estructuras de datos
│   │   │
│   │   ├── home/                   ← Lógica HOME
│   │   │   │
│   │   │   ├── header-nav.js
│   │   │   │   ├── Clase HeaderNav
│   │   │   │   ├── toggle menu hamburguesa
│   │   │   │   └── event listeners
│   │   │   │
│   │   │   ├── hero.js
│   │   │   │   ├── Efecto parallax (solo desktop)
│   │   │   │   ├── Animación de entrada de textos
│   │   │   │   └── Event listeners CTA buttons
│   │   │   │
│   │   │   ├── modal-galeria.js
│   │   │   │   ├── Clase ModalGaleria
│   │   │   │   ├── abrir(seccion)
│   │   │   │   ├── cerrar()
│   │   │   │   ├── navegar(direccion)
│   │   │   │   └── actualizarGaleria() con transiciones
│   │   │   │
│   │   │   ├── scroll-suave.js
│   │   │   │   └── Scroll behavior smooth en links internos
│   │   │   │
│   │   │   └── inicio.js           ⭐ INICIALIZADOR
│   │   │       ├── DOMContentLoaded listener
│   │   │       ├── Llamadas a todas las funciones de inicio
│   │   │       └── Event listeners globales
│   │   │
│   │   ├── carta/                  ← Lógica MENÚ DIGITAL
│   │   │   │
│   │   │   ├── cargador-menu.js
│   │   │   │   ├── async cargarMenu()
│   │   │   │   ├── Fetch carta.json
│   │   │   │   ├── Parsear datos
│   │   │   │   ├── Cache local
│   │   │   │   └── Return datosMenu global
│   │   │   │
│   │   │   ├── filtros-busqueda.js
│   │   │   │   ├── aplicarFiltro(tipo, valor)
│   │   │   │   ├── buscar(termino)
│   │   │   │   ├── filtrarPorCategoria(categoria)
│   │   │   │   ├── filtrarPorEstado(estado)
│   │   │   │   └── filtrarYRenderizar()
│   │   │   │
│   │   │   ├── renderizador-platos.js
│   │   │   │   ├── renderizarPlatos(platos, vista)
│   │   │   │   ├── Construir HTML dinámico
│   │   │   │   ├── Vista detallada (tarjetas)
│   │   │   │   ├── Vista simple (lista)
│   │   │   │   ├── Lazy loading
│   │   │   │   └── Event listeners onclick
│   │   │   │
│   │   │   ├── modal-personalizacion.js
│   │   │   │   ├── Clase ModalPlato
│   │   │   │   ├── abrirModal(platoId)
│   │   │   │   ├── renderizarOpciones()
│   │   │   │   ├── renderizarGuarniciones()
│   │   │   │   ├── cerrarModal()
│   │   │   │   ├── actualizarSubtotal()
│   │   │   │   └── evento agregar al carrito
│   │   │   │
│   │   │   ├── gestor-carrito.js
│   │   │   │   ├── Variables globales: carrito[], CLAVE_STORAGE
│   │   │   │   ├── cargarDesdeStorage()
│   │   │   │   ├── guardarEnStorage()
│   │   │   │   ├── agregarItem(item)
│   │   │   │   ├── eliminarItem(indice)
│   │   │   │   ├── actualizarCantidad(indice, cantidad)
│   │   │   │   ├── calcularTotal()
│   │   │   │   ├── vaciarCarrito()
│   │   │   │   └── notificarCambios()
│   │   │   │
│   │   │   ├── sidebar-pedido.js
│   │   │   │   ├── Clase SidebarPedido
│   │   │   │   ├── abrirPanel()
│   │   │   │   ├── cerrarPanel()
│   │   │   │   ├── renderizarItems()
│   │   │   │   ├── actualizarTotal()
│   │   │   │   ├── validarPedido()
│   │   │   │   └── enviarPedido() → Firestore
│   │   │   │
│   │   │   └── carta.js            ⭐ INICIALIZADOR
│   │   │       ├── DOMContentLoaded listener
│   │   │       ├── Inicializar todos los módulos
│   │   │       └── Event listeners globales
│   │   │
│   │   └── admin/                  ← Lógica PANEL ADMIN
│   │       │
│   │       ├── autenticacion.js
│   │       │   ├── Clase Autenticacion
│   │       │   ├── login(email, password)
│   │       │   ├── logout()
│   │       │   ├── verificarAuth()
│   │       │   ├── onAuthStateChanged listener
│   │       │   ├── bootstrap primer super_admin
│   │       │   └── gestionar sesión
│   │       │
│   │       ├── gestor-roles.js
│   │       │   ├── Definición de roles y permisos
│   │       │   ├── verificarPermiso(usuario, permiso)
│   │       │   ├── obtenerPermisos(usuario)
│   │       │   ├── protegerPestanas(permisos)
│   │       │   └── Mapeo: rol → array de permisos
│   │       │
│   │       ├── tab-comandas.js
│   │       │   ├── Variables: comandasData[], comandasFiltradas[]
│   │       │   ├── inicializarListenerComandas()
│   │       │   ├── renderizarComandas(estado)
│   │       │   ├── filtrarComandas(filtros)
│   │       │   ├── cambiarEstadoComanda(id, nuevoEstado)
│   │       │   ├── crearComandaManual()
│   │       │   ├── imprimirComanda(id)
│   │       │   └── eventos buttons (Preparar, Listo, Entregar)
│   │       │
│   │       ├── tab-caja.js
│   │       │   ├── Variables: boletasData[]
│   │       │   ├── obtenerComandasParaCobrar()
│   │       │   ├── renderizarComandasPendientes()
│   │       │   ├── abrirModalGenerarBoleta(comandaId)
│   │       │   ├── calcularVuelto(montoPago, total)
│   │       │   ├── emitirBoleta(datos)
│   │       │   ├── imprimirBoleta(id)
│   │       │   ├── anularBoleta(id, motivo)
│   │       │   ├── generarResumenDia()
│   │       │   └── cierreCaja()
│   │       │
│   │       ├── generador-boletas.js
│   │       │   ├── Clase GeneradorBoleta
│   │       │   ├── construirHTML(datos)
│   │       │   ├── generarNumeroCorrelativo()
│   │       │   ├── calcularSubtotalIGV(items)
│   │       │   ├── formatearParaImpresion()
│   │       │   └── exportarJSON()
│   │       │
│   │       ├── tab-carta.js
│   │       │   ├── Variables: platosData[]
│   │       │   ├── inicializarListenerPlatos()
│   │       │   ├── renderizarPlatos()
│   │       │   ├── filtrarPlatos(filtros)
│   │       │   ├── abrirModalEditarEtiquetas(platoId)
│   │       │   ├── guardarEtiquetas(platoId, datos)
│   │       │   └── generarEstadisticas()
│   │       │
│   │       ├── tab-usuarios.js
│   │       │   ├── Variables: usuariosData[]
│   │       │   ├── inicializarListenerUsuarios()
│   │       │   ├── renderizarUsuarios()
│   │       │   ├── abrirModalAgregarUsuario()
│   │       │   ├── crearUsuario(email, nombre, rol)
│   │       │   ├── editarUsuario(uid, datos)
│   │       │   └── desactivarUsuario(uid)
│   │       │
│   │       ├── tab-auditoria.js
│   │       │   ├── Variables: auditoriadata[]
│   │       │   ├── inicializarListenerAuditoria()
│   │       │   ├── renderizarLogs()
│   │       │   ├── filtrarPorFecha(inicio, fin)
│   │       │   ├── filtrarPorUsuario(email)
│   │       │   ├── filtrarPorAccion(accion)
│   │       │   └── exportarExcel()
│   │       │
│   │       └── admin.js            ⭐ INICIALIZADOR
│   │           ├── DOMContentLoaded listener
│   │           ├── Verificar autenticación
│   │           ├── Inicializar todos los tabs
│   │           ├── Proteger rutas por rol
│   │           ├── Iniciar listeners en tiempo real
│   │           └── Event listeners globales
│   │
│   └── data/                       ← Datos estáticos
│       │
│       ├── carta.json              ⭐ MENÚ PRINCIPAL
│       │   ├── categorias[]
│       │   ├── guarniciones[]
│       │   ├── mozos[]
│       │   └── platos[]
│       │
│       └── configuracion.json
│           └── Datos generales del restaurante
│
├── 🖼️ assets/                      ← Recursos multimedia
│   │
│   ├── imagenes/
│   │   ├── logo.png
│   │   ├── logo-dark.png
│   │   │
│   │   ├── hero/
│   │   │   ├── hero-home.jpg
│   │   │   └── hero-home.webp       (versión comprimida)
│   │   │
│   │   ├── menu/
│   │   │   ├── ceviche-clasico.jpg
│   │   │   ├── ceviche-clasico.webp
│   │   │   ├── ... (un par por plato)
│   │   │   └── placeholder.png      (mientras carga)
│   │   │
│   │   ├── galeria/
│   │   │   ├── ambiente-1.jpg
│   │   │   ├── ambiente-1.webp
│   │   │   ├── ambiente-2.jpg
│   │   │   └── ... (4-6 imágenes)
│   │   │
│   │   ├── iconos/
│   │   │   ├── carrito.svg
│   │   │   ├── menu.svg
│   │   │   ├── buscar.svg
│   │   │   ├── cerrar.svg
│   │   │   ├── flecha.svg
│   │   │   ├── whatsapp.svg
│   │   │   └── ... (más iconos)
│   │   │
│   │   └── fondos/
│   │       ├── overlay-oscuro.png
│   │       └── patron-subtle.png
│   │
│   ├── fuentes/
│   │   ├── poppins-regular.woff2
│   │   ├── poppins-bold.woff2
│   │   ├── montserrat-bold.woff2
│   │   └── ... (variantes necesarias)
│   │
│   └── iconos-app/
│       ├── icon-192x192.png        (para PWA home screen)
│       └── icon-512x512.png        (para splash screen)
│
├── 📦 Archivos de Configuración
│   ├── .gitignore
│   ├── .env.example                (no commitear .env real)
│   ├── package.json                (si usas npm)
│   └── firebase.json               (configuración Firebase Hosting)
│
└── 📚 Documentación
    ├── README.md                   ← Comienza aquí
    ├── INSTALACION.md
    ├── GUIA_USUARIO.md             ← Para personal del restaurante
    ├── GUIA_DESARROLLADOR.md       ← Para equipo técnico
    └── API_REFERENCE.md            ← Funciones y métodos

```

---

## 📋 CHECKLIST DE CREACIÓN DE ARCHIVOS

### FASE 1: ESTRUCTURA BASE

**CSS Variables y Base**
- [ ] `src/css/variables.css` - Archivo central de diseño
- [ ] `src/css/reset.css` - Normalización
- [ ] `src/css/base.css` - Estilos globales
- [ ] `src/css/responsive.css` - Breakpoints
- [ ] `src/css/animaciones.css` - @keyframes

**JavaScript Utils**
- [ ] `src/js/utils/firebase-config.js` - Configuración Firebase
- [ ] `src/js/utils/validaciones.js` - Validaciones
- [ ] `src/js/utils/formatos.js` - Formateo
- [ ] `src/js/utils/fechas.js` - Utilidades fecha
- [ ] `src/js/utils/almacenamiento.js` - localStorage wrapper
- [ ] `src/js/utils/notificaciones.js` - Toast
- [ ] `src/js/utils/auditoria.js` - Logging
- [ ] `src/js/utils/manejo-errores.js` - Error handling
- [ ] `src/js/utils/reportes.js` - Exportación datos

**Configuración PWA**
- [ ] `public/manifest.json`
- [ ] `public/sw.js` (Service Worker)

### FASE 2: HOME

**HTML**
- [ ] `public/index.html`

**CSS**
- [ ] `src/css/home/header.css`
- [ ] `src/css/home/hero.css`
- [ ] `src/css/home/seccion-nosotros.css`
- [ ] `src/css/home/galeria.css`
- [ ] `src/css/home/footer.css`

**JavaScript**
- [ ] `src/js/home/header-nav.js`
- [ ] `src/js/home/hero.js`
- [ ] `src/js/home/modal-galeria.js`
- [ ] `src/js/home/scroll-suave.js`
- [ ] `src/js/home/inicio.js` ⭐

### FASE 3: CARTA

**HTML**
- [ ] `public/carta.html`

**CSS**
- [ ] `src/css/carta/header.css`
- [ ] `src/css/carta/filtros.css`
- [ ] `src/css/carta/grid-platos.css`
- [ ] `src/css/carta/modal-plato.css`
- [ ] `src/css/carta/carrito-sidebar.css`
- [ ] `src/css/carta/toast.css`

**JavaScript**
- [ ] `src/js/carta/cargador-menu.js`
- [ ] `src/js/carta/filtros-busqueda.js`
- [ ] `src/js/carta/renderizador-platos.js`
- [ ] `src/js/carta/modal-personalizacion.js`
- [ ] `src/js/carta/gestor-carrito.js`
- [ ] `src/js/carta/sidebar-pedido.js`
- [ ] `src/js/carta/carta.js` ⭐

**Data**
- [ ] `src/data/carta.json`

### FASE 4-7: ADMIN

**HTML**
- [ ] `public/admin.html`

**CSS**
- [ ] `src/css/admin/login.css`
- [ ] `src/css/admin/sidebar-nav.css`
- [ ] `src/css/admin/tab-comandas.css`
- [ ] `src/css/admin/tab-caja.css`
- [ ] `src/css/admin/tab-carta.css`
- [ ] `src/css/admin/tab-usuarios.css`
- [ ] `src/css/admin/tab-auditoria.css`

**JavaScript**
- [ ] `src/js/admin/autenticacion.js`
- [ ] `src/js/admin/gestor-roles.js`
- [ ] `src/js/admin/tab-comandas.js`
- [ ] `src/js/admin/tab-caja.js`
- [ ] `src/js/admin/generador-boletas.js`
- [ ] `src/js/admin/tab-carta.js`
- [ ] `src/js/admin/tab-usuarios.js`
- [ ] `src/js/admin/tab-auditoria.js`
- [ ] `src/js/admin/admin.js` ⭐

### ASSETS

**Imágenes**
- [ ] Crear carpetas estructura: `/assets/imagenes/{hero,menu,galeria,iconos,fondos}`
- [ ] Crear carpetas iconos app: `/assets/iconos-app/`

**Fuentes**
- [ ] Descargar Poppins, Montserrat en .woff2

### DOCUMENTACIÓN

- [ ] `README.md`
- [ ] `INSTALACION.md`
- [ ] `GUIA_USUARIO.md`
- [ ] `GUIA_DESARROLLADOR.md`

---

## 🔗 Importaciones Recomendadas por Archivo

### home/inicio.js (Inicializador HOME)
```javascript
import HeaderNav from './header-nav.js';
import ModalGaleria from './modal-galeria.js';
import { inicializarScrollSuave } from './scroll-suave.js';
import { inicializarParallax } from './hero.js';
```

### carta/carta.js (Inicializador CARTA)
```javascript
import { cargarMenu } from './cargador-menu.js';
import FiltrosBusqueda from './filtros-busqueda.js';
import { renderizarPlatos } from './renderizador-platos.js';
import ModalPlato from './modal-personalizacion.js';
import { cargarCarritoLocal } from './gestor-carrito.js';
import SidebarPedido from './sidebar-pedido.js';
```

### admin/admin.js (Inicializador ADMIN)
```javascript
import Autenticacion from './autenticacion.js';
import GestorRoles from './gestor-roles.js';
import TabComandas from './tab-comandas.js';
import TabCaja from './tab-caja.js';
import TabCarta from './tab-carta.js';
import TabUsuarios from './tab-usuarios.js';
import TabAuditoria from './tab-auditoria.js';
```

---

## 📦 Dependencias NPM (Opcionales)

```json
{
  "name": "sistacna",
  "version": "1.0.0",
  "description": "Sistema de gestión para restaurantes",
  "type": "module",
  "scripts": {
    "start": "http-server ./public -p 8000",
    "build": "echo 'Minificar CSS y JS cuando sea necesario'",
    "test": "jest",
    "deploy": "firebase deploy"
  },
  "dependencies": {
    "firebase": "^9.0.0"
  },
  "devDependencies": {
    "http-server": "^14.0.0",
    "firebase-tools": "^11.0.0",
    "jest": "^28.0.0"
  }
}
```

---

## 🚀 Comando para Iniciar

```bash
# Clonar repo
git clone https://github.com/usuario/sistacna.git
cd sistacna

# Instalar dependencias (si aplica)
npm install

# Configurar Firebase
# 1. Crear archivo .env con credenciales
# 2. Actualizar src/js/utils/firebase-config.js

# Iniciar servidor local
npm start
# Abierto en http://localhost:8000

# Deploy a Firebase Hosting
firebase deploy
```

---

**Documento versión**: 1.0
**Última actualización**: 2026-02-13
