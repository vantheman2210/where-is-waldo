import React, { useEffect, useState } from "react"; 
import { db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import '../styles/ModalEnd.css';
import { Link } from "react-router-dom";
import { auth } from "../Firebase";

const ModalEnd = (props) => { 

  const [name, setName] = useState('');

  const getPlayerName = async () => {
		const coordRef = collection(db, 'playerName');
		const queryRef = query(coordRef, where('id', '==', props.id));

		const data = await getDocs(queryRef);

		const coords = data.docs.map((doc) => (doc = doc.data().name));

		return coords;
	};

  useEffect(() => {
    if(props.id) {
		const check = async () => {
			setName(await getPlayerName());
		};
		check();
  }
		console.log('not logged');
	}, [props.id]);

  const signOut = () => {
		auth.signOut();
		document.querySelector('.logOutBtn').style.display = 'none';
		console.log('Signed out')
	};

  useEffect(() => { 
    console.log(name)
  }, [name])

  return ( 
    <div className="modalEndContainer">
      <p>{`Congratulations, ${name}. You have successfully completed the game.`}</p>
      <Link to="/">
      <button onClick={signOut} className="modalExit">Exit</button>
      </Link>
    </div>
  )
}

export default ModalEnd;