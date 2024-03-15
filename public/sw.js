importScripts('https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js')
importScripts('js/sw-utils.js')

//importScripts('./firebase-messaging-sw.js')

//Crear las variables de cache
const CACHE_DYNAMIC = 'dynamic-v1' //Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v3'    //App shell
const CACHE_INMUTABLE = 'inmutable-v1'// librerias 


const CACHE_DYNAMIC_LIMIT = 50
//Funcion para limpiar el cache
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })

}
self.addEventListener('install', event => {

    const cahePromise = caches.open(CACHE_STATIC).then(function (cache)  {

        return cache.addAll([

            '/',
            '/index.html',
            '/assets/index-DqfkWRLQ.js',
            '/assets/index-HeeXXGra.css',
            '/sw.js',
            '/js/sw-utils.js',
            '/js/sw-bd',
            '/js/app.js',
            'vite.svg',
            'manifest.json',
        ])
    })
    const caheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {

        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto:wght@100&display=swap',
            'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
            //'https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js',
            //'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics-compat.js',

        ])
    })
    event.waitUntil(Promise.all([cahePromise, caheInmutable]))
})

//Proceso de activacion
self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE_STATIC && key.includes('static')) {
                return caches.delete(key)
            }
            if (key !== CACHE_DYNAMIC && key.includes('dynamic')) {
                return caches.delete(key)
            }
        })
    })
    event.waitUntil(respuesta)
})

self.addEventListener('fetch', event => {
    
    let respuesta;
    if ( event.request.url.includes('http://localhost:3001/api/note') ) {
        respuesta = manejoApiNotas(CACHE_DYNAMIC, event.request);
    } else {
        //Cache with network fallback optimizado
        respuesta = caches.match(event.request).then(res => {
            //si existe en cache lo regresa
            if (res) {
                
                actualizaCacheStatico(CACHE_STATIC, event.request, CACHE_INMUTABLE);

                return res;
            } else {
                
                return fetch(event.request).then(newRes => {
                    return actualizaCacheDinamico(CACHE_DYNAMIC, event.request,newRes);
       
                });
            }
        });
    }

    event.respondWith(respuesta)
})

//Tareas asincronas
self.addEventListener('sync', event => {
    console.log('SW:sync');
    if ( event.tag === 'nuevo-post' ) {
        const respuesta = postearNotas();
        event.waitUntil(respuesta);
    }
})