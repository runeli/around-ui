import React from 'react'
import PropTypes from 'prop-types';

class AroundBar extends React.Component {

    _handleBackButtonClick() {
        this.context.router.history.goBack()
    }

    _getCurrentIconOrEmptyIfNoRoutesArePresent() {
        if(this.context.router.route.location.pathname === "/") {
            return <div>Home</div>
        } else {
            return <div onClick={this._handleBackButtonClick.bind(this)}>Back</div>
        }
    }

    render() {
        return (
            <div className="around-top-navigation-bar flex-fixed">
                <AroundBarActionButton>{this._getCurrentIconOrEmptyIfNoRoutesArePresent()}</AroundBarActionButton>
            </div>
        );
    }
}

AroundBar.contextTypes = {
  router: PropTypes.object.isRequired
};

class AroundBarActionButton extends React.Component {
    render() {
        return <div className="around-top-navigation-bar-button" onClick={this.props.onClick}>{this.props.children}</div>
    }
}

class AroundBarTitle extends React.Component {
    render() {
        return <h1 className="around-top-navigation-bar-title">{this.props.children}</h1>
    }
}

export default AroundBar;