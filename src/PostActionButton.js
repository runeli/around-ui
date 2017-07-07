import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';

class PostActionButton extends React.Component {

    _handleButtonClick() {
        this.context.router.history.push('/postAround');
    }

    render() {
        const style = {
            position: 'absolute',
            bottom: 40,
            right: 40
        };
        return (
            <div className="round-floating-action-button" onClick={this._handleButtonClick.bind(this)}>
                <ContentAdd />
            </div>
        );
    }
}

PostActionButton.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostActionButton;