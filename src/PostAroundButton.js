import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';

class GotoAroundViewButton extends React.Component {
    render() {
        const style = this.props.visible ? {} : { right: -65 };
        return (
            <div className="round-floating-action-button" onClick={this.props.onClick} style={style} >
                <ContentAdd />
            </div>
        );
    }
}

GotoAroundViewButton.contextTypes = {
  router: PropTypes.object.isRequired
};


export default GotoAroundViewButton;