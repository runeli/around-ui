import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RuneliRouter from './Router';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <MuiThemeProvider>
          <div style={{overflow: 'hidden'}}>            
            <RuneliRouter />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;