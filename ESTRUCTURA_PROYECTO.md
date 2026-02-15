# ESTRUCTURA DEL PROYECTO - SISTACNA

## 📁 Estructura Simplificada y Modular

```
sistacna/
│
├── 📚 Documentación
│   ├── README.md                    ← Comienza aquí
│   ├── ESTRUCTURA_PROYECTO.md       ← Este documento
│   ├── CRONOGRAMA_TRABAJO.md
│   ├── MEJORAS_PROPUESTAS.md
│   ├── INDICE_DOCUMENTACION.md
│   ├── CHECKLIST_DIARIO.md
│   ├── RESUMEN_EJECUTIVO.md
│   └── INICIO_RAPIDO.md
│
├── 📄 HTML (EN RAÍZ - Fácil acceso)
│   ├── index.html                  ✅ HOME / Landing pública
│   ├── carta.html                  ✅ MENÚ DIGITAL
│   ├── carrito.html                ⏳ PÁGINA CARRITO
│   └── admin.html                  ⏳ PANEL ADMINISTRATIVO
│
├── 🎨 css/                         (Estilos - Organizados por módulo)
│   │
│   ├── utils.css                   ✅ COMPARTIDO
│   │   ├── Variables CSS (colores, fuentes, transiciones)
│   │   ├── Estilos globales (botones, modales, tarjetas)
│   │   ├── Notificaciones
│   │   └── Animaciones reutilizables
│   │
│   ├── index.css                   ✅ HOME
│   │   ├── Header/navegación
│   │   ├── Sección hero
│   │   ├── Sección sobre
│   │   ├── Contacto y footer
│   │   └── Responsive
│   │
│   ├── carta.css                   ✅ MENÚ DIGITAL
│   │   ├── Header del menú
│   │   ├── Filtros y búsqueda
│   │   ├── Grid de platos
│   │   ├── Modal de plato
│   │   ├── Modal del carrito
│   │   └── Responsive
│   │
│   ├── carrito.css                 ⏳ CARRITO
│   │   ├── Tabla de items
│   │   ├── Resumen pedido
│   │   ├── Botones de acción
│   │   └── Responsive
│   │
│   └── admin.css                   ⏳ ADMIN
│       ├── Layout general (sidebar + contenido)
│       ├── Login
│       ├── Tabs
│       ├── Tablas
│       ├── Modales
│       └── Responsive
│
├── 📜 js/                          (JavaScript - Organizados por módulo)
│   │
│   ├── utils.js                    ✅ COMPARTIDO
│   │   ├── Validaciones (email, teléfono, RUC, moneda)
│   │   ├── Formatos (moneda, fecha, hora, teléfono)
│   │   ├── Almacenamiento (localStorage wrapper)
│   │   ├── Notificaciones (toasts)
│   │   ├── DOM (utilidades querySelector)
│   │   ├── Utilidades (UUID, debounce, scroll)
│   │   └── Service Worker (registro PWA)
│   │
│   ├── firebase-config.js          ✅ COMPARTIDO
│   │   ├── Inicialización Firebase
│   │   ├── Exportar: autenticacion, baseDatos, almacenamiento
│   │   └── CONFIG global del restaurante
│   │
│   ├── index.js                    ✅ HOME
│   │   ├── Inicialización al cargar
│   │   ├── Navegación y menú móvil
│   │   ├── Service Worker
│   │   └── Event listeners
│   │
│   ├── carta.js                    ✅ MENÚ DIGITAL
│   │   ├── Datos de ejemplo (PLATOS[])
│   │   ├── Renderización de platos en grid
│   │   ├── Búsqueda por nombre
│   │   ├── Filtros por categoría
│   │   ├── Modal de plato individual
│   │   ├── Gestión de carrito
│   │   ├── Persistencia en localStorage
│   │   ├── Notificaciones
│   │   └── Event listeners
│   │
│   ├── carrito.js                  ⏳ CARRITO
│   │   ├── Cargar carrito desde localStorage
│   │   ├── Mostrar items
│   │   ├── Actualizar cantidades
│   │   ├── Eliminar items
│   │   ├── Calcular total + IGV
│   │   └── Procesar pedido
│   │
│   └── admin.js                    ⏳ ADMIN
│       ├── Autenticación
│       ├── Control de roles
│       ├── Gestión de comandas
│       ├── Gestión de caja
│       ├── Edición de menú
│       ├── Gestión de usuarios
│       ├── Auditoria
│       └── Reportes
│
├── 💾 data/                        (Datos JSON)
│   ├── platos.json                 Información de platos (próximo)
│   └── configuracion.json          Datos del restaurante (próximo)
│
├── 🖼️ imagenes/                    (Multimedia)
│   ├── platos/
│   │   ├── ceviche.jpg
│   │   ├── ceviche-mixto.jpg
│   │   ├── bebida.jpg
│   │   ├── agua.jpg
│   │   ├── helado.jpg
│   │   └── flan.jpg
│   │
│   ├── logos/
│   │   ├── logo.png
│   │   └── logo-dark.png
│   │
│   └── iconos/
│       ├── carrito.svg
│       ├── menu.svg
│       ├── buscar.svg
│       └── ... (más iconos)
│
├── 🔧 PWA
│   ├── manifest.json               ✅ Configuración PWA (app name, icon, etc)
│   ├── sw.js                       ✅ Service Worker (caché offline, etc)
│   └── iconos-app/
│       ├── icon-192x192.png        (Para home screen)
│       └── icon-512x512.png        (Para splash screen)
│
├── 📦 Configuración
│   ├── .gitignore
│   ├── package.json                (opcional, si usas npm)
│   └── firebase.json               (para Firebase Hosting)
│
└── 📚 assets/ (Antiguo - Mantener)
    └── (Para retrocompatibilidad)

```

---

## ✅ MÓDULOS COMPLETADOS

### 1. **HOME** ✅
- **index.html** - Landing page con hero, sobre, contacto
- **css/index.css** - Estilos completos responsivos
- **js/index.js** - Navegación, menú móvil, inicializaciones

### 2. **MENÚ DIGITAL** ✅
- **carta.html** - Estructura HTML menú + modales
- **css/carta.css** - Estilos grid, filtros, modales
- **js/carta.js** - Lógica completa menú:
  - Grid responsivo de platos
  - Búsqueda por nombre
  - Filtros por categoría
  - Modal de plato con cantidad
  - **Carrito persistente** en localStorage
  - Modal del carrito con gestión de items

### 3. **UTILIDADES COMPARTIDAS** ✅
- **css/utils.css** - Estilos globales (botones, modales, notificaciones)
- **js/utils.js** - Funciones reutilizables (validaciones, formatos, DOM, almacenamiento, notificaciones)
- **js/firebase-config.js** - Configuración Firebase centralizada

---

## ⏳ MÓDULOS POR HACER

### 3. **CARRITO** (Próximo)
- **carrito.html** - Página independiente del carrito
- **css/carrito.css** - Estilos tabla, resumen, botones
- **js/carrito.js** - Lógica carrito

### 4. **ADMIN** (Próximo)
- **admin.html** - Panel administrativo
- **css/admin.css** - Estilos panel, sidebar, tabs
- **js/admin.js** - Lógica admin (auth, comandas, caja, usuarios, etc)

---

## 📊 COMPARATIVA: ANTES vs AHORA

### ANTES (Complicado)
```
src/
├── css/
│   ├── home/ (5 archivos)
│   ├── carta/ (6 archivos)
│   ├── admin/ (7 archivos)
│   └── utils/ (5 archivos)
│
└── js/
    ├── home/ (5 archivos)
    ├── carta/ (7 archivos)
    ├── admin/ (8 archivos)
    └── utils/ (9 archivos)

Problema: ➡️ Muchas subcarpetas, difícil de navegar
```

### AHORA (Simple) ✅
```
css/
├── utils.css     (Compartido)
├── index.css     (HOME)
├── carta.css     (MENÚ)
├── carrito.css   (CARRITO)
└── admin.css     (ADMIN)

js/
├── utils.js           (Compartido)
├── firebase-config.js (Compartido)
├── index.js           (HOME)
├── carta.js           (MENÚ)
├── carrito.js         (CARRITO)
└── admin.js           (ADMIN)

✅ Ventajas:
- Menos anidación
- Nombres en español
- Fácil de encontrar archivos
- Escalable
- Código compartido centralizado
```

---

## 🔗 IMPORTACIONES (Por archivo)

### **index.html** (HOME)
```html
<link rel="stylesheet" href="/css/utils.css">
<link rel="stylesheet" href="/css/index.css">
<script type="module" src="/js/index.js"></script>
```

### **carta.html** (MENÚ)
```html
<link rel="stylesheet" href="/css/utils.css">
<link rel="stylesheet" href="/css/carta.css">
<script type="module" src="/js/carta.js"></script>
```

### **js/carta.js**
```javascript
import { DOM, Almacenamiento, Notificaciones, Formatos } from './utils.js';
```

---

## 📋 CHECKLIST DE ARCHIVOS

### ✅ COMPLETADOS
- [x] css/utils.css
- [x] css/index.css
- [x] css/carta.css
- [x] js/utils.js
- [x] js/firebase-config.js
- [x] js/index.js
- [x] js/carta.js
- [x] index.html
- [x] carta.html
- [x] manifest.json (anterior)
- [x] sw.js (anterior)

### ⏳ PENDIENTES
- [ ] carrito.html + carrito.css + carrito.js
- [ ] admin.html + admin.css + admin.js
- [ ] data/platos.json
- [ ] data/configuracion.json
- [ ] imagenes/platos/* (imágenes ejemplo)

---

## 🚀 CÓMO AGREGAR UN NUEVO MÓDULO

Ejemplo: Crear módulo **"RESERVAS"**

```
1. Crear HTML:
   - reservas.html (en raíz)

2. Crear CSS:
   - css/reservas.css

3. Crear JS:
   - js/reservas.js

4. Importar en HTML:
   <link rel="stylesheet" href="/css/utils.css">
   <link rel="stylesheet" href="/css/reservas.css">
   <script type="module" src="/js/reservas.js"></script>

5. Usar utilidades compartidas:
   import { DOM, Notificaciones, Validaciones } from './utils.js';
```

---

## 💡 CONVENCIONES

### **Variables CSS** (en utils.css)
```css
--color-primario: #ff6b35
--color-secundario: #004e89
--color-blanco: #ffffff
--transicion: 0.3s ease
```

### **Clases CSS** (en español)
```css
.contenedor
.encabezado
.nav-menu
.btn-primario
.modal.activo
.tarjeta
.carrito-item
```

### **IDs HTML** (camelCase)
```html
id="btnCarrito"
id="searchBox"
id="modalPlato"
id="gridPlatos"
```

### **Funciones JS** (camelCase)
```javascript
function renderizarPlatos() {}
function agregarAlCarrito() {}
const inicializarFiltros = () => {}
```

---

## 🔐 Seguridad

- Validaciones en cliente (utils.js)
- Firebase Security Rules (backend)
- Service Worker para caché
- PWA offline-first

---

## 📱 Responsive

- **Móvil**: 1 columna, menú hamburguesa
- **Tablet**: 2 columnas, interfaz táctil
- **Desktop**: 3+ columnas, sidebar

Breakpoints en `css/utils.css` con media queries.

---

## 🔄 Flujo de Desarrollo

```
1. Crear HTML en raíz
2. Crear CSS correspondiente
3. Crear JS correspondiente
4. Usar funciones compartidas de utils.js
5. Commit con mensaje claro
6. Pruebas en responsivo
```

---

**Documento versión**: 2.0
**Última actualización**: 2026-02-15
**Estado**: ✅ Estructura actual y lista para desarrollo
