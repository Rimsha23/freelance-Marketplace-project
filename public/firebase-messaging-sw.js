importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyADPFXBfxiuwJK2HPxbZdr5rU3E8MaQndQ",
    authDomain: "freelance-mark.firebaseapp.com",
    databaseURL: "https://freelance-mark-default-rtdb.firebaseio.com",
    projectId: "freelance-mark",
    storageBucket: "freelance-mark.appspot.com",
    messagingSenderId: "295742793065",
    appId: "1:295742793065:web:4e2dac1da23bff1beb09f8",
    measurementId: "G-V8LDD3KK5B"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
