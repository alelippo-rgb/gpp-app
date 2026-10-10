self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.open("gpp-v1").then(async c => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then(r => { if(r.ok) c.put(e.request, r.clone()); return r; }).catch(()=>hit);
      return hit || net;
    })
  );
});