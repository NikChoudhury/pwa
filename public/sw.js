const staticCacheName = 'pw-v12.05'
const assets = [
    "/",
    "/scss/style.css",
    "/js/index.js",
    "/images/icons/icon72x72.png",
    "/images/icons/icon128x128.png",
    "/images/icons/icon144x144.png",
]

// install event
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    )
})

// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
    e.waitUntil(

        update(e.request)
    );
})

function update(request) {
    return caches.open(staticCacheName).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });
}







