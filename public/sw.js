/* ============================================================================
   SERVICE WORKER - Funcionalidad PWA (offline, caché, etc)
   ============================================================================ */

const CACHE_NAME = 'sistacna-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/carta.html',
  '/admin.html',
  '/manifest.json',
  '/src/css/variables.css',
  '/src/css/reset.css',
  '/src/css/base.css',
  '/src/css/responsive.css',
  '/src/css/animaciones.css',
];

/* ─────────────────────────────────────────────────────────────────────
   INSTALAR SERVICE WORKER
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Caché creado:', CACHE_NAME);
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('⚠️ Error al cachear algunos archivos:', err);
      });
    }),
  );

  // Forzar activación inmediata
  self.skipWaiting();
});

/* ─────────────────────────────────────────────────────────────────────
   ACTIVAR SERVICE WORKER
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('activate', (event) => {
  console.log('✨ Service Worker activado');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  // Tomar control de clientes inmediatamente
  return self.clients.claim();
});

/* ─────────────────────────────────────────────────────────────────────
   INTERCEPTAR REQUESTS (Estrategia de caché)
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // No cachear requests a Firebase u otros servicios externos
  if (url.hostname !== self.location.hostname) {
    return;
  }

  // Estrategia: Cache first, fallback to network
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          console.log('✓ Desde caché:', request.url);
          return response;
        }

        return fetch(request)
          .then((response) => {
            // No cachear respuestas de error
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Cachear respuesta exitosa
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });

            console.log('↓ Desde red:', request.url);
            return response;
          })
          .catch(() => {
            // Si no hay conexión y no está en caché
            console.warn('✗ Sin conexión:', request.url);

            // Retornar página offline si existe
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      }),
    );
  }

  // Requests POST/PUT: enviar a red
  if (request.method === 'POST' || request.method === 'PUT') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => {
          console.warn('✗ POST/PUT fallido:', request.url);
          return new Response('Sin conexión', { status: 503 });
        }),
    );
  }
});

/* ─────────────────────────────────────────────────────────────────────
   NOTIFICACIONES PUSH (Opcional)
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const datos = event.data.json();
  const opciones = {
    body: datos.body,
    icon: '/assets/iconos-app/icon-192x192.png',
    badge: '/assets/iconos-app/icon-192x192.png',
    vibrate: [100, 50, 100],
    tag: 'sistacna-notificacion',
    requireInteraction: datos.requireInteraction || false,
  };

  event.waitUntil(
    self.registration.showNotification(datos.title || 'SISTACNA', opciones),
  );
});

/* ─────────────────────────────────────────────────────────────────────
   BACKGROUND SYNC (Sincronización en background)
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-comandas') {
    event.waitUntil(
      // Sincronizar comandas pendientes cuando hay conexión
      fetch('/api/sync-comandas', { method: 'POST' })
        .then((response) => {
          if (response.ok) {
            console.log('✓ Comandas sincronizadas');
            // Notificar a los clientes
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({
                  type: 'SYNC_COMPLETADO',
                  data: 'Comandas sincronizadas exitosamente',
                });
              });
            });
          }
        })
        .catch((err) => {
          console.error('✗ Error al sincronizar:', err);
        }),
    );
  }
});

/* ─────────────────────────────────────────────────────────────────────
   MESSAGE HANDLER (Comunicación con cliente)
   ───────────────────────────────────────────────────────────────────── */

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('🗑️ Caché limpiado');
    });
  }

  if (type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((requests) => {
        event.ports[0].postMessage({
          type: 'CACHE_SIZE',
          size: requests.length,
        });
      });
    });
  }
});

/* ─────────────────────────────────────────────────────────────────── */
console.log('🔧 Service Worker listo para funcionar');
