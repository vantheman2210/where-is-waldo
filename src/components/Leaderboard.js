import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
	const [ leaderboard, setLeaderboard ] = useState([]);

	const [level, setLevel] = useState('Easy');


	const getItemCoords = async () => {
		const data = await getDocs(collection(db, 'leaderboard'));
		const items = data.docs.map((doc) => (doc = doc.data()));
		return items;
	};

	useEffect(() => {
		const check = async () => {
			setLeaderboard(await getItemCoords());
		};
		check();
		console.log(leaderboard);
	}, []);

	const modalToggle = () => {
		if (!document.querySelector('.modal-container').classList.contains('modal-container-hide')) {
			document.querySelector('.modal-container').classList.toggle('modal-container-hide');
		}
		return;
	};

	const displayLeaderboard = (e) => { 
		setLevel(e.target.innerText)
	}

	useEffect(() => { 
		console.log(level)
	}, [level])

	return (
		<div className="leaderboard-container">
			<Link to="/" onClick={modalToggle}>
				<button className="return">Return</button>
			</Link>
			<div className='leaderboardBtn-container'>
			<button className='leaderboardBtns' onClick={displayLeaderboard}>Easy</button>
			<button className='leaderboardBtns' onClick={displayLeaderboard}>Medium</button> 
			<button className='leaderboardBtns' onClick={displayLeaderboard}>Hard</button>
			</div>
			<div className="list-container" onClick={displayLeaderboard}>
				{leaderboard.filter(board => board.level === level).sort((a, b) => a.time - b.time).map((player, i) => {
			return (
				<div className='score-container' key={i}>
					<p className='name'>
						<b>{player.name}</b>:
					</p>
					<p>{`${Number(player.time).toFixed(2)} seconds`}</p>
				</div>
			);
		})}
			</div>
		</div>
	);
};

export default Leaderboard;


/*

	leaderboard.filter(board => board.level === displayLeaderboard()).sort((a, b) => a.time - b.time).map((player, i) => {
					return (
						<div className='score-container' key={i}>
							<p className='name'>
								<b>{player.name}</b>:
							</p>
							<p>{`${Number(player.time).toFixed(2)} seconds`}</p>
						</div>
					);
				})

*/