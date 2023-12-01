const CACHE_NAME = "pwa";
const urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/dashboard.html",
  "/dashboard.css",
  "/dashboard.js",
  // Add paths to other assets as needed
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          // Exclude resources with 'chrome-extension' scheme
          if (!url.startsWith("chrome-extension")) {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch: ${url}`);
                }
                return cache.put(url, response);
              })
              .catch((error) => {
                console.error(`Error caching ${url}:`, error);
              });
          }
          return Promise.resolve();
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // Exclude 'chrome-extension' resources from being cached
          if (!event.request.url.startsWith("chrome-extension")) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});
