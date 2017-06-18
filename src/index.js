import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
