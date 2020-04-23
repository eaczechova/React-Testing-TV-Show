import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import { fetchShow } from './api/fetchShow';
import Episodes from './components/Episodes';
import './styles.css';
import parse from 'html-react-parser';


export default function App() {
	const [show, setShow] = useState(null);
	const [seasons, setSeasons] = useState([]);
	const [selectedSeason, setSelectedSeason] = useState('');
	const episodes = seasons[selectedSeason] || [];

	useEffect(() => {
		fetchShow(setShow, setSeasons)
	}, []);

	const handleSelect = (e) => {
		setSelectedSeason(e.value);
	};

	if (!show) {
		return <h2 data-testid="loading">Fetching data...</h2>;
	}

	return (
		<div className="App">
			<img className="poster-img" src={show.image.original} alt={show.name} />
			<h1>{show.name}</h1>
			{parse(show.summary)}
			<Dropdown data-testid="select"
				options={Object.keys(seasons)}
				onChange={handleSelect}
				value={selectedSeason || 'Select a season'}
				placeholder="Select an option"
			/>
			<Episodes episodes={episodes} />
		</div>
	);
}
