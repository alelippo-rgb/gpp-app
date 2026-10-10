self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ return caches.delete(k); })); })
          .then(function(){ return clients.claim(); })
  );
});
// Nessun fetch handler: da ora si passa SEMPRE dalla rete, niente più cache.
