import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LocationActivatorPane from './LocationActivatorPane';
import AroundBar from './AroundBar';
import AroundThreadList from './AroundThreadList';
import ThreadView from './ThreadView'
import PostAroundView from './PostAroundView';

const Routes = () => (
  <Router>
    <div className="flex-container">
    <AroundBar />
    <div className="flex-container app-container">        
        <div className="flex-scalable-content">
          <Route exact path="/" component={LocationActivatorPane}/>
          <Route path="/arounds" component={AroundThreadList}/>
          <Route path="/thread/:threadId" component={ThreadView} />
          <Route path="/postAround" component={PostAroundView} />
        </div>
      </div>
    </div>

  </Router>
)
export default Routes