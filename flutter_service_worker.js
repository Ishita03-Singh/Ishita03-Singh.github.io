'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "e761249b992af987218ae72fc77c111f",
"assets/assets/avekshaka.png": "be76ad6291830f3aed60ce7d6521b523",
"assets/assets/behance.png": "1b152634b9b39b4bfbff871ba2b89ccb",
"assets/assets/covieye.jpeg": "65f2a9016634d5f1d55b9d73cf9a754a",
"assets/assets/github.png": "29a80be91ff5b5a0c9ce641a9252f99b",
"assets/assets/I.png": "7c13ea502767dce02f57e5d933f0d051",
"assets/assets/instagram.png": "5f551eea9af5fbd73bb77257a2b64794",
"assets/assets/Ishita.pdf": "7a886a72396dc4ce43c8ffd07fccfff8",
"assets/assets/Ishitalogo.png": "ead51dda0718839f6d0858e62fe49bfe",
"assets/assets/linkedin.png": "42218c805f5d0f11e18f30e4fda9635b",
"assets/assets/newsfeed.jpeg": "453c397372692ecea33513ba97b08018",
"assets/assets/twitter.png": "6868fb4acbe5d83061568c9627d6609b",
"assets/FontManifest.json": "5ff6b96e4f3ad363cb0eebc91a78a04a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/lib/fonts/Calibre-Light.ttf": "73b7f4385ae2f8028e1b365a48038582",
"assets/lib/fonts/Calibre-Medium.ttf": "88178c3f2a309ad11520ee62765072d0",
"assets/lib/fonts/Calibre-Regular.ttf": "96e0a7c47fdd7a8f05007837ead73b35",
"assets/lib/fonts/Calibre-Semibold.ttf": "8325d174436d55e995c7214faafcd47b",
"assets/lib/fonts/SFMono-Medium.ttf": "02bbb63875ebdbf463e764bb3d8ff190",
"assets/lib/fonts/SFMono-Regular.ttf": "d892da9f8895428033ec68a6c0426ba6",
"assets/lib/fonts/SFMono-Semibold.ttf": "8282ed99a84b8e9c803baf3df5b76c01",
"assets/NOTICES": "7c75598e13d4006b486359ef293fc810",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4e20cb87b0d43808c49449ffd69b1a74",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "1f7cb220b3f5309130bd6d9ad87e0fc0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "26f5af2d93473531f82ef5060f9c6d45",
"assets/shaders/ink_sparkle.frag": "a4501322d7a220bf334589921e0c2ec7",
"favicon.png": "aef14f43924cf084eccc026e75182703",
"icons/Icon-192.png": "a06cc6bf42c4fc7c0362f17551499f97",
"icons/Icon-512.png": "c512ed8b1542bb58b23d687da43b0b23",
"icons/Icon-maskable-192.png": "a06cc6bf42c4fc7c0362f17551499f97",
"icons/Icon-maskable-512.png": "c512ed8b1542bb58b23d687da43b0b23",
"index.html": "85702ec362acf1957caa4f86da56eb8d",
"/": "85702ec362acf1957caa4f86da56eb8d",
"main.dart.js": "c744acf49eead27a72a0473be207b057",
"manifest.json": "f6ac495eeeb52ecfd2a97f9ddb3593f8",
"version.json": "8acf3b83dd0096becf568fc61b1ebcb5"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
