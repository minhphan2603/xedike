import React from 'react';
import './App.css';
import Header from './Components/layout/Header';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<Header/>
			<BrowserRouter>
			
			
			</BrowserRouter>
		</div>
	);
}

export default App;
