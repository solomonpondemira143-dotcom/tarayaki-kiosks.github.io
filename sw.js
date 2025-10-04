    const CACHE_NAME = 'tarayaki-kiosk-v1';
    const urlsToCache = [
      './tarayaki-kiosk.html',
      'https://cdn.tailwindcss.com',
      'https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      'https://cdn.jsdelivr.net/npm/vanilla-js-calendar@1.2.0/build/vanilla-js-calendar.min.css',
      'https://cdn.jsdelivr.net/npm/vanilla-js-calendar@1.2.0/build/vanilla-js-calendar.min.js',
      'https://assets.mixkit.co/sfx/preview/mixkit-clear-interface-bell-461.mp3'
    ];
    
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache and caching essential assets');
            return cache.addAll(urlsToCache);
          })
      );
    });
    
    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            // Cache hit - return response
            if (response) {
              return response;
            }
            // Not in cache - fetch from network
            return fetch(event.request);
          }
        )
      );
    });
    

