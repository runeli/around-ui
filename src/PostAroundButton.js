import React from 'react';
import PropTypes from 'prop-types';

class PostAroundButton extends React.Component {
    render() {
        const style = this.props.visible ? {} : { right: -65 };
        return (
            <div className="round-floating-action-button" onClick={this.props.onClick} style={style} >
                ➣
            </div>
        );
    }
}

PostAroundButton.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostAroundButton;