import * as React from 'react';
import './App.css';
import RuneliRouter from './Router';

class App extends React.Component {

  render() {
    return (
      <div className="app">          
        <RuneliRouter />
      </div>
    );
  }
}

export default App;