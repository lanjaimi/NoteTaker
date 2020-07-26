import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBRJSsTwWsXYLGBoZ32lXu9us94CUbievA',
  authDomain: 'mydoodle-a7110.firebaseapp.com',
  databaseURL: 'https://mydoodle-a7110.firebaseio.com',
  projectId: 'mydoodle-a7110',
  storageBucket: 'mydoodle-a7110.appspot.com',
  messagingSenderId: '156125691902',
  appId: '1:156125691902:web:0621d1ad6c7caba1750aaf',
};

const myDB = firebase.initializeApp(firebaseConfig);

export default myDB;
