import * as React from 'react';
import PropTypes from 'prop-types';

class LocationActivatorPane extends React.Component {

  redirectToAroundListView() {
    this.context.router.history.push('/arounds');
  }

  render() {
    return (
        <div className="full-height">
          <div className="aligner full-height">
            <div className="intro-card">
              <h3 className="display-middle">Get started</h3>
              <p>You will be prompted to share your location</p>            
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
