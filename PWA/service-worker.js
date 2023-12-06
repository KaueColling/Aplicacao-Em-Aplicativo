const CACHE_NAME = 'nome-do-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css', // Substitua pelo seu arquivo de estilos
    '/service-worker.js',  // Substitua pelo seu arquivo de scripts
    '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        const cachePromises = urlsToCache.map(url => {
          return cache.add(url)
            .catch(error => {
              console.error(`Falha ao adicionar ${url} ao cache:`, error);
              // Realize um log do URL específico que causou o erro
              console.log('URL do recurso com falha:', url);
            });
        });

        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});