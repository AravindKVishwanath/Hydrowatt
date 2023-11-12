import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import "firebase/firestore";
import "firebase/auth";
import { initializeAuth, getReactNativePersistence ,getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
  const auth = getAuth(app);

  const database = getDatabase(app);
const FirebaseRef1 = ref(database, 'Consumption');
const FirebaseRef2 = ref(database, 'Current');
const FirebaseRef3 = ref(database, 'Volts');
const FirebaseRef4 = ref(database, 'Incoming Water');
const FirebaseRef5 = ref(database, 'WaterLevel');

export {
  auth,
  FirebaseRef1,
  FirebaseRef2,
  FirebaseRef3,
  FirebaseRef4,
  FirebaseRef5,
}
