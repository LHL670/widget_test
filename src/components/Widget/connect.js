import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBGLQmN66v9ucTjXgctvmzqHC8H85ez_KE",
    authDomain: "cgusholar.firebaseapp.com",
    projectId: "cgusholar",
    storageBucket: "cgusholar.appspot.com",
    messagingSenderId: "436011084647",
    appId: "1:436011084647:web:250d127f195857a4af1dc2",
    measurementId: "G-H1WFVTFTC0"
};
    
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
//console.log(db);

            
/*db.collection('cguscholar').where('id','==','faE3_ksAAAAJ').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        //console.log(doc.data());
        document=doc;
    });
});*/

export default db;