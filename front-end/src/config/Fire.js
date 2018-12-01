import firebase from 'firebase';

// Initialize Firebase
const config = {
apiKey: "AIzaSyBi2ahgJAexxVqMjFjlDUSEP_RXqI5YA1M",
authDomain: "yhack2018-3420b.firebaseapp.com",
databaseURL: "https://yhack2018-3420b.firebaseio.com",
projectId: "yhack2018-3420b",
storageBucket: "yhack2018-3420b.appspot.com",
messagingSenderId: "51970578473"
};
const fire = firebase.initializeApp(config);
export default fire;