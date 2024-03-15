importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics-compat.js');
  
const firebaseConfig = {
  apiKey: "AIzaSyCyrO5kPgtWuMToM4d259K1rucOAqikGpc",
  authDomain: "qroadvisor-6db9f.firebaseapp.com",
  projectId: "qroadvisor-6db9f",
  storageBucket: "qroadvisor-6db9f.appspot.com",
  messagingSenderId: "927752481048",
  appId: "1:927752481048:web:9788a5fa8b72cfbd76166d",
  measurementId: "G-N97FKDWLYG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {

  console.log('Recibiendo mensaje en segundo plano')
  
  const tituloNotificacion = payload.notification.title;
  
  const options = {
  
  body: payload.notification.body,
  icon: '../public/img/captura.jpg',
  }
  self.registration.showNotification(tituloNotificacion, options)
})


