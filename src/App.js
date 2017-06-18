import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RuneliRouter from './Router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <MuiThemeProvider>
          <div style={{height:'inherit', overflow: 'hidden'}}>            
            <div style={{height: 'inherit'}}>
              <RuneliRouter />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;