import * as React from 'react';
import PropTypes from 'prop-types';
import logo from './around-app-bg-transparent.png';
class LocationActivatorPane extends React.Component {

  redirectToAroundListView() {
    this.context.router.history.push('/arounds');
  }

  render() {
    return (
        <div className="full-height">
          <div className="aligner full-height">
            <div className="intro-card">
              <h3>Around</h3>
              <img src={logo} className="around-app-logo"/>           
              <button className="around-main-button aligner-item display-middle" onClick={this.redirectToAroundListView.bind(this)}>Get started</button>           
            </div>
          </div>
        </div>
    );
  }
}

LocationActivatorPane.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LocationActivatorPane;
