'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  ".git/COMMIT_EDITMSG": "9cd599a3523898e6a12e13ec787da50a",
".git/config": "7e6d29c1be09a831edac064ed50444bb",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "41b0041f3baa186360ae144588cdef26",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "f6ad6acb7a923169e83b755010797677",
".git/logs/refs/heads/master": "f6ad6acb7a923169e83b755010797677",
".git/logs/refs/remotes/origin/master": "0f4d234350eb44a5af01930847c95a42",
".git/objects/07/636ff8dd7142165019bcdcff114eca74204917": "f4e7352b8d1956a71acb14c9c7eb1f03",
".git/objects/09/56f2dc8186b7e88be8923b12d1e17bc594d8dd": "a49f2413844f439ac9bb4bbf097f2125",
".git/objects/18/e3f75159b850c2b1ea150590e6abe997f03881": "3967ae9430b436ed19b0dfe9193dce1b",
".git/objects/1a/b847b818dec389fb43fb9da80637c02e27d3d3": "8af286f2a069534106d53e8c037b0a4a",
".git/objects/20/68330c5c4eda804a50affe4ec27e4323ee880d": "d52d3921fa150902501ecb7629045b26",
".git/objects/22/db43513aadad04853713464e6555d93d8d46bb": "fd728bab3be1a1cbc0a235222861321c",
".git/objects/24/5ef780094b65b2a63151b764092021eaaa0208": "e590d1ad811761cb50c6e5397f9b6fca",
".git/objects/2b/2c3a562b375d8b8666585df340e8f3868f38a8": "92a5ead6e841d0afb413c30b02850499",
".git/objects/2b/c7393964900b13cfdd952410a4af3bfb432e0c": "6f46d36063e12a1467fc10bfaeaa9074",
".git/objects/3f/7682a6e830e34f27e98a37d386fa63b2985df4": "1acac7a08041d4c873c649de6751474c",
".git/objects/41/7de721c493eb506d5b94b0db5de77c361d6134": "97e4f1a863bbc1c61695cc535cdde2f5",
".git/objects/43/b2dce26d96d88a2f8c9316a495207600c93a25": "c0e75a71bebf0648f8766225391683e1",
".git/objects/47/818cc125f4b61ab58210edd3c06f8c437f90ba": "ce1161c7701ab241f737dc9b927be76d",
".git/objects/47/8d23a3f673a08b2cf257bf2e10d9caa4fd8bb0": "329449bb7c64d7e3a3ea4d1f9e772bdf",
".git/objects/4a/74d431524ce214832aec24a837397964b35950": "22c92c65ef64472be18ff2bcc8cf19d8",
".git/objects/4b/c16dfa73b71514026c78b849d91640fd546b2a": "c432aa31e19e3fcc61c3b98b92da4dd1",
".git/objects/56/46c870cf162c31b0fbddb9d12094a5384d7226": "ebd35973b539b4a7eb977032b76883ce",
".git/objects/60/256fa89013a0b9e01d1a3dd0a318228599000f": "8ddc11dc2ec9a7014cfd03bc62425088",
".git/objects/63/de0ca6b54aa744e08e67fb650a28090bd37981": "b4d32faf892a7431397f40ede6a1eb6f",
".git/objects/71/1f20d4fde94a1fb9eb5e6f637fb492bc1f7ef9": "6dae03623c2eb71bbcf4fd22120cd3a3",
".git/objects/71/28e318c71a3c890191035a2e2d3d11a846965f": "e571130db50f4894bffae848cfa43bbf",
".git/objects/73/87c9b7f8a5cfbc5732333434d4b86b79f07c1d": "3c6c8a81670a37371205c2dba9e0e3c1",
".git/objects/79/ba7ea0836b93b3f178067bcd0a0945dbc26b3f": "f3e31aec622d6cf63f619aa3a6023103",
".git/objects/7c/fb6f962bdb8c4b610bb1bb25b6c4361f9d20e8": "20235224869b650fc9ceb371e56bb5c9",
".git/objects/84/44143dcee530d246c56888c836ccefafd12d57": "8d1cf03b5ec7f4940447ef536be73283",
".git/objects/87/1f4e826d4bbdd59bfaf078d634bc4a7b6f92aa": "e507ef36fd27e74c8e40cba399a9d003",
".git/objects/94/98c0c7aeb43ba5dab57c6111ef89b33c05e7cd": "411a78174d866e4e4a73195c4d0055f5",
".git/objects/97/32e2935e50f511bd9861dfea40aa929f19f4e4": "34260142181ef5297c667f020155ba10",
".git/objects/97/8746b5424d1212460133977131fc5ef0971abb": "3cc094294d4d3275ff02b12eff5e10c3",
".git/objects/98/93486f537d83e62c614890726b4514629902e4": "6263ffee3af50b622c9a19582c40f2ee",
".git/objects/9c/45a83eba026e6cba5e4288d2a60ed9a188ac14": "abf223f0e3e325d36a4ab70337c10859",
".git/objects/9d/2ad795459f75fc1b596cb086dd33726c6ff56e": "9aa1a5c07869866463f8d0b9ae522f61",
".git/objects/a1/3837a12450aceaa5c8e807c32e781831d67a8f": "bfe4910ea01eb3d69e9520c3b42a0adf",
".git/objects/a8/277b1f80b1592f83cfa22fe17c174e5c6a365d": "f80f83d8f4b5706c2c4c76f222b9b826",
".git/objects/a9/1b0aa9bce6215f51961b9068480b083f76542f": "51bb3cab7ff0b836c5eccf225f971525",
".git/objects/ab/ef49eaaf487973553976dcb30e25b12ee44ba5": "75b109cee183cfe8c302b597aade00bd",
".git/objects/ae/97caa0321a090cc03db148072582a7cfcbcd9d": "9f57c78976873dd0321bb776cb815ed9",
".git/objects/ba/830952235e8557661a8be8093e2d8b29f193d4": "1b5df1276b22d566945b7ac966984920",
".git/objects/be/342b243ff9c9a2835791bd80e0ea314b72b476": "0fd2d790cc4b561a461712a73017b42c",
".git/objects/c4/dd984f88f7ebc199bb524f8a453f17e278c5d9": "384c234614fc2c5f1ca411c66341716c",
".git/objects/cc/5725b315760d100f6386e6bbf09af8fe57a9f1": "29c19352d2bee0821600856656c95791",
".git/objects/cd/22076013ce8b84475eae9bb4cd6c60b5460fbe": "81c620e2d6cbe5638d6c90ee25886389",
".git/objects/d1/8bd5e54c2b70aa66b1ae23b6faf559275e21f0": "0dc3978330f9857d1d5b2d1ec5b02649",
".git/objects/de/28db843d7df6ed23b8a7526f6b6b4a83425fe7": "797e4f7b3d8dced098c51679ff33e848",
".git/objects/e0/2012ca0a73da86edd7614aebdc24f350669305": "4cb516f7f367eb8387729d8cfc7cf9b2",
".git/objects/e3/f5f0f1986582622cff160ae7c6996f9df336c2": "ec057466f1a7ce20c1d935989fe216b1",
".git/objects/e5/951dfb943474a56e611d9923405cd06c2dd28d": "c6fa51103d8db5478e1a43a661f6c68d",
".git/objects/ec/6d2324b815c94157ee43fa6e8ad73f902f9190": "2f3f523336fa6ac1ef225928d662b100",
".git/objects/ed/b8767b3a6af62dcce426a05f319f45ea22e950": "0c7a24aa2d8acfe7b09abdb4f12225e9",
".git/objects/ed/faa51225fc2dfd97c35f30319f090aa09bc9ac": "7949d70074cc1c9f0899c7a3736b9d31",
".git/objects/ef/0ab6d41a481dcbaddf6c08f67973e0469805db": "fdace454cd5b928e1e103ce15e6d0382",
".git/objects/f0/68d4d068c705decb528218cfffe6da0d1434c3": "a47c058321e3fe610d15d36cb8cb7533",
".git/objects/f8/9fc9f854f31dfa1481d31d1b19c25816da4947": "6e21873c815076cd177381687146928c",
".git/objects/fd/c19f17f261cb6dfaf3c968250b90ee71c942b2": "345fd369b062b7fe3a11be4872fdae87",
".git/refs/heads/master": "ef5a5ba8ad36db70f09b40c6e0bc65b9",
".git/refs/remotes/origin/master": "ef5a5ba8ad36db70f09b40c6e0bc65b9",
"assets/AssetManifest.json": "eb983f926acf00daed2db6407845722c",
"assets/assets/behance.png": "1b152634b9b39b4bfbff871ba2b89ccb",
"assets/assets/github.png": "29a80be91ff5b5a0c9ce641a9252f99b",
"assets/assets/I.png": "7c13ea502767dce02f57e5d933f0d051",
"assets/assets/instagram.png": "5f551eea9af5fbd73bb77257a2b64794",
"assets/assets/Ishitalogo.png": "ead51dda0718839f6d0858e62fe49bfe",
"assets/assets/linkedin.png": "42218c805f5d0f11e18f30e4fda9635b",
"assets/assets/twitter.png": "6868fb4acbe5d83061568c9627d6609b",
"assets/assets/youtube.png": "95f33eeff9953f218c49f404f9be3df5",
"assets/FontManifest.json": "5ff6b96e4f3ad363cb0eebc91a78a04a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/lib/fonts/Calibre-Light.ttf": "73b7f4385ae2f8028e1b365a48038582",
"assets/lib/fonts/Calibre-Medium.ttf": "88178c3f2a309ad11520ee62765072d0",
"assets/lib/fonts/Calibre-Regular.ttf": "96e0a7c47fdd7a8f05007837ead73b35",
"assets/lib/fonts/Calibre-Semibold.ttf": "8325d174436d55e995c7214faafcd47b",
"assets/lib/fonts/SFMono-Medium.ttf": "02bbb63875ebdbf463e764bb3d8ff190",
"assets/lib/fonts/SFMono-Regular.ttf": "d892da9f8895428033ec68a6c0426ba6",
"assets/lib/fonts/SFMono-Semibold.ttf": "8282ed99a84b8e9c803baf3df5b76c01",
"assets/NOTICES": "67859abd3ee7252e476f66b2702cea06",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4e20cb87b0d43808c49449ffd69b1a74",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "1f7cb220b3f5309130bd6d9ad87e0fc0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "26f5af2d93473531f82ef5060f9c6d45",
"assets/shaders/ink_sparkle.frag": "a4501322d7a220bf334589921e0c2ec7",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "aef14f43924cf084eccc026e75182703",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "a06cc6bf42c4fc7c0362f17551499f97",
"icons/Icon-512.png": "c512ed8b1542bb58b23d687da43b0b23",
"icons/Icon-maskable-192.png": "a06cc6bf42c4fc7c0362f17551499f97",
"icons/Icon-maskable-512.png": "c512ed8b1542bb58b23d687da43b0b23",
"index.html": "58bfe947f2de12b3b04e62ab3222a0fe",
"/": "58bfe947f2de12b3b04e62ab3222a0fe",
"main.dart.js": "a8e00d4ded402744ba22fd442540bfb0",
"manifest.json": "fe1d0e068e7768d59d3bdd44560f1161",
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
