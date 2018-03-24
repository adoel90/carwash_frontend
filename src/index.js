import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
// import { Router, Route, Switch } from 'react-router';
import Store from './stores/config';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={Store}>
		<CookiesProvider>
			<BrowserRouter>
				<App />			
			</BrowserRouter>
		</CookiesProvider>
	</Provider>,
	rootElement);
registerServiceWorker();
