if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
}

const isOnline = () => {
    if (navigator.onLine) {
        alert('¡Estás con conexion!');
    } else {
        alert('¡Estás sin conexion!');
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();