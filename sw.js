const CACHE_NAME = 'japan-travel-v8';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './handbook.html',
  './database.html',
  './communication.html',
  './calculator.html'
];

// 1. 安裝 Service Worker 並快取所有頁面
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // 讓新 Service Worker 立即啟用
  self.skipWaiting();
});

// 2. 清理舊版快取（確保版本更新時自動刪除 v2 等舊資料）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. 攔截網路請求，若無網路則從快取讀取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
