// Firebase dice que solo instales lo que necesitas
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


// Initialize Firebase
let config = {
    apiKey: "AIzaSyCGN8a9Yaw3GL1Bj1YmPrHTrsRJMRBmIXs",
    authDomain: "fir-hub-3a019.firebaseapp.com",
    databaseURL: "https://fir-hub-3a019.firebaseio.com",
    projectId: "fir-hub-3a019",
    storageBucket: "fir-hub-3a019.appspot.com",
    messagingSenderId: "765151449645"
};
firebase.initializeApp(config);

let firestore = firebase.firestore()
let charRef = firestore.collection('characters')

//storage folder
let charFolder = firebase.storage().ref('characters')

export default firebase

// subir imagen

export function uploadImage(file) {
    return charFolder.child(file.name).put(file)
        .then(res => res.ref.getDownloadURL())
        .then(link => link)
}

// get
export function getImages() {
    return charRef.get()
        .then(snap => {
            let images = []
            snap.docs.forEach(s => {
                images.push(s.data())
            })
            return images
        })
}

// post
export function saveImage(item) {
    let id = charRef.doc().id
    console.log(id)
    item.id = id
    return charRef.doc(id).set(item)
}