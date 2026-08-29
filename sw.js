// هر بار کدی تغییر دادید نسخه را یک عدد بالا ببرید (v1 -> v2 -> v3)
const CACHE_NAME = 'fuzzy-app-v2';

const urlsToCache = [
  './index.html',
  './manifest.json'
];

// نصب و جایگزینی سریع سرویس ورکر جدید
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// پاک کردن کش‌های قدیمی
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
