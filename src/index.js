import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();