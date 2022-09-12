import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../Firebase';
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

import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';

import playerSelectionHandler from '../helper/playerSelection';

import ModalPrompt from './ModalPrompt';
import ModalStart from './ModalStart';
import { Link } from 'react-router-dom';

function Gameboard() {
	const [ id, setId ] = useState('');
	const [ items, setItems ] = useState([]);
	const level = useLocation();

	const playerSelection = async (coord1, coord2, id) => {
		await addDoc(collection(db, 'player-selection'), playerCoords(coord1, coord2, id));
	};

	const addPlayer = async (id) => {
		await addDoc(collection(db, 'player'), { id, timestamp: serverTimestamp() });
	};

	const createPlayerFoundList = async (item) => {
		await addDoc(collection(db, 'items-found'), { item, id, timestamp: serverTimestamp() });
	};

	const playerLeaderBoard = async (time, name, level) => {
		await addDoc(collection(db, 'leaderboard'), { name, time, level });
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setId(user.uid);
				addPlayer(uid);
				console.log(uid);
				console.log(id)
				document.querySelector('.modal-container').classList.add('modal-container-hide');
				document.querySelector('.logOutBtn').style.display = 'block';
			} else {
				// User is signed out
				console.log('signed out');

				document.querySelector('.modal-container').classList.remove('modal-container-hide');
				document.querySelector('.logOutBtn').style.display = 'none';
				setId();
				
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
		console.log(e);
		const placeDivX = e.pageX;
		const placeDivY = e.pageY;
		const coordX = Math.round(e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth * 100);
		const coordY = Math.round(e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight * 100);
		console.log('X:' + coordX);
		console.log('Y:' + coordY);
		console.log(items);

		div.style.left = placeDivX + "px";
		div.style.top = placeDivY + "px";

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
				(item) => playerSelectionHandler(coordX, item.coordX) && playerSelectionHandler(coordY, item.coordY)
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

	const updateTime = async () => { 
		const itemRef = collection(db, 'player');
		const queryRef = query(itemRef, where('id', '==', id));
		const data = await getDocs(queryRef);
		const getData = data.docs.map((doc) => (doc = doc.id)).join();
		console.log(getData);
		const updateRef = doc(db, 'player', getData);
		const getItem = await updateDoc(updateRef, {
			timestamp: serverTimestamp()
		});
	}

	const deletePlayerCoord = async () => {
		const coordRef = collection(db, 'player-selection');
		const queryRef = query(coordRef, where('playerId', '==', id));

		const data = await getDocs(queryRef);

		const docId = data.docs.map((doc) => (doc = doc.id));

		for (const docs of docId) {
			await deleteDoc(doc(db, 'player-selection', docs));
		}
	};

	const deletePlayerFound = async () => { 
		const coordRef = collection(db, 'items-found');
		const queryRef = query(coordRef, where('id', '==', id));

		const data = await getDocs(queryRef);

		const docId = data.docs.map((doc) => (doc = doc.id));

		for (const docs of docId) {
			await deleteDoc(doc(db, 'items-found', docs));
		}
	}

	
	const deletePlayerTime = async () => {
		if(id) { 
		const coordRef = collection(db, 'player');
		const queryRef = query(coordRef, where('id', '==', id));

		const data = await getDocs(queryRef);

		const docId = data.docs.map((doc) => (doc = doc.id));

		for (const docs of docId) {
			await deleteDoc(doc(db, 'player', docs));
		} 
	}
	console.log('not logged')
	}

	const isGameOver = async (id) => {
		const arr = ['Luigi',  'Ezio(AC)' , 'Pikachu', 'Destiny(Ghost)', 'The Witcher']

		const data = query(collection(db, 'items-found'), where('id', '==', id));
		const queryData = await getDocs(data);

		const data2 = query(collection(db, 'player'), where('id', '==', id));
		const queryData2 = await getDocs(data2);

		const getData = queryData.docs.map((doc) => doc.data().item);

		const data3 = query(collection(db, 'playerName'), where('id', '==', id));
		const queryData3 = await getDocs(data3);

		const getStartTime = queryData2.docs.map((doc) => doc.data().timestamp);

		const getName = queryData3.docs.map((doc) => doc.data().name);

		const getEndTime = queryData.docs.map((doc) => doc.data().timestamp);

		const checkMedium = getData.includes('microwave' && 'toaster');
		const checkHard = getData.includes('Waldo');
		const checkEasy = arr.every(value => { 
			return getData.includes(value);
		});
		console.log(getData);
		

		if (checkEasy || checkMedium || checkHard) {

			
			const time = (getEndTime[0].toMillis() - getStartTime[0].toMillis()) / 1000;

			deletePlayerFound();
			
			console.log(time);
			console.log(level)
			await playerLeaderBoard(time, getName, level.state.level);

			return console.log('game won');
		} 

		

		return;
	};

	return (
		<div className="gameboard-container">
			<ModalStart />
			<div>
				<img
					className={`${level.state.level}`}
					onClick={onClick}
					src={require(`../images/background${level.state.level}.jpg`)}
					alt="game"
				/>
				<div className="clickable-div">
					{items.filter(item => item.level === level.state.level).map((item, i) => {
						return (
							<p onClick={checkClick} key={i} className="list">
								{item.item}
							</p>
						);
					})}
				</div>
			</div>
			<Link to="/">
				<button onClick={deletePlayerTime} className="return">Return</button>
			</Link>
		</div>
	);
}

export default Gameboard;
