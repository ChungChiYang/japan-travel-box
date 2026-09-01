const CACHE_NAME = 'japan-travel-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './handbook.html',
  './database.html',
  './communication.html'
  './calculator.html' //
];

// 安裝 Service Worker 並快取所有頁面
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 攔截網路請求，若無網路則從快取讀取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
