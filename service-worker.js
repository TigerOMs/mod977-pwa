const CACHE_NAME = 'mod977-cache-v1';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/your-css-file.css',
  '/your-js-file.js',
  // Bạn có thể thêm các link quan trọng khác ở đây
];

// Khi cài service worker lần đầu tiên
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Đang cài đặt...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Đã cache các tài nguyên');
        return cache.addAll(urlsToCache);
      })
  );
});

// Khi có request mới
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Nếu đã cache, trả cache
        if (response) {
          return response;
        }
        // Nếu chưa cache, fetch từ server
        return fetch(event.request);
      })
  );
});

// Khi có bản cập nhật mới
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Đang activate...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== CACHE_NAME) {
            console.log('[Service Worker] Xóa cache cũ:', thisCacheName);
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});
