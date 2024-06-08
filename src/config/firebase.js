// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export function firebaseInt() {
  const firebaseConfig = {
    apiKey: 'AIzaSyAMlamLSbrDZMfeZ4xDfDfvvQHrXChGQSE',
    authDomain: 'app-koru.firebaseapp.com',
    projectId: 'app-koru',
    storageBucket: 'app-koru.appspot.com',
    messagingSenderId: '240303417311',
    appId: '1:240303417311:web:d5b12d6afd9623932f066a',
    measurementId: 'G-TDTRN0MQ87',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
