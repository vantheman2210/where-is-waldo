import React from "react"; 
import {auth} from "../Firebase";
import {signInWithPopup, GoogleAuthProvider, signInAnonymously, onAuthStateChanged, setPersistence, inMemoryPersistence} from "firebase/auth";

const ModalStart = () => { 
  const provider = new GoogleAuthProvider();

  const signIn = () => { 
    signInWithPopup(auth, provider)
    .then((result) => { 
      const credential = GoogleAuthProvider.credentialFromResult(result); 
      const token = credential.accessToken;

      const user = result.user
    }).catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message)
      // ...
    });
  }

  const anonymousSignIn = () => { 
    signInAnonymously(auth)
    .then(() => { 
      console.log('signed in')
    })
    .catch((error) => { 
      console.log(error.code, error.message)
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user.uid)
      // ...
    } else {
      // User is signed out
      console.log('signed out')
    }
  });

  setPersistence(auth, inMemoryPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return ( 
    <div className="modal-container">
      <button onClick={signIn}>Log In</button> 
      <button onClick={anonymousSignIn}>Anonymous</button>
    </div>
  )
}

export default ModalStart;