import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc, where, query } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  import{
    signInWithEmailAndPassword,
    getAuth,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyDkC9_Ya3FhED9rbLmjHEdOXiv2pxJ41b0",
    authDomain: "attendance-app-a4129.firebaseapp.com",
    projectId: "attendance-app-a4129",
    storageBucket: "attendance-app-a4129.appspot.com",
    messagingSenderId: "232827962510",
    appId: "1:232827962510:web:60662f12065406e658b5df",
    measurementId: "G-V2FPNV65YT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app)
const storage = getStorage(app)

  function signinFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    
    

}



function keeploggined() {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          console.log("User is loggined");
          console.log(uid);

      } else {
          console.log("User is signed out");
      }
  });}


  function logoutFirebase() {
    auth.signOut();
    console.log('User signed out!')
};
async function uploadImage(image) {
  const storageRef = ref(storage, `images/${image.name}`)
  const snapshot = await uploadBytes(storageRef, image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}
async function registerstudent(student){
  
    return addDoc(collection(db, "students"), student,)

}

async function createclassroom(userinfo) {
  

  return addDoc(collection(db,'classes'),userinfo )
}



function getclasses(callback) {
  onSnapshot(collection(db, "users"), (querySnapshot) => {
      const users = []
      querySnapshot.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid) {
              users.push({ id: doc.id, ...doc.data() })
          }
      });
      showCurrentUserInfo(auth.currentUser.uid)

      callback(users)

  })

}


export{
  signinFirebase,
  logoutFirebase,
  keeploggined,
  uploadImage,
  registerstudent,
  createclassroom,
  auth,getclasses
}