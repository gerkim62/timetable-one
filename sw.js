const cacheName = "cache1"; // Change value to force update
const toCache = [
     "/",
  "https://fonts.googleapis.com",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap",
  "https://fonts.gstatic.com",
  "https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css",
  "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css",
   "https://cdn.jsdelivr.net/npm/toastify-js"
  ,
  'icon-512x512.png',
  'icon-192x192.png',
  "https://cdn.jsdelivr.net/npm/toastify-js",
  'index.js',
  'index.html',
  'style.css',
  'manifest.webmanifest'
  ]
self.addEventListener("install", event => {
  // Kick out the old service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener("activate", event => {
  // Delete any non-current cache
  event.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys.map(key => {
          if (![cacheName].includes(key)) {
            return caches.delete(key);
          }
        })
      )
    })
  );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
    })
  );
});