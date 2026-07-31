const CACHE_NAME = 'nextbreak-v1';
const APP_SHELL = ['./', 'index.html', 'style.css', 'script.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request).then(function (networkResponse) {
        if (networkResponse && networkResponse.ok) {
          var clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
        }
        return networkResponse;
      }).catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});

// The page (while open) detects when a reminder is due and asks us to show it,
// since a plain service worker with no Push subscription has no way to wake
// itself up on a schedule when the browser is fully closed.
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'show-notification') {
    var payload = event.data.payload || {};
    self.registration.showNotification(payload.title || 'NextBreak', {
      body: payload.body || '',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      tag: payload.tag,
      dir: 'rtl',
      lang: 'he'
    });
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientsArr) {
      if (clientsArr.length > 0) {
        return clientsArr[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
