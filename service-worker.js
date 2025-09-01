const CACHE_NAME = "df-digital-studio-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://res.cloudinary.com/dckwrqrur/image/upload/v1756758462/tf-stream-url/IMG-20250901-WA0656_wgeguu.jpg",
  "https://res.cloudinary.com/dckwrqrur/image/upload/v1756758462/tf-stream-url/IMG-20250901-WA0656_wgeguu.jpg"
];

// Installation et mise en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activer nouveau cache et supprimer anciens
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
