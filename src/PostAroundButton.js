import React from 'react';
import PropTypes from 'prop-types';

class PostAroundButton extends React.Component {
    render() {
        if(this.props.visible) {
            return (
                <div className="round-post-new-around-button" onClick={this.props.onClick}>
                    POST
                </div>
            );
        } else {
            return null;
        }

    }
}

PostAroundButton.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostAroundButton;