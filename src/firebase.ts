import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBpeYVql9Vp_7ZmvuhZz_MHMpR1leXxm5M",
  authDomain: "reactcrud-479e3.firebaseapp.com",
  databaseURL: "https://reactcrud-479e3.firebaseio.com",
  projectId: "reactcrud-479e3",
  storageBucket: "reactcrud-479e3.appspot.com",
  messagingSenderId: "70973132915",
  appId: "1:70973132915:web:a5e55509ea08737d901a06",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
