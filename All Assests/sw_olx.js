
const cacheName = 'olx-shary-app';
const staticAssets = [
        './',
        './index.html',
        './scripts/index.js',
        './pages/logIn.html',
        './pages/signUp.html',
        './pages/viewItemDetails.html',
        './scripts/viewItemDetails.js',
        './pages/addToWishList.html',
        './scripts/addToWishList.js',
        './pages/createNewAdd.html',
        './scripts/createNewAdd.js',
        './pages/showCatsItems.html',
        './scripts/showCatsItems.js',
        './styleSheets/index.css',
        './styleSheets/signLog.css',
        './styleSheets/viewItemDetails.css',
        './icon/Icon.png',
        './icon/home.PNG',

]


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(staticAssets);
        })
      );
})
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}




/* ======================== PUSH NOTIFICATION ======================== */
/* ============================== START ============================== */

// importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
// importScripts('/__/firebase/init.js');
// firebase.initializeApp({
//     messagingSenderId: "110049738985"
// });

// messagingSenderId.
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();


/* ======================== PUSH NOTIFICATION ======================== */
/* =============================== END =============================== */


