import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp9KMEmeYz-RnY45NlSFZ5Papu4cBcD2w",
  authDomain: "smartindiahackathon-72241.firebaseapp.com",
  databaseURL: "https://smartindiahackathon-72241-default-rtdb.firebaseio.com",
  projectId: "smartindiahackathon-72241",
  storageBucket: "smartindiahackathon-72241.appspot.com",
  messagingSenderId: "813233803884",
  appId: "1:813233803884:web:57df3c5ed84ca4b8cabe49",
  measurementId: "G-91XERGXZ0E"
  };

  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);
const flowRate = ref(database, 'Flowrate');
const Total_Consumption = ref(database, 'Total Consumption');
const current = ref(database, 'Current');
//const FirebaseRef4 = ref(database, 'Incoming Water');
//const FirebaseRef5 = ref(database, 'WaterLevel');
//console.log("hello ",FirebaseRef1)

export {
  flowRate,
  Total_Consumption,
  current
}
