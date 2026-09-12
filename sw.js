const CACHE = 'league-music-v1'
const ASSETS = ['./', './index.html', './musics.json', './styles/global.css', './scripts/index.js', './assets/logo.png']
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))))
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))))
