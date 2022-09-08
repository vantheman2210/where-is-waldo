import './App.css';
import Header from './components/Header';

import ModalStart from './components/ModalStart';

import Leaderboard from './components/Leaderboard';

import Gameboard from './components/Gameboard';

import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';


function App() {
	return (
		<div className="app-container">
			<Header />
			 

			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/leaderboard" element={<Leaderboard />} />
				<Route exact path="/gameboard" element={<Gameboard />} />
			</Routes>
		</div>
	);
}

export default App;


//<ModalStart />
/*
	import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import {
	collection,
	addDoc,
	getDocs,
	where,
	doc,
	updateDoc,
	query,
	deleteDoc,
	serverTimestamp
} from 'firebase/firestore';

import { auth, user } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';
import playerSelectionHandler from './helper/playerSelection';
import Leaderboard from './components/Leaderboard';
import { Route, Routes } from 'react-router-dom';

function App() {
	const [ id, setId ] = useState();
	const [ items, setItems ] = useState([]);

	const playerSelection = async (coord1, coord2, id) => {
		await addDoc(collection(db, 'player-selection'), playerCoords(coord1, coord2, id));
	};

	const addPlayer = async (id) => {
		await addDoc(collection(db, 'player'), { id, timestamp: serverTimestamp() });
	};

	const createPlayerFoundList = async (item) => {
		await addDoc(collection(db, 'items-found'), { item, id, timestamp: serverTimestamp() });
	};

	const playerLeaderBoard = async (time) => {
		await addDoc(collection(db, 'leaderboard'), { id, time });
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setId(uid);
				addPlayer(uid);
				console.log(uid);
				document.querySelector('.modal-container').classList.add('modal-container-hide');
			} else {
				// User is signed out
				console.log('signed out');

				document.querySelector('.modal-container').classList.remove('modal-container-hide');
				setId();
				return;
			}
		});
		return unsubscribe;
	}, []);

	const playerCoords = (coord1, coord2, id) => {
		return {
			playerId: id,
			coordX: coord1,
			coordY: coord2
		};
	};

	const onClick = async (e) => {
		const div = document.querySelector('.clickable-div');

		const coordX = e.pageX;
		const coordY = e.pageY;
		console.log('X:' + coordX);
		console.log('Y:' + coordY);
		console.log(items);

		div.style.left = coordX + 'px';
		div.style.top = coordY + 'px';

		/*
			div.style.left = coordX - div.offsetWidth / 2 + 'px';
		div.style.top = coordY - div.offsetHeight / 2 + 'px';
		*/
/*
		if (auth.currentUser) {
			playerSelection(coordX, coordY, id);
			setItems(await getItemCoords());
		} else {
			console.log('not logged in');
		}
	};

	const checkSelection = async (coordX, coordY, itemDrop) => {
		if (auth.currentUser) {
			const checkData = await getItemCoords();

			const isItemFound = checkData.some(
				(item) => playerSelectionHandler(coordX, item.coordX) || playerSelectionHandler(coordY, item.coordY)
			);
			console.log(isItemFound, checkData);
			if (!isItemFound) {
				console.log('not found');
				await deletePlayerCoord();
				return;
			}
			console.log('item found');
			console.log(itemDrop);
			createPlayerFoundList(itemDrop);
			await deletePlayerCoord();
			updateItemFound(itemDrop);
			await isGameOver(id);
		} else {
			console.log('Please log in. Thank you.');
		}
	};

	const checkClick = async (e) => {
		const item = e.target.textContent;
		const coord = await getPlayerCoords();
		console.log(coord);
		console.log(item);
		checkSelection(coord[0].coordX, coord[0].coordY, item);
	};

	const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'items'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

	const getPlayerCoords = async () => {
		const coordRef = collection(db, 'player-selection');
		const queryRef = query(coordRef, where('playerId', '==', id));

		const data = await getDocs(queryRef);

		const coords = data.docs.map((doc) => (doc = doc.data()));

		return coords;
	};

	const updateItemFound = async (item) => {
		const itemRef = collection(db, 'items');
		const queryRef = query(itemRef, where('item', '==', item));
		const data = await getDocs(queryRef);
		const getData = data.docs.map((doc) => (doc = doc.id)).join();
		console.log(getData);
		const updateRef = doc(db, 'items', getData);
		const getItem = await updateDoc(updateRef, {
			found: true
		});
	};

	const deletePlayerCoord = async () => {
		const coordRef = collection(db, 'player-selection');
		const queryRef = query(coordRef, where('playerId', '==', id));

		const data = await getDocs(queryRef);

		const docId = data.docs.map((doc) => (doc = doc.id));

		for (const docs of docId) {
			await deleteDoc(doc(db, 'player-selection', docs));
		}
	};

	const isGameOver = async (id) => {
		const data = query(collection(db, 'items-found'), where('id', '==', id));
		const queryData = await getDocs(data);

		const data2 = query(collection(db, 'player'), where('id', '==', id));
		const queryData2 = await getDocs(data2);

		const getData = queryData.docs.map((doc) => doc.data().item);

		const getStartTime = queryData2.docs.map((doc) => doc.data().timestamp);

		const getEndTime = queryData.docs.map((doc) => doc.data().timestamp);

		const check = getData.includes('microwave' && 'toaster');
		console.log(getData)
		
		if (check) {
			console.log(getStartTime[0].toDate())
			console.log(getEndTime[0].toDate())
			console.log(getEndTime[1].toDate())
			const time = (getEndTime[0].toMillis() - getStartTime[0].toMillis()) / 1000;
			console.log((getEndTime[1].toMillis() - getStartTime[0].toMillis()) / 1000);
			console.log(time);

			await playerLeaderBoard(time);

			return console.log('game won');
		}

		return;
	};

	return (
		<div className="app-container">
			<Header />
			<div>
				<img className="photo" onClick={onClick} src={require('./images/background.png')} alt="game" />
				<div className="clickable-div">
					{items.map((item, i) => {
						return (
							<p onClick={checkClick} key={i}>
								{item.item}
							</p>
						);
					})}
				</div>
			</div>
			<ModalStart />
		</div>
	);
}
 */

/*
	import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import {
	collection,
	addDoc,
	getDocs,
	where,
	doc,
	updateDoc,
	query,
	deleteDoc,
	serverTimestamp
} from 'firebase/firestore';

import { auth, user } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';
import playerSelectionHandler from './helper/playerSelection';
import Leaderboard from './components/Leaderboard';
import Gameboard from './components/Gameboard';
import { Route, Routes } from 'react-router-dom';
 */
