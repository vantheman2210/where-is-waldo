import './App.css';
import Header from './components/Header';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCxWd8juDCrf7kv7hzfd4Cv_3f6v2txElQ',
	authDomain: 'waldo-app-34031.firebaseapp.com',
	projectId: 'waldo-app-34031',
	storageBucket: 'waldo-app-34031.appspot.com',
	messagingSenderId: '287421846194',
	appId: '1:287421846194:web:8472d8a06b2a2899552fab'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
	const onClick = (e) => {

		console.log('X:' + e.nativeEvent.offsetX);
    console.log('Y:' +e.nativeEvent.offsetY);
		
		document.querySelector('.clickable-div').style.setProperty('--x', e.clientX + 'px');
		document.querySelector('.clickable-div').style.setProperty('--y', e.clientY + 'px');
		
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
		</div>
	);
}

export default App;
