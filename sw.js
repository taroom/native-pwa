const cacheName = "app-v1";
const preCache = ["/", "/index.html", "/index.css", "/index.js"];
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      cache.addAll(preCache);
    })()
  );
});

self.addEventListener("activate", () => {
  console.log("Service Worker: Activated");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      const resCache = await cache.match(e.request);
      if (resCache) return resCache;

      try {
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      } catch (error) {
        console.log("Error", error);
      }
    })()
  );
});
