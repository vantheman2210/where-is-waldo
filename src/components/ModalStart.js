import React, { useEffect, useState } from 'react';
import '../styles/ModalStart.css';
import { auth } from '../Firebase';
import {
	signInWithPopup,
	GoogleAuthProvider,
	signInAnonymously,
	onAuthStateChanged,
	setPersistence,
	inMemoryPersistence
} from 'firebase/auth';

import { collection, getDocs, where, doc, updateDoc, query } from 'firebase/firestore';
import { db } from '../Firebase';

const ModalStart = () => {
	const provider = new GoogleAuthProvider();
	const [ name, setName ] = useState('');

	const updateTime = async (id) => {
		const itemRef = collection(db, 'player');
		const queryRef = query(itemRef, where('id', '==', id));
		const data = await getDocs(queryRef);
		const getData = data.docs.map((doc) => (doc = doc.id)).join();

		const updateRef = doc(db, 'player', getData);
		const getItem = await updateDoc(updateRef, {
			name: name
		});
	};

	const signIn = () => {
		signInWithPopup(auth, provider)
			.then((user) => {
				updateTime(user.user.uid);
				console.log('signed in');
				setName('');
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	};

	const anonymousSignIn = () => {
		console.log(name.length);
		if (name.length !== 0)
			signInAnonymously(auth, name)
				.then((user) => {
					updateTime(user.user.uid);
					console.log('signed in');
					setName('');
				})
				.catch((error) => {
					console.log(error.code, error.message);
				});
		return;
	};

	setPersistence(auth, inMemoryPersistence).then(() => {}).catch((error) => {
		console.log(error.code, error.message);
	});

	const handleChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		document.querySelector('.formInput').value = '';
	};

	return (
		<div className="modal-container">
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={handleChange}
						placeholder="Please enter your name"
						className="formInput"
					/>
				</label>
				<input className="formSubmitBtn" type="submit" />
			</form>
			<button onClick={signIn}>Gmail</button>
			<button onClick={anonymousSignIn}>Anonymous Log In</button>
			<p className="instructions">
				Steps: <br></br>
				1: Submit your name. <br></br>
				2: Choose login option. <br></br>
				3. Have fun!
			</p>
		</div>
	);
};

export default ModalStart;

/* useEffect(() => { 
	const unsubscribe = 
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			
			console.log(user.uid);
			document.querySelector('.logOutBtn').style.display = 'block';
			
			// ...
		} else {
			// User is signed out
			console.log('signed out');
			document.querySelector('.logOutBtn').style.display = 'none';
			
		}
		return;
	})
	return unsubscribe;
}, [])*/
