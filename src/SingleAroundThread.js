import React, { Component } from 'react';

class SingleAroundThread extends Component {

    _handleOnThreadClick() {
        this.props.onThreadClick();
    }

    render() {
        return (
            <div ref={(div) => {this.threadContainer = div;}} className="around-thread" onClick={this._handleOnThreadClick.bind(this)}>
                {this.props.initialMessage}
            </div>
        );
    }
}

export default SingleAroundThread;