const CACHE_NAME = "consorcio-v1";

const FILES_TO_CACHE = [
  "/",
  "/login.html",
  "/dashboard.html",
  "/membros.html",
  "/pagamentos.html",
  "/sorteio.html",
  "/historico.html",

  "/css/style.css",

  "/js/app.js",
  "/js/login.js",
  "/js/dashboard.js",
  "/js/membros.js",
  "/js/payments.js",
  "/js/sorteio.js",
  "/js/history.js",

  "/manifest.json",

  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Cacheando arquivos...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
