import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LocationActivatorPane from './LocationActivatorPane';
import LeafletMap from './LeafletMap';
import PostMessageView from './PostMessageView';
import AroundBar from './AroundBar';
const Routes = () => (
  <Router>     
      <div style={{height: 'inherit'}}>
        <AroundBar />
        <Route exact path="/" component={LocationActivatorPane}/>
        <Route path="/map" component={LeafletMap}/>
        <Route path="/postMessage" component={PostMessageView}/>
      </div>
  </Router>
)
export default Routes