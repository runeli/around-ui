import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';

class GotoPostAroundViewButton extends React.Component {

    _handleButtonClick() {
        this.context.router.history.push('/postAround');
    }

    render() {
        return (
            <div className="round-floating-action-button" onClick={this._handleButtonClick.bind(this)}>
                <ContentAdd />
            </div>
        );
    }
}

GotoPostAroundViewButton.contextTypes = {
  router: PropTypes.object.isRequired
};


export default GotoPostAroundViewButton;