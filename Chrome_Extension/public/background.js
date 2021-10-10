// 'use strict';

//firebase.initializeApp(firebaseConfig);
/* global chrome ClipManager */
import { getFirestore, collection, addDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js'

let ref = "";


let persistData = async(data) => {
    try {
        const docRef = await addDoc(collection(db, "clipboard"), {
            clipData: data,
        });
        console.log("Document written with ID: ", docRef.id);
        ref = docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const firebaseApp = initializeApp({
    // TBU
});

const db = getFirestore();

chrome.runtime.onInstalled.addListener(async function() {
    setInterval(async function() {
        const clip = ClipManager.readTextClassic();
        chrome.runtime.sendMessage({
            msg: "clipboardData",
            data: clip
        });
        console.log("CLIP ****** ", clip);

        //  To do something
        console.log(clip);
        if (ref === "") {
            persistData(clip);
        } else {
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                if (docSnap.data().clipData !== clip) {
                    persistData(clip);
                }
            } else {
                console.log("No such document!");
            }
        }

    }, 1000);
});