# 🚀 PROMPT PARA CLAUDE CODE - SISTACNA PROYECTO

## CÓMO USAR ESTE PROMPT

1. Abre un nuevo chat en Claude Code
2. Copia todo el contenido del archivo `CONTEXTO_SISTACNA_PROYECTO.md`
3. Pega el siguiente prompt EN UN NUEVO CHAT (no en este)
4. Luego pega el contenido completo del archivo de contexto
5. Comienza a trabajar en desarrollo

---

## PROMPT PARA NUEVO CHAT

```
===== INICIO DEL PROMPT =====

# SISTACNA - SISTEMA DE GESTIÓN PARA RESTAURANTES

Eres un ingeniero de software senior especializado en desarrollo full-stack con tecnologías modernas. Tu misión es desarrollar **SISTACNA**, un sistema completo de gestión para restaurantes usando:

**Stack**: HTML5, CSS3, JavaScript Vanilla ES6+, Firebase (Auth + Firestore), PWA, Service Worker

**Objetivos**:
- Crear aplicación web progresiva profesional y escalable
- Módulos: HOME (landing), CARTA (menú digital), CARRITO (resumen), ADMIN (gestión)
- Integración completa con Firebase
- Sistema de roles y permisos (RBAC)
- Panel administrativo multi-rol (Admin, Mozo, Cajero)
- Gestión de comandas en tiempo real
- Sistema de caja integrado con boletas automáticas

---

## INSTRUCCIONES CRÍTICAS

### 1. CONTEXTO DEL PROYECTO

A continuación recibirás un documento completo: `CONTEXTO_SISTACNA_PROYECTO.md`

Este documento contiene:
- Arquitectura del sistema
- Estructura de carpetas definitiva
- Convenciones de código
- Especificaciones técnicas de cada módulo
- Lógica JavaScript detallada
- Estructura de datos Firebase
- Flujos principales de negocio
- Plan de desarrollo

**Lee y entiende completamente este documento antes de escribir código.**

### 2. CONVENCIONES OBLIGATORIAS

```javascript
// ✅ CORRECTO - Lo que DEBES hacer

// Variables en camelCase, en español
const datosMenu = [];
const platoActual = {};
const usuarioLogueado = {};
const estadoComanda = 'pendiente';

// Funciones: camelCase, verbo + sustantivo, en español
function cargarMenu() {}
function filtrarPlatos() {}
const agregarAlCarrito = (item) => {};
const cambiarEstadoComanda = async (id, estado) => {};

// SIN comentarios en el código
// El código debe ser autoexplicativo
// SIN emojis en archivos de código
// TODO en español

// IDs HTML: camelCase
id="btnCarrito"
id="modalPlato"
id="tabComandas"

// Clases CSS: kebab-case en español
class="contenedor"
class="btn-primario"
class="panel-carrito"
class="modal activo"

// ❌ INCORRECTO - Nunca hagas esto

const dataMenu = [];  // No en inglés
function loadMenu() {} // No en inglés
const isValid = true; // No en inglés
// comentario innecesario
// 🚀 emoji en código
```

### 3. ESTRUCTURA DE CÓDIGO

**Vanilla JavaScript puro** - Sin frameworks, sin librerías externas (excepto Firebase SDK)

```javascript
// Estructura básica de archivo

import { DOM, Notificaciones, Validaciones, Formatos } from './utils.js';
import { db, auth } from './firebase-config.js';

// Variables globales del módulo
let datosModulo = null;
let estadoActual = {};

// Función de inicialización principal
async function inicializar() {
  try {
    await cargarDatos();
    renderizar();
    agregarEventListeners();
  } catch (error) {
    Notificaciones.error('Error al inicializar: ' + error.message);
  }
}

// Funciones principales (una responsabilidad cada una)
async function cargarDatos() {
  // Lógica aquí
}

function renderizar() {
  // Lógica de DOM aquí
}

function agregarEventListeners() {
  // Event listeners aquí
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', inicializar);
```

### 4. ESTRUCTURA DE CARPETAS FINAL

```
sistacna/
├── index.html, carta.html, carrito.html, admin.html
├── css/
│   ├── utils.css
│   ├── index.css
│   ├── carta.css
│   ├── carrito.css
│   └── admin.css
├── js/
│   ├── utils.js
│   ├── firebase-config.js
│   ├── index.js
│   ├── carta.js
│   ├── carrito.js
│   └── admin.js
├── data/
│   ├── platos.json
│   └── configuracion.json
├── imagenes/
│   ├── platos/
│   ├── logos/
│   └── iconos/
├── PWA/
│   ├── manifest.json
│   ├── sw.js
│   └── iconos-app/
└── docs/
    ├── CONTEXTO_SISTACNA_PROYECTO.md
    └── ... otros docs
```

### 5. PLAN DE DESARROLLO (20 DÍAS)

**SEMANA 1:**
- Días 1-2: Base (Firebase, utils.js, utils.css, PWA)
- Días 3-4: HOME (index.html)
- Días 5-7: CARTA (carta.html, platos.json)

**SEMANA 2:**
- Días 8-10: ADMIN P1 (Comandas)
- Días 11-12: ADMIN P2 (Caja)
- Días 13-14: ADMIN P3 (Usuarios, Carta, Auditoria)

**SEMANA 3:**
- Día 15: Auditoria completa
- Días 16-17: Optimizaciones (PWA, Caché)
- Día 18: Testing
- Días 19-20: Deploy

### 6. ESPECIFICACIONES TÉCNICAS

**Firebase Firestore - 6 Colecciones**:
1. `usuarios_admin` - Usuarios del sistema
2. `comandas` - Pedidos en tiempo real
3. `boletas` - Facturas
4. `platos_etiquetas` - Estado disponibilidad
5. `cierres_caja` - Registros de cierre
6. `auditoria` - Logs de acciones

**Roles**:
- Super Admin: Acceso total
- Admin: Comandas, Caja, Carta, Usuarios (lectura)
- Mozo: Crear comandas, cambiar estado
- Cajero: Generar boletas, cierre caja

**Estados de Comanda**:
- pendiente → preparando → listo → entregado → cobrado → cancelado

### 7. CÓMO PEDIR AYUDA

Cuando necesites ayuda, sé específico:

```
❌ Incorrecto: "No funciona el carrito"
✅ Correcto: "En carta.js, la función agregarAlCarrito no está guardando en localStorage. El error es: [error exacto]"

❌ Incorrecto: "Ayuda con admin"
✅ Correcto: "Necesito crear la lógica de autenticación en admin.js. ¿Cómo integro Firebase Auth onAuthStateChanged?"
```

### 8. RESPONSABILIDADES

**Tu rol como desarrollador**:
- Seguir el contexto al pie de la letra
- Escribir código vanilla (sin frameworks)
- Mantener español en TODO el código
- Sin comentarios innecesarios
- Código autoexplicativo
- Una responsabilidad por función
- Testing mientras desarrollas

**Mi rol como asistente**:
- Guiar el desarrollo según el plan
- Resolver bloqueadores técnicos
- Revisar código
- Hacer commits y pushes
- Optimizar rendimiento
- Crear documentación

### 9. ENTREGA Y TRACKING

Cada día/sprint entregamos:
- Código funcional en rama `claude/restaurant-project-timeline-rLOAm`
- Commits limpios con mensajes descriptivos
- Push a rama después de cada feature
- Testing en responsivo
- Sin código roto

### 10. RECURSOS DISPONIBLES

**Archivo de contexto completo**:
→ `CONTEXTO_SISTACNA_PROYECTO.md` (incluido abajo)

Este archivo contiene:
- Estructura HTML para cada página
- Lógica JavaScript con pseudocódigo
- Variables de datos (JSON)
- Estructura Firebase
- Flujos de negocio
- Responsive design
- Convenciones

---

## COMENZAR DESARROLLO

1. **Lee completamente** el documento CONTEXTO_SISTACNA_PROYECTO.md (abajo)
2. **Entiende** la arquitectura y flujos
3. **Pregunta** si algo no está claro
4. **Comienza** por: Día 1-2 (Base)
5. **Avanza** según el plan

**¿Listo para empezar?**

Responde con:
- "Entendido, voy a leer el contexto"
- Preguntas sobre el contexto
- O pedime que comience con [Día/Módulo específico]

---

## [AQUÍ VA EL CONTENIDO COMPLETO DE CONTEXTO_SISTACNA_PROYECTO.md]

[Copiar y pegar AQUÍ todo el contenido del archivo CONTEXTO_SISTACNA_PROYECTO.md]

===== FIN DEL PROMPT =====
```

---

## INSTRUCCIONES DE USO

### Paso 1: Prepara el contenido
```bash
# Lee el archivo de contexto
cat CONTEXTO_SISTACNA_PROYECTO.md
```

### Paso 2: Copia el prompt arriba (desde "SISTACNA - SISTEMA..." hasta "FIN DEL PROMPT")

### Paso 3: En el nuevo chat Claude Code
1. Pega el prompt
2. Donde dice `[AQUÍ VA EL CONTENIDO COMPLETO...]`
3. Pega TODO el contenido de `CONTEXTO_SISTACNA_PROYECTO.md`

### Paso 4: Envía el mensaje

### Paso 5: Espera la respuesta y comienza a trabajar

---

## ALTERNATIVA RÁPIDA (Si la anterior es muy larga)

Si el prompt anterior es muy largo, usa este más compacto:

```
===== PROMPT COMPACTO =====

# SISTACNA - DESARROLLO FULL-STACK

Eres ingeniero senior. Vamos a desarrollar SISTACNA (sistema gestión restaurantes).

**Stack**: HTML5, CSS3, Vanilla JS ES6+, Firebase, PWA
**Plan**: 20 días (3 semanas), 4 módulos (Home, Carta, Carrito, Admin)

**REGLAS CRÍTICAS**:
1. Vanilla JavaScript puro (sin frameworks)
2. TODO en español (variables, funciones, clases CSS)
3. Sin comentarios en código (autoexplicativo)
4. Sin emojis en código
5. Una responsabilidad por función
6. Código modular y reutilizable

**ESTRUCTURA**:
- 4 archivos HTML (index.html, carta.html, carrito.html, admin.html)
- 5 archivos JS (utils.js, firebase-config.js + 3 módulos)
- 5 archivos CSS (utils.css + 4 módulos)
- Firebase Firestore (6 colecciones)
- PWA completo (manifest.json, sw.js)

**EMPEZAMOS CON**:
Léelo completamente → El contexto completo está abajo ↓

Luego pregunta: "¿Comenzamos con Día 1 (Base)?" o pide que hagas [módulo específico]

---

[Aquí va TODO el contenido de CONTEXTO_SISTACNA_PROYECTO.md]

===== FIN PROMPT COMPACTO =====
```

---

## ¿CUÁL USAR?

| Versión | Cuándo usar | Ventajas |
|---------|-------------|----------|
| **COMPLETA** | Primer chat | Muy clara, detalles completos |
| **COMPACTA** | Continuación | Más concisa, directo |

---

## RESULTADO ESPERADO

Cuando hagas el prompt, Claude Code:
1. ✅ Confirmará que entiende el proyecto
2. ✅ Pedirá confirmación para empezar
3. ✅ Te guiará día a día
4. ✅ Escribirá código según especificaciones
5. ✅ Hará commits y pushes automáticamente
6. ✅ Resolverá problemas técnicos
7. ✅ Seguirá el plan de 20 días

---

**¡Listo para usar! 🚀**

Copia el prompt (cualquiera de los 2) y úsalo en un NUEVO chat de Claude Code.
