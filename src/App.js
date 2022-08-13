import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, addDoc, getDocs, where, getDoc, doc, updateDoc, query, deleteDoc } from 'firebase/firestore';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';
import playerSelectionHandler from './helper/playerSelection';

function App() {
	const [ id, setId ] = useState();
	const [ items, setItems ] = useState([]);

	useEffect(
		() => {
			console.log(items);
		},
		[ items ]
	);

	const playerSelection = async (coord1, coord2, id) => {
		await addDoc(collection(db, 'player-selection'), playerCoords(coord1, coord2, id));
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			setId(uid);
		} else {
			// User is signed out
			setId();
			console.log('signed out');
		}
	});

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
		console.log(items)

		div.style.left = coordX + 'px';
		div.style.top = coordY + 'px';

		/*
			div.style.left = coordX - div.offsetWidth / 2 + 'px';
		div.style.top = coordY - div.offsetHeight / 2 + 'px';
		*/

		if (auth.currentUser) {
			playerSelection(coordX, coordY, id);
			setItems(await getItemCoords());
			
		} else {
			console.log('not logged in')
		}
	};

	const checkSelection = async (coordX, coordY, itemDrop) => {
		if (auth.currentUser) {
			
			const checkData = await getItemCoords();
			
			const isItemFound = checkData.some(
				(item) => playerSelectionHandler(coordX, item.coordX) || playerSelectionHandler(coordY, item.coordY)
			);

			if (!isItemFound) {
				console.log('not found');
				 await deletePlayerCoord();
				return;
			} 
			console.log('item found');
			updateItemFound(itemDrop)

		} else {
			console.log('Please log in. Thank you.');
		}
	};

	const checkClick = async (e) => { 
		const item = e.target.textContent;
		const coord = await getPlayerCoords();
		console.log(coord)
		checkSelection(coord[0].coordX, coord[0].coordY, item);
	}

	const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'items'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

	const getPlayerCoords = async () => { 
		const coordRef = collection(db, "player-selection"); 
		const queryRef = query(coordRef, where("playerId", "==", id));

		const data = await getDocs(queryRef);

		const coords = data.docs.map(doc => doc = doc.data());
		
		return coords;
		
	}

	const updateItemFound = async (item) => {
		
		const itemRef = collection(db, "items"); 
		const queryRef = query(itemRef, where("item", "==", item));
		const data = await getDocs(queryRef);
		const getData = data.docs.map(doc => doc = doc.id).join()
		console.log(getData)
		const updateRef = doc(db, "items", getData)
		const getItem = await updateDoc(updateRef, {
			found: true
		});

	};

	const deletePlayerCoord = async () => { 
		const coordRef = collection(db, "player-selection"); 
		const queryRef = query(coordRef, where("playerId", "==", id));

		const data = await getDocs(queryRef);

		const docId = data.docs.map(doc => doc = doc.id);

		for(const docs of  docId) { 
			await deleteDoc(doc(db, "player-selection", docs));
		}
	};

	return (
		<div className="app-container">
			<Header />
			<div>
				<img className="photo" onClick={onClick} src={require('./images/background.png')} alt="game" />
				<div className="clickable-div">
					{items.map((item, i) => {
						return <p onClick={checkClick} key={i}>{item.item}</p>;
					})}
				</div>
			</div>
			<ModalStart />
		</div>
	);
}

export default App;

/*let zoom = 1;
  const ZOOM_SPEED = 0.1;

useEffect(() => { 
    document.querySelector('.photo').addEventListener('wheel', function(e) { 
      if(e.deltaY > 0) { 
        document.querySelector('.photo').style.transform = `scale(${zoom -= ZOOM_SPEED})`
      } else { 
        document.querySelector('.photo').style.transform = `scale(${zoom += ZOOM_SPEED})`
      }
    })
  }, [zoom])
	
	///////////////////////////

	import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, addDoc, getDocs, where, getDoc, doc, updateDoc } from 'firebase/firestore';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';
import playerSelectionHandler from './helper/playerSelection';

function App() {
	const [ id, setId ] = useState();
	const [ items, setItems ] = useState([]);

	useEffect(
		() => {
			console.log(items);
		},
		[ items ]
	);

	const playerSelection = async (coord1, coord2, id) => {
		await addDoc(collection(db, 'player-selection'), playerCoords(coord1, coord2, id));
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			setId(uid);
		} else {
			// User is signed out
			setId();
			console.log('signed out');
		}
	});

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
		console.log(e.target)

		div.style.left = coordX + 'px';
		div.style.top = coordY + 'px';

		/*
			div.style.left = coordX - div.offsetWidth / 2 + 'px';
		div.style.top = coordY - div.offsetHeight / 2 + 'px';
		

		await checkSelection(coordX, coordY);
	};

	const checkSelection = async (coordX, coordY) => {
		if (auth.currentUser) {
			playerSelection(coordX, coordY, id);
			const checkData = await getItemCoords();
			setItems(checkData);
			const isItemFound = checkData.some(
				(item) => playerSelectionHandler(coordX, item.coordX) || playerSelectionHandler(coordY, item.coordY)
			);

			if (isItemFound) {
				console.log('item found');
				updateItemFound();
			}
		} else {
			console.log('Please log in. Thank you.');
		}
	};

	const checkClick = async (e) => { 
		console.log(e.target)
	}

	const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'items'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

	const updateItemFound = async () => {
		const item = doc(db, 'items', 'tpOz48g6OyRIRyJcrwXu')
		const getItem = await updateDoc(item, {
			found: true
		});
		
	};

	return (
		<div className="app-container">
			<Header />
			<div>
				<img className="photo" onClick={onClick} src={require('./images/background.png')} alt="game" />
				<div className="clickable-div">
					{items.map((item, i) => {
						return <p onClick={checkClick} key={i}>{item.item}</p>;
					})}
				</div>
			</div>
			<ModalStart />
		</div>
	);
}

export default App;
	
	*/
