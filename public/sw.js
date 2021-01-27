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
        caches.open('static').then(cache => {
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