import React from 'react'
import PropTypes from 'prop-types';

class AroundBar extends React.Component {

    _handleBackButtonClick() {
        this.context.router.history.goBack()
    }

    _getCurrentIconOrEmptyIfNoRoutesArePresent() {
        if(this.context.router.route.location.pathname === "/") {
            return <div></div>
        } else {
            return <div>◀</div>
        }
    }

    render() {
        return (
            <div className="around-top-navigation-bar flex-fixed">
                <AroundBarActionButton onClickHandler={this._handleBackButtonClick.bind(this)}>{this._getCurrentIconOrEmptyIfNoRoutesArePresent()}</AroundBarActionButton>
            </div>
        );
    }
}

AroundBar.contextTypes = {
  router: PropTypes.object.isRequired
};

class AroundBarActionButton extends React.Component {
    render() {
        return <div className="around-top-navigation-bar-button" onClick={this.props.onClickHandler}>{this.props.children}</div>
    }
}

export default AroundBar;