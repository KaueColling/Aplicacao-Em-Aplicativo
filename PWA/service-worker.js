
// service-worker.js

const CACHE_NAME = 'nome-do-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css', // Substitua pelo seu arquivo de estilos
    '/service-worker.js',  // Substitua pelo seu arquivo de scripts
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache)
          .catch(error => {
            console.error('Falha ao adicionar recursos ao cache:', error);
            // Realize um log do URL específico que causou o erro
            console.log('URL do recurso com falha:', error.url);
          });
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
