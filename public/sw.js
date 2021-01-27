const cacheName = 'v1'
const assets = [
    "/",
    "/scss/style.css",
    "/js/index.js",
    "/images/icons/icon72x72.png",
    "/images/icons/icon128x128.png",
    "/images/icons/icon144x144.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})

self.addEventListener('activate', function (event) {
    var cacheKeeplist = ['cachename'];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});