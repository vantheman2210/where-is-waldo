import './App.css';
import Header from './components/Header';
import { useEffect } from 'react';
import { db } from './Firebase';
import { collection, addDoc } from "firebase/firestore";
import ModalStart from './components/ModalStart';


const playerSelection = async (coord1, coord2) => { 
	 await addDoc(collection(db, 'player-selection'), (playerCoords(coord1, coord2)))
};

const playerCoords = (coord1, coord2) => { 
	return { 
		coordX: coord1, 
		coordY: coord2
	}
};

function App() {
	const onClick = (e) => {

		const coordX = e.nativeEvent.offsetX; 
		const coordY = e.nativeEvent.offsetY;
		console.log('X:' + e.clientX);
    console.log('Y:' +e.clientY);
		
		document.querySelector('.clickable-div').style.setProperty('--x', e.clientX + 'px');
		document.querySelector('.clickable-div').style.setProperty('--y', e.clientY + 'px');

		playerSelection(coordX, coordY)
		
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
			<ModalStart/>
		</div>
	);
}

export default App;
