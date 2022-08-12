import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ModalStart from './components/ModalStart';

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

	const onClick = (e) => {
		const coordX = e.nativeEvent.offsetX;
		const coordY = e.nativeEvent.offsetY;
		console.log('X:' + e.clientX);
		console.log('Y:' + e.clientY);

		document.querySelector('.clickable-div').style.setProperty('--x', e.clientX + 'px');
		document.querySelector('.clickable-div').style.setProperty('--y', e.clientY + 'px');

		if (auth.currentUser) {
			playerSelection(coordX, coordY, id);
		} else {
			alert('Please log in. Thank you.');
		}
	};

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
