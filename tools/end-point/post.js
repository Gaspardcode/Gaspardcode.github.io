const firebaseConfig = {
    apiKey: "AIzaSyCFu-Dh9zwypzRBa9JBipmrJSDmGBoPfxs",
    authDomain: "website-8c2a3.firebaseapp.com",
    projectId: "website-8c2a3",
    storageBucket: "website-8c2a3.appspot.com",
    messagingSenderId: "648151795084",
    appId: "1:648151795084:web:bfa39fa89ba558deb8c2a9",
    measurementId: "G-VN0F5R528E"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

self.addEventListener('fetch', async (event) => {
    if (event.request.method === 'POST') {
        try {
            const data = await event.request.json();

            // Save to Firestore
            await db.collection('end-point').add(data);

         event.respondWith(new 
         Response('Data saved successfully', { status: 200 }));
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            event.respondWith(new Response('Error saving data', { status: 500 }));
        }
    }
});
