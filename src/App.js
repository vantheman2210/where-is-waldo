import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, addDoc, getDocs  } from 'firebase/firestore';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';
import playerSelectionHandler from './helper/playerSelection';


function App() {
	const [ id, setId ] = useState('');

	const playerSelection = async (coord1, coord2, id) => {
		await addDoc(collection(db, 'player-selection'), playerCoords(coord1, coord2, id));
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			setId(uid);
		} else {
			// User is signed out
			setId('');
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
		const coordX = e.clientX;
		const coordY = e.clientY;
		console.log('X:' + e.clientX);
		console.log('Y:' + e.clientY);

		div.style.left = coordX + 'px';
		div.style.top = coordY + 'px';

		/*
			div.style.left = coordX - div.offsetWidth / 2 + 'px';
		div.style.top = coordY - div.offsetHeight / 2 + 'px';
		*/

		if (auth.currentUser) {
			playerSelection(coordX, coordY, id);
			const checkData = await getItemCoords();
			 
			const isItemFound = checkData[0].some((char) => 
			return char
			)
			console.log(checkData[0].coordX)
			console.log(playerSelectionHandler(coordX, checkData[0].coordX)) 
			console.log(playerSelectionHandler(coordY, checkData[0].coordY))
		} else {
			//alert('Please log in. Thank you.');
		}
	};

	const getItemCoords = async () => { 
		const data = await getDocs(collection(db, "items"));
		const items = data.docs.map((doc) => doc = doc.data())
		return items;
	} 

	return (
		<div className="app-container">
			<Header />
			<img className="photo" onClick={onClick} src={require('./images/background.png')} alt="game" />
			<div className="clickable-div" />
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
  }, [zoom])*/
