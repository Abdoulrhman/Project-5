
/*
|--------------------------------------------------------------------------
| The Install Event
|--------------------------------------------------------------------------
|
| It's triggered as soon as the worker executes
| and it's only called once per service worker
|
*/
var CacheName = 'restaurant-cache';
var urlsToCache = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CacheName)
            .then(function (cache) {
                console.log('The Cache Now Opened');
                return cache.addAll(urlsToCache);
            })
    );
});





/*
|--------------------------------------------------------------------------
| The Activate Event
|--------------------------------------------------------------------------
|
| Once your service worker is ready to control clients and handle
| functional events like push and sync,you'll get an activate event.
*/


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});


/*
|--------------------------------------------------------------------------
| The Fetch Event
|--------------------------------------------------------------------------
|
| the event which fetches the request from the cache ,
| and if it not exist will take it from the original request
*/

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});