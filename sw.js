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

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => cache.addAll(toCache)),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
