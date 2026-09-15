/* Tombstone for the service worker registered by the old Flutter build.
 *
 * That worker cached the whole Flutter app shell, so returning visitors kept
 * being served the old site from cache no matter what we deployed. Browsers
 * re-fetch a registered worker's script on navigation; serving this file at the
 * same path lets the old worker update to one that clears every cache,
 * unregisters itself and reloads the open tabs. Delete once traffic has turned
 * over -- while it exists it is harmless, and removing it too early strands
 * anyone who has not been back since.
 */
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      try {
        var keys = await caches.keys();
        await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      } catch (e) { /* storage may be unavailable */ }

      try { await self.registration.unregister(); } catch (e) { /* already gone */ }

      var windows = await self.clients.matchAll({ type: "window" });
      windows.forEach(function (client) { client.navigate(client.url); });
    })()
  );
});

// No respondWith: every request goes straight to the network.
self.addEventListener("fetch", function () {});
