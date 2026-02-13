# 📅 CHECKLIST DIARIO DE DESARROLLO

**Proyecto**: SISTACNA - Sistema de Gestión para Restaurantes
**Duración**: 20 días
**Formato**: Checklist por día, completable

---

## 🔴 FASE 1: ESTRUCTURA BASE (Días 1-2)

### DÍA 1: Configuración Inicial y Estructura

**Objetivo**: Crear estructura de carpetas y configurar Firebase

#### Tareas
- [ ] Crear carpetas base
  ```bash
  mkdir -p public src/{css,js,data} assets/{imagenes,fuentes,iconos-app}
  mkdir -p src/css/{home,carta,admin}
  mkdir -p src/js/{utils,home,carta,admin}
  mkdir -p assets/imagenes/{hero,menu,galeria,iconos,fondos}
  ```

- [ ] Crear archivo `.gitignore`
  ```
  .env
  node_modules/
  .DS_Store
  *.log
  .firebase/
  ```

- [ ] Crear `package.json` básico
  ```json
  {
    "name": "sistacna",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "http-server ./public -p 8000",
      "deploy": "firebase deploy"
    }
  }
  ```

- [ ] Configurar Firebase Console
  - [ ] Crear proyecto en Firebase
  - [ ] Obtener credenciales
  - [ ] Crear colecciones en Firestore (usuarios_admin, comandas, boletas, etc.)
  - [ ] Activar autenticación por email/password
  - [ ] Configurar reglas de seguridad (básicas)
  - [ ] Descarga `google-services.json` / credenciales

- [ ] Crear `src/js/utils/firebase-config.js` (CENTRAL)
  - [ ] Importar SDK Firebase
  - [ ] Inicializar app
  - [ ] Exportar db, auth, storage
  - [ ] Incluir todas las credenciales

**Tiempo Estimado**: 3-4 horas

---

### DÍA 2: CSS Base y JavaScript Utils

**Objetivo**: Crear sistemas de estilos y utilidades reutilizables

#### Tareas
- [ ] Crear `src/css/variables.css`
  - [ ] Colores primarios, secundarios, neutrales
  - [ ] Tipografía (importar Google Fonts)
  - [ ] Espaciado (escala de 4px)
  - [ ] Sombras, transiciones, border-radius
  - [ ] Z-index variables

- [ ] Crear `src/css/reset.css`
  - [ ] Normalización de estilos

- [ ] Crear `src/css/base.css`
  - [ ] Estilos globales (body, headings, links)
  - [ ] Clases de utilidad (.container, .btn, etc.)

- [ ] Crear `src/css/responsive.css`
  - [ ] Breakpoints (480px, 768px)
  - [ ] Media queries base

- [ ] Crear `src/css/animaciones.css`
  - [ ] @keyframes reutilizables (fade, slide, pulse, bounce)

- [ ] Crear utilidades JS

  - [ ] `src/js/utils/validaciones.js`
    - [ ] email(), telefono(), ruc(), moneda()
    - [ ] nombreCompleto(), observaciones()

  - [ ] `src/js/utils/formatos.js`
    - [ ] formatoMoneda(), formatoFecha(), formatoHora()
    - [ ] formatoTelefono(), formatoRUC()

  - [ ] `src/js/utils/fechas.js`
    - [ ] obtenerHoy(), obtenerSemana(), difDias()
    - [ ] formatoISO(), formatoLegible()

  - [ ] `src/js/utils/almacenamiento.js`
    - [ ] guardar(), obtener(), limpiar(), existe()

  - [ ] `src/js/utils/notificaciones.js`
    - [ ] mostrarToast(tipo, mensaje, duracion)
    - [ ] Tipos: exito, error, info, advertencia

  - [ ] `src/js/utils/manejo-errores.js`
    - [ ] Clase GestorErrores
    - [ ] manejar(), obtenerMensajeFriendly()

  - [ ] `src/js/utils/auditoria.js`
    - [ ] registrarAuditoria() para Firestore

  - [ ] `src/js/utils/reportes.js`
    - [ ] exportarExcel(), exportarPDF()

- [ ] Crear archivo de configuración `.env.example`
  ```
  FIREBASE_API_KEY=xxx
  FIREBASE_AUTH_DOMAIN=xxx
  FIREBASE_PROJECT_ID=xxx
  FIREBASE_STORAGE_BUCKET=xxx
  FIREBASE_MESSAGING_SENDER_ID=xxx
  FIREBASE_APP_ID=xxx
  ```

- [ ] Crear `public/manifest.json` (PWA)
  - [ ] Nombre, descripción, start_url
  - [ ] Colores, iconos (referencias)
  - [ ] Display: standalone

- [ ] Crear `public/sw.js` (Service Worker básico)
  - [ ] Cache estáticos
  - [ ] Estrategia network-first

**Tiempo Estimado**: 4-5 horas

---

## 🟠 FASE 2: HOME / PÁGINA PÚBLICA (Días 3-4)

### DÍA 3: HTML y CSS del Home

**Objetivo**: Estructura HTML y estilos base

#### Tareas
- [ ] Crear `public/index.html`
  - [ ] DOCTYPE, meta tags (viewport, charset, og:)
  - [ ] Links a CSS y fonts
  - [ ] Header (nav, logo, botones)
  - [ ] Hero section (fondo, titulo, CTA)
  - [ ] Sección Nosotros (badges, tarjetas)
  - [ ] Galería (grid modal)
  - [ ] Footer (contacto, social, mapa)
  - [ ] Script tags (inicializadores)

- [ ] Crear `src/css/home/header.css`
  - [ ] Barra de navegación
  - [ ] Menú desktop
  - [ ] Menú hamburguesa (móvil)
  - [ ] Logo responsive
  - [ ] Sticky en scroll

- [ ] Crear `src/css/home/hero.css`
  - [ ] Fondo con imagen + overlay
  - [ ] Tipografía hero (H1, subtítulo)
  - [ ] CTA buttons
  - [ ] Animaciones de entrada

- [ ] Crear `src/css/home/seccion-nosotros.css`
  - [ ] Layout de secciones
  - [ ] Tarjetas misión/visión
  - [ ] Badge de año
  - [ ] Botones secundarios

- [ ] Crear `src/css/home/galeria.css`
  - [ ] Grid de tarjetas (3 col desktop, 2 tablet, 1 móvil)
  - [ ] Hover effects
  - [ ] Modal estilo

- [ ] Crear `src/css/home/footer.css`
  - [ ] Layout columnas
  - [ ] Información contacto
  - [ ] Social icons
  - [ ] Botón flotante WhatsApp

**Tiempo Estimado**: 5 horas

---

### DÍA 4: JavaScript del Home

**Objetivo**: Interactividad y funcionalidad

#### Tareas
- [ ] Crear `src/js/home/header-nav.js`
  - [ ] Clase HeaderNav
  - [ ] constructor() - capturar elementos
  - [ ] toggleMenu() - abrir/cerrar hamburguesa
  - [ ] closeMenuOnClick() - cerrar al hacer click
  - [ ] event listeners
  - [ ] export default HeaderNav

- [ ] Crear `src/js/home/hero.js`
  - [ ] Efecto parallax en scroll (desktop only)
  - [ ] Animaciones de entrada (Intersection Observer)
  - [ ] export { inicializarHero, inicializarParallax }

- [ ] Crear `src/js/home/modal-galeria.js`
  - [ ] Clase ModalGaleria
  - [ ] constructor() - elementos DOM
  - [ ] abrirModal(seccion) - mostrar modal con imagenes
  - [ ] cerrarModal() - ocultar
  - [ ] navegar(direccion) - anterior/siguiente
  - [ ] actualizarGaleria() - cambiar imagen con fade
  - [ ] event listeners (ESC, flechas, overlay click)
  - [ ] export default ModalGaleria

- [ ] Crear `src/js/home/scroll-suave.js`
  - [ ] Detectar links internos (#nosotros, #galeria, etc.)
  - [ ] Scroll smooth (ScrollTo API o manual)
  - [ ] export { inicializarScrollSuave }

- [ ] Crear `src/js/home/inicio.js` (INICIALIZADOR)
  - [ ] DOMContentLoaded listener
  - [ ] Importar todas las funciones
  - [ ] Crear instancias (new HeaderNav, new ModalGaleria)
  - [ ] Llamar a inicializar...()
  - [ ] Event listeners globales (resize, scroll)

- [ ] Descargar imágenes
  - [ ] logo.png
  - [ ] hero-home.jpg (+ .webp)
  - [ ] 4-6 imágenes para galería
  - [ ] Iconos SVG (social, etc.)

- [ ] Probar en navegador
  - [ ] Menú hamburguesa funciona
  - [ ] Scroll suave
  - [ ] Modal galería (abrir, navegar, cerrar)
  - [ ] Responsive en móvil/tablet/desktop

**Tiempo Estimado**: 4-5 horas

---

## 🟡 FASE 3: MENÚ DIGITAL Y CARRITO (Días 5-7)

### DÍA 5: Cargador de Menú y Filtros

**Objetivo**: Sistema de carga y filtrado de platos

#### Tareas
- [ ] Crear `src/data/carta.json`
  - [ ] Array categorias (entradas, carnes, pescados, bebidas, postres)
  - [ ] Array guarniciones
  - [ ] Array mozos (nombre, telefono)
  - [ ] Array platos con:
    - [ ] id, nombre, categoria, precio
    - [ ] descripcion, imagen
    - [ ] opciones[] (tamano, punto coccion, etc.)
    - [ ] guarniciones: true/false
    - [ ] tieneObservaciones: true/false
  - [ ] Mínimo 20 platos

- [ ] Crear `public/carta.html`
  - [ ] Header (igual a home)
  - [ ] Hero carta (titulo, descripcion)
  - [ ] Sección menu-principal:
    - [ ] Campo búsqueda + botón limpiar
    - [ ] Tabs categorías (generado dinámico)
    - [ ] Filtros estado (Todos, Disponibles, Agotados, Promociones)
    - [ ] Toggle vista (detallada/simple)
    - [ ] Contador de resultados
    - [ ] Grid platos (placeholder)
  - [ ] Botón flotante carrito (contador items)
  - [ ] Sidebar carrito (hidden, overlay en móvil)
  - [ ] Modal personalización plato
  - [ ] Toast notificaciones
  - [ ] Script tags

- [ ] Crear `src/js/carta/cargador-menu.js`
  - [ ] async cargarMenu()
    - [ ] Fetch carta.json
    - [ ] Parsear JSON
    - [ ] Validar estructura
    - [ ] Guardar en localStorage (cache)
    - [ ] Return datosMenu global
  - [ ] export { cargarMenu, datosMenu }

- [ ] Crear `src/js/carta/filtros-busqueda.js`
  - [ ] Variables: categoriaActual, busquedaActual, estadoActual
  - [ ] buscarPlatos(termino) - filtro por nombre
  - [ ] filtrarPorCategoria(categoria)
  - [ ] filtrarPorEstado(estado)
  - [ ] aplicarFiltros() - combinar todos
  - [ ] limpiarFiltros() - reset
  - [ ] export default con todas las funciones

- [ ] Crear `src/css/carta/header.css`
  - [ ] Header idéntico a home

- [ ] Crear `src/css/carta/filtros.css`
  - [ ] Campo búsqueda con estilo
  - [ ] Tabs categorías (scroll horizontal)
  - [ ] Botones filtro estado
  - [ ] Toggle vista
  - [ ] Contador badges

- [ ] Crear `src/js/carta/renderizador-platos.js`
  - [ ] renderizarTabs(categorias) - crear tabs dinámicos
  - [ ] renderizarPlatos(platos, vista) - renderizar grid
  - [ ] vista === 'detallada':
    - [ ] Tarjetas con imagen, nombre, precio, descripcion
    - [ ] Lazy loading img
    - [ ] onclick abrirModal
  - [ ] vista === 'simple':
    - [ ] Filas con nombre, precio, botón agregar
  - [ ] event listeners click
  - [ ] export { renderizarPlatos }

**Tiempo Estimado**: 5-6 horas

---

### DÍA 6: Modal de Personalización y Gestor de Carrito

**Objetivo**: Lógica de carrito y personalización

#### Tareas
- [ ] Crear `src/css/carta/grid-platos.css`
  - [ ] Grid responsive (3 col desktop, 2 tablet, 1 móvil)
  - [ ] Tarjetas con imágenes
  - [ ] Hover effects
  - [ ] Lista simple compacta

- [ ] Crear `src/css/carta/modal-plato.css`
  - [ ] Overlay oscuro (backdrop)
  - [ ] Card central responsive
  - [ ] Imagen grande
  - [ ] Nombre, precio, descripcion
  - [ ] Opciones (radio buttons)
  - [ ] Guarniciones (checkboxes)
  - [ ] Observaciones textarea
  - [ ] Cantidad (- / +)
  - [ ] Subtotal tiempo real
  - [ ] Botones (Agregar, Cerrar)

- [ ] Crear `src/js/carta/modal-personalizacion.js`
  - [ ] Clase ModalPlato
  - [ ] constructor() - elementos DOM
  - [ ] abrirModal(platoId)
    - [ ] Buscar plato en datosMenu
    - [ ] Renderizar imagen, nombre, descripcion
    - [ ] renderizarOpciones()
    - [ ] renderizarGuarniciones()
    - [ ] Mostrar modal (display, opacity)
  - [ ] renderizarOpciones() - radio buttons dinámicos
  - [ ] renderizarGuarniciones() - checkboxes con máximo 2
  - [ ] actualizarSubtotal() - recalcular en tiempo real
  - [ ] cerrarModal()
  - [ ] evento Agregar → construirItem() y agregarAlCarrito()
  - [ ] event listeners (botones, inputs)
  - [ ] export default ModalPlato

- [ ] Crear `src/js/carta/gestor-carrito.js`
  - [ ] Variables globales: carrito = [], CLAVE_STORAGE
  - [ ] cargarDesdeStorage()
    - [ ] Leer localStorage[CLAVE_STORAGE]
    - [ ] Parsear JSON
    - [ ] Return array
  - [ ] guardarEnStorage()
    - [ ] Convertir carrito[] a JSON
    - [ ] localStorage.setItem(CLAVE_STORAGE, JSON)
  - [ ] agregarItem(item)
    - [ ] Pushear a carrito[]
    - [ ] guardarEnStorage()
    - [ ] notificar cambios
  - [ ] eliminarItem(indice)
    - [ ] splice(indice, 1)
    - [ ] guardarEnStorage()
    - [ ] notificar cambios
  - [ ] actualizarCantidad(indice, cantidad)
    - [ ] Si cantidad > 0: actualizar
    - [ ] Si cantidad = 0: eliminar
  - [ ] calcularTotal()
    - [ ] reduce: precio * cantidad
  - [ ] vaciarCarrito()
    - [ ] carrito = []
    - [ ] guardarEnStorage()
  - [ ] export { agregarItem, eliminarItem, carrito, calcularTotal }

- [ ] Crear `src/js/carta/sidebar-pedido.js`
  - [ ] Clase SidebarPedido
  - [ ] constructor() - elementos DOM
  - [ ] abrirPanel() - mostrar sidebar/modal
  - [ ] cerrarPanel() - ocultar
  - [ ] renderizarItems()
    - [ ] Si carrito vacío: mostrar mensaje
    - [ ] Si hay items: listar con nombre, cantidad, precio
    - [ ] Botones +/- y eliminar por item
  - [ ] actualizarTotal() - mostrar calcularTotal()
  - [ ] validarPedido()
    - [ ] Nombre/mesa requerido
    - [ ] Items requeridos
  - [ ] enviarPedido()
    - [ ] Validar
    - [ ] Construir objeto comanda
    - [ ] addDoc a Firestore 'comandas'
    - [ ] Vaciar carrito
    - [ ] Mostrar toast exito
  - [ ] export default SidebarPedido

- [ ] Crear `src/css/carta/carrito-sidebar.css`
  - [ ] Desktop: sidebar fijo derecha
  - [ ] Móvil: modal centrado full-width
  - [ ] Lista items scrollable
  - [ ] Total sticky bottom
  - [ ] Botones grandes touch-friendly

- [ ] Crear `src/css/carta/toast.css`
  - [ ] Toast posición bottom-right
  - [ ] Animaciones enter/exit (slide, fade)
  - [ ] Colores por tipo (exito, error, etc.)
  - [ ] Auto-dismiss

- [ ] Integrar notificaciones
  - [ ] Producto agregado
  - [ ] Cantidad actualizada
  - [ ] Pedido enviado exitoso
  - [ ] Error (validacion, Firebase)

**Tiempo Estimado**: 6 horas

---

### DÍA 7: Integración Completa Carta y Testing

**Objetivo**: Conectar todo y validar funcionalidad

#### Tareas
- [ ] Crear `src/js/carta/carta.js` (INICIALIZADOR)
  - [ ] DOMContentLoaded listener
  - [ ] Importar: cargarMenu, HeaderNav, ModalPlato, renderizador, gestor
  - [ ] await cargarMenu()
  - [ ] new HeaderNav()
  - [ ] new ModalPlato()
  - [ ] new SidebarPedido()
  - [ ] Inicializar filtros
  - [ ] Event listeners:
    - [ ] Tabs categorías
    - [ ] Search input
    - [ ] Filtros estado
    - [ ] Toggle vista
    - [ ] Botón carrito

- [ ] Testing funcional
  - [ ] Página carga correctamente
  - [ ] Imagen hero carga
  - [ ] Menú se carga desde JSON
  - [ ] Filtros funcionan (categoria, busqueda, estado)
  - [ ] Toggle vista detallada/simple
  - [ ] Click plato abre modal
  - [ ] Modal personalización funciona
    - [ ] Opciones se renderizan
    - [ ] Guarniciones máximo 2
    - [ ] Subtotal actualiza
  - [ ] Agregar al carrito
    - [ ] Item se agrega
    - [ ] Toast aparece
    - [ ] Contador carrito aumenta
  - [ ] Sidebar carrito
    - [ ] Se abre/cierra
    - [ ] Items listados con opciones
    - [ ] +/- cantidad funciona
    - [ ] Eliminar item funciona
    - [ ] Total calcula correcto
  - [ ] Enviar pedido
    - [ ] Validación: nombre requerido
    - [ ] Persistencia carrito en localStorage
  - [ ] Responsive
    - [ ] Móvil: carrito modal
    - [ ] Tablet: layout intermedio
    - [ ] Desktop: sidebar fijo

- [ ] Performance
  - [ ] Lazy loading imágenes (usar loading="lazy")
  - [ ] Tamaño JSON < 500KB
  - [ ] Tiempo carga modal < 300ms

**Tiempo Estimado**: 4-5 horas

---

## 🔴 FASE 4: PANEL ADMIN - AUTENTICACIÓN Y COMANDAS (Días 8-10)

### DÍA 8: Login y Autenticación

**Objetivo**: Sistema de login y autenticación Firebase

#### Tareas
- [ ] Crear `public/admin.html`
  - [ ] Pantalla login (inicialmente visible)
  - [ ] Div pantalla-login:
    - [ ] Card con glassmorphism
    - [ ] Logo restaurante
    - [ ] Titulo "Panel Administración"
    - [ ] Input email con icono
    - [ ] Input password con toggle mostrar
    - [ ] Checkbox "Recordar sesión"
    - [ ] Botón Acceder + spinner
    - [ ] Div mensajes de error
  - [ ] Div panel-admin (hidden):
    - [ ] Header (logo, info usuario, botón salir, menu hamburguesa)
    - [ ] Nav tabs (Comandas, Caja, Carta, Usuarios, Auditoria)
    - [ ] Sections por tab (inicialmente hidden)
  - [ ] Scripts

- [ ] Crear `src/css/admin/login.css`
  - [ ] Fondo animado (gradiente)
  - [ ] Card centrada responsive
  - [ ] Glassmorphism (backdrop-filter: blur)
  - [ ] Inputs con iconos
  - [ ] Botón con hover/active
  - [ ] Spinner animado
  - [ ] Mensajes error rojo

- [ ] Crear `src/js/admin/autenticacion.js`
  - [ ] Clase Autenticacion
  - [ ] constructor() - elementos DOM
  - [ ] login(email, password)
    - [ ] Validar email/password
    - [ ] firebase.auth().signInWithEmailAndPassword()
    - [ ] Mostrar spinner
    - [ ] Si error: mostrar mensaje
    - [ ] Si éxito: ir a verificarAuth()
  - [ ] logout()
    - [ ] firebase.auth().signOut()
    - [ ] Volver a pantalla login
  - [ ] verificarAuth()
    - [ ] onAuthStateChanged(auth, (usuario) => {})
    - [ ] Si hay usuario:
      - [ ] Obtener datos de Firestore 'usuarios_admin' por uid
      - [ ] Si no existe y es el primero: crear como super_admin (bootstrap)
      - [ ] Obtener rol
      - [ ] registrarAuditoria('ACCESO_SISTEMA')
      - [ ] mostrarPanel()
    - [ ] Si no hay usuario:
      - [ ] mostrarLogin()
  - [ ] mostrarPanel() - ocultar login, mostrar admin
  - [ ] mostrarLogin() - mostrar login, ocultar admin
  - [ ] export default Autenticacion

- [ ] Crear `src/css/admin/sidebar-nav.css`
  - [ ] Sidebar lateral (desktop)
  - [ ] Header con user info
  - [ ] Tabs/Botones navegación
  - [ ] Responsive (collapse en móvil)

- [ ] Event listeners formulario login
  - [ ] Enter en password = click botón
  - [ ] Mostrar/ocultar password al hacer click en icono

- [ ] Testing login
  - [ ] Página carga (login visible, admin hidden)
  - [ ] Email/password vacías: error
  - [ ] Email inválido: error
  - [ ] Credenciales incorrectas: error Firebase
  - [ ] Credenciales correctas: redirecciona a admin
  - [ ] Logout vuelve a login

**Tiempo Estimado**: 4-5 horas

---

### DÍA 9: Tab Comandas - Estructura y Listeners

**Objetivo**: Sistema de comandas en tiempo real

#### Tareas
- [ ] Crear `src/css/admin/tab-comandas.css`
  - [ ] Estadísticas cards (4 tarjetas KPI)
  - [ ] Filtros (select, input, dropdown)
  - [ ] Grid de comandas tipo kanban o tarjetas
  - [ ] Tarjeta comanda: numero, mesa, mozo, items, estado (badge), hora, botones
  - [ ] Modal nueva comanda manual
  - [ ] Responsive

- [ ] Crear `src/js/admin/tab-comandas.js`
  - [ ] Variables globales: comandasData = [], comandasFiltradas = []
  - [ ] inicializarListenerComandas()
    - [ ] onSnapshot en coleccion 'comandas' ordenado por fechaCreacion descendente
    - [ ] Cada change: actualizar comandasData[]
    - [ ] Llamar a renderizarComandas()
  - [ ] renderizarComandas(filtroEstado)
    - [ ] Filtrar por estado actual
    - [ ] Generar HTML dinámico por tarjeta
    - [ ] Insertar en DOM
  - [ ] filtrarComandas(filtros)
    - [ ] Por estado
    - [ ] Por mesa
    - [ ] Por mozo
    - [ ] Por número comanda (búsqueda)
    - [ ] Aplicar filtros combinados
  - [ ] cambiarEstadoComanda(comandaId, nuevoEstado)
    - [ ] updateDoc en Firestore
    - [ ] Agregar timestamp (fechaPreparacion, fechaListo, etc.)
    - [ ] registrarAuditoria()
  - [ ] crearComandaManual() - abrir modal
  - [ ] guardarComandaManual(datos)
    - [ ] addDoc a 'comandas' con datos
    - [ ] registrarAuditoria()
    - [ ] Cerrar modal
  - [ ] imprimirComanda(id)
    - [ ] Formatear como ticket 80mm
    - [ ] window.print() con estilos
  - [ ] export default TabComandas

- [ ] Crear `src/js/admin/gestor-roles.js`
  - [ ] Definición de roles (objeto):
    ```javascript
    const ROLES = {
      super_admin: ['leer', 'crear', 'actualizar', 'eliminar', ...],
      admin: ['leer', 'crear', 'actualizar', ...],
      mozo: ['leer', 'crear', 'actualizar_parcial'],
      cajero: ['leer_caja', 'crear_boleta', ...],
      cocina: ['leer_comandas', 'actualizar_estado']
    }
    ```
  - [ ] verificarPermiso(usuario, accion)
    - [ ] Buscar rol del usuario
    - [ ] Revisar si accion está en permisos del rol
    - [ ] Return boolean
  - [ ] obtenerPermisos(usuario) - retornar array de permisos
  - [ ] protegerPestanas(usuario)
    - [ ] Mostrar/ocultar tabs según rol
  - [ ] export { ROLES, verificarPermiso, obtenerPermisos }

- [ ] Estadísticas rápidas
  - [ ] Contar pendientes
  - [ ] Contar preparando
  - [ ] Contar listos
  - [ ] Contar entregados hoy
  - [ ] Actualizar en tiempo real

**Tiempo Estimado**: 5-6 horas

---

### DÍA 10: Integración Admin y Modal Comanda

**Objetivo**: Completar funcionalidad de comandas

#### Tareas
- [ ] Crear modal nueva comanda manual
  - [ ] Select mesa
  - [ ] Select mozo
  - [ ] Buscador platos (autocomplete)
  - [ ] Agregar platos a lista temporal
  - [ ] Cantidad por plato
  - [ ] Observaciones general
  - [ ] Botones guardar/cancelar

- [ ] Implementar evento Preparar → cambio estado a 'preparando'
  - [ ] Botón en tarjeta comanda
  - [ ] Validación (solo si estado = pendiente)
  - [ ] Update Firestore
  - [ ] Toast confirmación

- [ ] Implementar evento Listo → cambio estado a 'listo'
  - [ ] Botón en tarjeta comanda
  - [ ] Validación (solo si estado = preparando)
  - [ ] Update Firestore

- [ ] Implementar evento Entregar → cambio estado a 'entregado'
  - [ ] Botón en tarjeta comanda
  - [ ] Validación (solo si estado = listo)
  - [ ] Update Firestore
  - [ ] Habilitar para cobro en caja

- [ ] Crear `src/js/admin/admin.js` (INICIALIZADOR)
  - [ ] DOMContentLoaded listener
  - [ ] Importar: Autenticacion, GestorRoles, TabComandas, etc.
  - [ ] new Autenticacion()
  - [ ] Esperar a que usuario esté logueado
  - [ ] new GestorRoles()
  - [ ] new TabComandas()
  - [ ] protegerPestanas(usuarioActual)
  - [ ] Inicializar listeners
  - [ ] Event listeners botones (logout, tabs)

- [ ] Testing funcional
  - [ ] Login funciona
  - [ ] Panel admin carga
  - [ ] Tab comandas visible
  - [ ] Estadísticas se actualizan
  - [ ] Listener de comandas (crear desde carta.html)
  - [ ] Nueva comanda aparece en tiempo real
  - [ ] Filtros funcionan
  - [ ] Cambiar estado funciona
  - [ ] Auditoria registra acciones

**Tiempo Estimado**: 4-5 horas

---

## 🟡 FASE 5: SISTEMA DE CAJA (Días 11-12)

### DÍA 11: Tab Caja y Generación de Boletas

**Objetivo**: Sistema de facturación

#### Tareas
- [ ] Crear `src/css/admin/tab-caja.css`
  - [ ] Resumen KPI (4 tarjetas)
  - [ ] Tabla comandas listas para cobrar
  - [ ] Modal generar boleta
  - [ ] Tabla historial boletas
  - [ ] Modal cierre caja

- [ ] Crear `src/js/admin/tab-caja.js`
  - [ ] Variables: boletasData = []
  - [ ] generarResumenDia()
    - [ ] Sumar boletas del día
    - [ ] Calcular: ventas totales, cantidad boletas, ticket promedio, mesas
    - [ ] Actualizar tarjetas KPI
  - [ ] obtenerComandasParaCobrar()
    - [ ] Filtrar comandas con estado 'entregado' y sin boletaId
    - [ ] Renderizar en tabla
  - [ ] abrirModalBoleta(comandaId)
    - [ ] Obtener datos comanda
    - [ ] Mostrar modal con:
      - [ ] Datos restaurante (precarga desde configuracion.json)
      - [ ] Número boleta (correlativo automático)
      - [ ] Fecha/hora
      - [ ] Detalle items (cantidad, descripcion, precio unitario, subtotal)
      - [ ] Subtotal
      - [ ] IGV 18% (calculado)
      - [ ] Total
      - [ ] Select método pago (Efectivo, Tarjeta, Yape/Plin, Mixto)
      - [ ] Si efectivo: campo "Pago con" + cálculo vuelto
  - [ ] emitirBoleta(datos)
    - [ ] Crear objeto boleta
    - [ ] addDoc a 'boletas'
    - [ ] updateDoc comanda: estado 'cobrado', boletaId
    - [ ] registrarAuditoria()
    - [ ] Toast éxito
  - [ ] imprimirBoleta(boletaId)
    - [ ] Obtener boleta de Firestore
    - [ ] Generar HTML formato ticket 80mm
    - [ ] window.print()
  - [ ] anularBoleta(boletaId)
    - [ ] Confirmar acción
    - [ ] Pedir motivo
    - [ ] updateDoc: anulada = true, motivoAnulacion
    - [ ] registrarAuditoria()
  - [ ] cierreCaja()
    - [ ] Sumar boletas del día por método pago
    - [ ] Generar resumen
    - [ ] Campo observaciones
    - [ ] addDoc a 'cierres_caja'
    - [ ] Botón exportar Excel
  - [ ] export default TabCaja

- [ ] Crear `src/js/admin/generador-boletas.js`
  - [ ] Clase GeneradorBoleta
  - [ ] constructor(datosRestaurante, datosComanda)
  - [ ] construirHTML() - HTML formato boleta
  - [ ] generarNumeroCorrelativo()
    - [ ] Obtener último número de boletas del día
    - [ ] Incrementar y retornar con formato B001-000001
  - [ ] calcularSubtotalIGV(items)
    - [ ] Sumar items
    - [ ] Calcular IGV 18%
    - [ ] Retornar objeto {subtotal, igv, total}
  - [ ] formatearParaImpresion() - estilos CSS para printer
  - [ ] export default GeneradorBoleta

- [ ] Crear `src/data/configuracion.json`
  - [ ] Datos restaurante:
    - [ ] nombre, razonSocial, ruc
    - [ ] direccion, telefono, email
    - [ ] horarios, dias atencion

- [ ] Testing
  - [ ] Tab caja visible para rol cajero
  - [ ] KPIs actualizan
  - [ ] Comandas listas para cobrar aparecen
  - [ ] Modal generar boleta abre
  - [ ] Números boleta correlativosCorrectamente
  - [ ] IGV calcula correcto (18%)
  - [ ] Vuelto calcula correcto
  - [ ] Boleta se registra en Firestore
  - [ ] Comanda cambia a estado 'cobrado'
  - [ ] Opción reimprimir funciona

**Tiempo Estimado**: 5-6 horas

---

### DÍA 12: Cierre de Caja y Exportación

**Objetivo**: Cierre diario y reportes

#### Tareas
- [ ] Completar modal cierre caja
  - [ ] Mostrar:
    - [ ] Total efectivo
    - [ ] Total tarjeta
    - [ ] Total digital (Yape/Plin)
    - [ ] Total general
    - [ ] Cantidad de boletas
  - [ ] Campo observaciones
  - [ ] Botón confirmar cierre

- [ ] Implementar cierreCaja()
  - [ ] Validar que no haya comandas 'entregado' sin cobrar
  - [ ] Crear documento en 'cierres_caja'
  - [ ] Registrar auditoria
  - [ ] Mostrar confirmación
  - [ ] Botón exportar reporte

- [ ] Mejorar `src/js/utils/reportes.js`
  - [ ] exportarExcel(datos, nombre)
    - [ ] Usar XLSX.js si está disponible
    - [ ] Generar tabla
    - [ ] Descargar archivo
  - [ ] exportarPDF(datos, nombre) - opcional (html2pdf)

- [ ] Historial boletas del día
  - [ ] Tabla con: número, hora, mesa, total, método pago
  - [ ] Botones: reimprimir, anular
  - [ ] Modal anular boleta (confirmar + motivo)

- [ ] Estadísticas visuales
  - [ ] Gráfico pastel: métodos de pago
  - [ ] Gráfico barras: ventas por hora (opcional, Chart.js)

- [ ] Testing
  - [ ] Cierre caja sin errores
  - [ ] Auditoria registra cierre
  - [ ] Exportación Excel funciona
  - [ ] Anular boleta funciona
  - [ ] Estado comanda actualiza correctamente

**Tiempo Estimado**: 4 horas

---

## 🟢 FASE 6: GESTIÓN DE CARTA Y USUARIOS (Días 13-14)

### DÍA 13: Tab Gestión de Carta

**Objetivo**: Control de disponibilidad y etiquetas

#### Tareas
- [ ] Crear `src/css/admin/tab-carta.css`
  - [ ] Estadísticas (4 tarjetas)
  - [ ] Filtros (categoria, búsqueda, etiqueta)
  - [ ] Grid platos (tarjetas)
  - [ ] Modal editar etiquetas

- [ ] Crear `src/js/admin/tab-carta.js`
  - [ ] Variables: platosData = []
  - [ ] inicializarListenerPlatos()
    - [ ] onSnapshot en 'platos_etiquetas'
    - [ ] Actualizar platosData[]
  - [ ] renderizarPlatos()
    - [ ] Mostrar cada plato con imagen, nombre, precio, etiquetas
    - [ ] Botón "Editar etiquetas"
  - [ ] filtrarPlatos(filtros)
    - [ ] Por categoria
    - [ ] Por búsqueda
    - [ ] Por etiqueta (agotado, nuevo, popular)
  - [ ] abrirModalEtiquetas(platoId)
    - [ ] Modal con opciones:
      - [ ] Radio: Disponible, Agotado, Proximamente
      - [ ] Checkboxes: Nuevo, Popular, 2x1, Descuento, Recomendado
      - [ ] Checkboxes: Solo Fin de Semana, Solo Almuerzo, De Temporada
  - [ ] guardarEtiquetas(platoId, datos)
    - [ ] updateDoc en 'platos_etiquetas'
    - [ ] registrarAuditoria()
    - [ ] Toast éxito
  - [ ] generarEstadisticas()
    - [ ] Contar disponibles
    - [ ] Contar agotados
    - [ ] Contar con promoción
    - [ ] Total platos
  - [ ] export default TabCarta

- [ ] Testing
  - [ ] Tab carta solo visible para admin/super_admin
  - [ ] Estadísticas se actualizan
  - [ ] Filtros funcionan
  - [ ] Modal editar etiquetas abre
  - [ ] Cambios se sincronizaban en tiempo real en carta.html

**Tiempo Estimado**: 3-4 horas

---

### DÍA 14: Tab Usuarios

**Objetivo**: Gestión de usuarios y roles

#### Tareas
- [ ] Crear `src/css/admin/tab-usuarios.css`
  - [ ] Tabla usuarios
  - [ ] Modal crear usuario
  - [ ] Botones acciones (editar, desactivar)

- [ ] Crear `src/js/admin/tab-usuarios.js`
  - [ ] Variables: usuariosData = []
  - [ ] inicializarListenerUsuarios()
    - [ ] onSnapshot en 'usuarios_admin'
    - [ ] Actualizar usuariosData[]
  - [ ] renderizarUsuarios()
    - [ ] Tabla con columnas: email, nombre, rol, estado, último acceso
    - [ ] Botones acciones
  - [ ] abrirModalAgregarUsuario()
    - [ ] Modal con campos:
      - [ ] Email (validación)
      - [ ] Nombre completo
      - [ ] Select rol (opciones según permisos)
  - [ ] crearUsuario(email, nombre, rol)
    - [ ] Firebase: auth().createUser({email, password: temporal})
    - [ ] Firestore: addDoc a 'usuarios_admin' con {uid, email, nombre, rol, estado: 'activo'}
    - [ ] registrarAuditoria()
    - [ ] Toast éxito
    - [ ] Enviar email con contraseña temporal (opcional)
  - [ ] editarUsuario(uid, datos)
    - [ ] updateDoc en 'usuarios_admin'
    - [ ] registrarAuditoria()
  - [ ] desactivarUsuario(uid)
    - [ ] Confirmación
    - [ ] updateDoc: estado = 'inactivo'
    - [ ] registrarAuditoria()
    - [ ] (No eliminar, solo desactivar)
  - [ ] export default TabUsuarios

- [ ] Mejorar `src/js/admin/gestor-roles.js`
  - [ ] Validar que usuarios tengan rol válido
  - [ ] Validar que solo super_admin pueda crear/editar otros usuarios

- [ ] Testing
  - [ ] Tab usuarios solo visible para super_admin
  - [ ] Tabla usuarios carga
  - [ ] Modal crear usuario abre
  - [ ] Crear usuario funciona
  - [ ] Validaciones (email duplicado, etc.)
  - [ ] Desactivar usuario funciona
  - [ ] Nuevo usuario puede loguearse

**Tiempo Estimado**: 3-4 horas

---

## 🔵 FASE 7: AUDITORIA Y REPORTES (Día 15)

### DÍA 15: Tab Auditoria

**Objetivo**: Trazabilidad completa

#### Tareas
- [ ] Crear `src/css/admin/tab-auditoria.css`
  - [ ] Filtros (usuario, fecha desde/hasta, tipo acción)
  - [ ] Tabla logs

- [ ] Crear `src/js/admin/tab-auditoria.js`
  - [ ] Variables: auditoriaData = []
  - [ ] inicializarListenerAuditoria()
    - [ ] onSnapshot en 'auditoria' ordenado por timestamp descendente
    - [ ] Actualizar auditoriaData[]
  - [ ] renderizarLogs()
    - [ ] Tabla con: fecha/hora, usuario, accion, recurso, detalles
  - [ ] filtrarPorFecha(inicio, fin)
    - [ ] Filtrar logs en rango
  - [ ] filtrarPorUsuario(email)
    - [ ] Filtrar logs del usuario
  - [ ] filtrarPorAccion(accion)
    - [ ] Filtrar por tipo: COMANDA_*, BOLETA_*, USUARIO_*, etc.
  - [ ] exportarExcel()
    - [ ] Exportar tabla actual a Excel
  - [ ] export default TabAuditoria

- [ ] Mejorar `src/js/utils/auditoria.js`
  - [ ] registrarAuditoria(datos)
    - [ ] addDoc a 'auditoria' con:
      - [ ] usuario: email del usuario actual
      - [ ] accion: tipo de acción (string)
      - [ ] recurso: qué se modificó (ej: "comanda:abc123")
      - [ ] detalles: información adicional (JSON)
      - [ ] timestamp: serverTimestamp()
      - [ ] tipo: 'EXITO' o 'ERROR'
  - [ ] Tipos de acción definidos:
    - [ ] COMANDA_CREADA, COMANDA_ACTUALIZADA, COMANDA_CANCELADA
    - [ ] BOLETA_GENERADA, BOLETA_ANULADA
    - [ ] CIERRE_CAJA
    - [ ] PLATO_ETIQUETADO
    - [ ] USUARIO_CREADO, USUARIO_DESACTIVADO
    - [ ] ACCESO_SISTEMA, ACCESO_DENEGADO
  - [ ] Llamadas registrarAuditoria en todas las acciones críticas

- [ ] Validar que todas las acciones importantes están siendo auditadas:
  - [ ] Login/Logout
  - [ ] Crear comanda
  - [ ] Cambiar estado comanda
  - [ ] Generar boleta
  - [ ] Anular boleta
  - [ ] Cierre caja
  - [ ] Crear/editar usuario
  - [ ] Editar etiquetas platos
  - [ ] Acceso denegado (permiso insuficiente)

- [ ] Testing
  - [ ] Tab auditoria solo visible para super_admin/admin
  - [ ] Logs aparecen en tiempo real
  - [ ] Filtros funcionan
  - [ ] Exportación Excel funciona
  - [ ] Logs contienen información correcta

**Tiempo Estimado**: 3-4 horas

---

## 🟣 FASE 8: OPTIMIZACIONES Y PWA (Días 16-17)

### DÍA 16: Service Worker y Caché

**Objetivo**: Funcionalidad offline y rendimiento

#### Tareas
- [ ] Mejorar `public/sw.js`
  - [ ] Definir CACHE_NAME versión
  - [ ] Listar archivos a cachear:
    - [ ] public/ (HTML)
    - [ ] src/css/ (CSS)
    - [ ] src/js/ (JS)
    - [ ] Google Fonts
    - [ ] assets/imagenes/ (solo las principales)
  - [ ] Evento install:
    - [ ] Crear cache
    - [ ] Agregar archivos
    - [ ] skipWaiting()
  - [ ] Evento fetch:
    - [ ] Network-first para datos Firebase
    - [ ] Cache-first para assets estáticos
    - [ ] Fallback a página offline
  - [ ] Evento activate:
    - [ ] Limpiar caches antiguos
    - [ ] clients.claim()
  - [ ] Registrar en index.html, carta.html
    ```javascript
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    }
    ```

- [ ] Optimizaciones de rendimiento
  - [ ] Lazy loading imágenes (loading="lazy" en img)
  - [ ] Comprimir imágenes a WebP (si es posible)
  - [ ] Defer scripts cuando sea posible
  - [ ] CSS crítico inline (mini)
  - [ ] Minificar CSS/JS (opcional para MVP)

- [ ] Mejorar `public/manifest.json`
  - [ ] name: "Nombre del Restaurante"
  - [ ] short_name: "Restaurante"
  - [ ] start_url: "/"
  - [ ] display: "standalone"
  - [ ] theme_color: "#0052B4"
  - [ ] background_color: "#ffffff"
  - [ ] icons:
    - [ ] 192x192
    - [ ] 512x512

- [ ] Crear iconos PWA
  - [ ] 192x192.png
  - [ ] 512x512.png
  - [ ] Guardar en assets/iconos-app/

- [ ] Testing offline
  - [ ] Abrir DevTools → Application → Service Workers
  - [ ] Marcar "Offline"
  - [ ] Navegar entre páginas (deben funcionar)
  - [ ] Tomar screenshot para documentación

**Tiempo Estimado**: 4 horas

---

### DÍA 17: Tema Oscuro y Animaciones

**Objetivo**: UX mejorada

#### Tareas
- [ ] Agregar tema oscuro a `src/css/variables.css`
  ```css
  @media (prefers-color-scheme: dark) {
    :root {
      --color-blanco: #1a1a1a;
      --color-gris-claro: #2a2a2a;
      /* inversos */
    }
  }
  ```

- [ ] Crear utility `src/js/utils/tema.js`
  - [ ] detectarPreferenciaOS()
    - [ ] window.matchMedia('(prefers-color-scheme: dark)')
  - [ ] guardarPreferencia(tema)
  - [ ] aplicarTema(tema)
    - [ ] document.documentElement.setAttribute('data-tema', tema)
  - [ ] toggleTema()
  - [ ] export { detectarPreferenciaOS, aplicarTema, toggleTema }

- [ ] Mejorar animaciones CSS
  - [ ] Transiciones suaves en hover buttons
  - [ ] Fade entre vistas
  - [ ] Slide en modales
  - [ ] Pulse en elementos interactivos
  - [ ] Loading skeletons animados

- [ ] Validaciones en tiempo real
  - [ ] Email: mientras digita, validar formato
  - [ ] Teléfono: mientras digita, validar largo
  - [ ] Mostrar estado visual (check verde/error rojo)

- [ ] Mejorar notificaciones
  - [ ] Toast con icono (✓, ✗, ℹ, ⚠)
  - [ ] Toast con color según tipo
  - [ ] Duración personalizable
  - [ ] Queue si hay múltiples
  - [ ] Animate enter/exit

- [ ] Testing
  - [ ] Tema oscuro detecta preferencia OS
  - [ ] Toggle tema funciona
  - [ ] Animaciones suaves
  - [ ] Validaciones en tiempo real funcionan
  - [ ] Toasts aparecen/desaparecen correctamente

**Tiempo Estimado**: 4-5 horas

---

## 🔷 FASE 9: TESTING Y DOCUMENTACIÓN (Día 18)

### DÍA 18: QA y Documentación

**Objetivo**: Garantizar calidad y documentar

#### Tareas
- [ ] Crear checklist de testing funcional
  - [ ] HOME: Hero, galería, navegación, responsive
  - [ ] CARTA: Carga menú, filtros, modal, carrito, pedidos
  - [ ] ADMIN: Login, tabs, crud, tiempo real, auditoria
  - [ ] PWA: Offline, caché, manifset
  - [ ] RESPONSIVIDAD: móvil, tablet, desktop

- [ ] Crear checklist navegadores
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
  - [ ] Mobile Chrome
  - [ ] Mobile Safari

- [ ] Crear checklist dispositivos
  - [ ] Desktop 1920x1080
  - [ ] Laptop 1366x768
  - [ ] Tablet 768x1024
  - [ ] Móvil 375x667
  - [ ] Móvil grande 414x896

- [ ] Crear `README.md`
  - [ ] Descripción del proyecto
  - [ ] Tecnologías usadas
  - [ ] Instrucciones instalación
  - [ ] Variables de entorno
  - [ ] Estructura de carpetas (resumida)
  - [ ] Links de documentación adicional

- [ ] Crear `INSTALACION.md`
  - [ ] Requisitos previos
  - [ ] Paso a paso instalación
  - [ ] Configuración Firebase
  - [ ] Ejecutar localmente
  - [ ] Deploy a producción

- [ ] Crear `GUIA_USUARIO.md`
  - [ ] Para personal del restaurante
  - [ ] Cómo usar cada sección
  - [ ] Procedimientos estándar
  - [ ] FAQ

- [ ] Crear `GUIA_DESARROLLADOR.md`
  - [ ] Para equipo técnico
  - [ ] Convenciones de código
  - [ ] Estructura modular
  - [ ] Cómo agregar nuevas funcionalidades
  - [ ] Troubleshooting

- [ ] Revisar código
  - [ ] Sin console.log() sin propósito
  - [ ] Sin comentarios obvios
  - [ ] Convenciones de nombres consistentes
  - [ ] Imports/exports correctos
  - [ ] Errores manejados

- [ ] Performance
  - [ ] Lighthouse score (mín 80)
  - [ ] Tiempo carga < 3s
  - [ ] Tamaño bundle < 500KB (gzip)

- [ ] Seguridad básica
  - [ ] Validaciones en cliente
  - [ ] Firebase Rules configuradas
  - [ ] No exponer credenciales
  - [ ] HTTPS en producción

**Tiempo Estimado**: 5-6 horas

---

## 🚀 FASE 10: DEPLOY Y PUESTA EN PRODUCCIÓN (Días 19-20)

### DÍA 19: Preparación y Deploy

**Objetivo**: Llevar a producción

#### Tareas
- [ ] Configurar dominio
  - [ ] Comprar/configurar dominio
  - [ ] Apuntar a Firebase Hosting
  - [ ] Esperar propagación DNS (24-48h)

- [ ] Configurar SSL/HTTPS
  - [ ] Firebase Hosting proporciona automáticamente
  - [ ] Validar que funciona: https://sistacna.com

- [ ] Revisar variables de entorno
  - [ ] .env.example tiene todos los campos
  - [ ] .env real nunca se commitea
  - [ ] Credenciales Firebase correctas

- [ ] Backup de base de datos
  - [ ] Exportar colecciones de Firestore
  - [ ] Guardar en lugar seguro

- [ ] Crear cuenta Firebase Hosting
  - [ ] `firebase login`
  - [ ] `firebase init`
  - [ ] Seleccionar proyecto

- [ ] Deploy
  ```bash
  firebase deploy --only hosting
  ```

- [ ] Pruebas en producción
  - [ ] Acceder a https://sistacna.com
  - [ ] Probar todas las funcionalidades
  - [ ] Verificar que Firebase funciona
  - [ ] Revisar logs de errores

- [ ] Monitoreo
  - [ ] Configurar alertas en Firebase
  - [ ] Revisar cloud functions (si las hay)
  - [ ] Revisar logs

**Tiempo Estimado**: 3-4 horas

---

### DÍA 20: Capacitación y Cierre

**Objetivo**: Entregar proyecto operativo

#### Tareas
- [ ] Sesión de capacitación
  - [ ] Explicar HOME a clientes
  - [ ] Demostrar flujo de pedidos (carta + carrito)
  - [ ] Training para mozo, cajero, admin
  - [ ] Explicar tab comandas
  - [ ] Explicar tab caja
  - [ ] Explicar cómo ver histórico

- [ ] Crear usuarios iniciales
  - [ ] Super admin
  - [ ] Admin
  - [ ] 2-3 mozos
  - [ ] 1-2 cajeros
  - [ ] 1 cocinero

- [ ] Configurar datos iniciales
  - [ ] Información restaurante
  - [ ] Horarios
  - [ ] Métodos de pago
  - [ ] Número inicial de boleta

- [ ] Imprimir menús (mencionarlos)
  - [ ] QR para mesas (impresión)
  - [ ] Carteles "Código QR para menú digital"

- [ ] Documentación final
  - [ ] Resumen ejecutivo
  - [ ] KPIs a monitorear
  - [ ] Plan de mejoras futuras
  - [ ] Contacto de soporte

- [ ] Establecer SLA
  - [ ] Soporte 24/7 semana 1
  - [ ] Soporte L-V semana 2-4
  - [ ] Mantenimiento preventivo mes 2+

- [ ] Cierre de proyecto
  - [ ] Todos los archivos en repositorio
  - [ ] Documentación completa
  - [ ] Backups configurados
  - [ ] Firma de recepción

**Tiempo Estimado**: 3-4 horas

---

## ✅ CHECKLIST FINAL DE PROYECTO

### Funcionalidades Completadas
- [ ] HOME: Landing page responsive
- [ ] CARTA: Menú digital con filtros y búsqueda
- [ ] CARRITO: Gestión de pedidos con localStorage
- [ ] ADMIN: Panel completo multirol
- [ ] COMANDAS: Sistema tiempo real
- [ ] CAJA: Generación de boletas
- [ ] USUARIOS: RBAC completo
- [ ] AUDITORIA: Logs de todas las acciones
- [ ] PWA: Offline + caché + manifest
- [ ] RESPONSIVE: Móvil, tablet, desktop
- [ ] SEGURIDAD: Validaciones, Firebase Rules
- [ ] DOCUMENTACIÓN: Completa
- [ ] TESTING: QA realizado
- [ ] DEPLOY: En producción

### Documentación Completada
- [ ] CRONOGRAMA_TRABAJO.md
- [ ] MEJORAS_PROPUESTAS.md
- [ ] ESTRUCTURA_PROYECTO.md
- [ ] RESUMEN_EJECUTIVO.md
- [ ] README.md
- [ ] INSTALACION.md
- [ ] GUIA_USUARIO.md
- [ ] GUIA_DESARROLLADOR.md

### Mejoras Implementadas (MVP)
- [ ] Validación en tiempo real
- [ ] Toast mejorado
- [ ] Skeleton loaders
- [ ] QR para mesas
- [ ] Lazy loading imágenes
- [ ] Caché inteligente
- [ ] Manejo centralizado errores
- [ ] Dashboard KPI
- [ ] Backups automáticos
- [ ] Tema oscuro (soporte)

---

## 📞 SOPORTE

**Equipo de Desarrollo**:
- Ingeniero Senior: [Nombre]
- Desarrollador Frontend: [Nombre]
- QA: [Nombre]

**Contacto**:
- Email: soporte@sistacna.com
- WhatsApp: +51 900000000
- Slack: #sistacna-soporte

**Horarios**:
- Semana 1: 24/7
- Semana 2-4: L-V 8am-8pm
- Mes 2+: L-V 9am-6pm

---

**Documento versión**: 1.0
**Responsable**: Equipo Senior
**Última actualización**: Febrero 2026
**Estado**: ✅ LISTO PARA IMPLEMENTACIÓN
