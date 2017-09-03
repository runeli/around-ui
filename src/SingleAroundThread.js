import React, { Component } from 'react';

class SingleAroundThread extends Component {

    _handleOnThreadClick() {
        //this.threadContainer.setAttribute("style", `margin-top:-${this.threadContainer.getBoundingClientRect().top - 64}px;`);
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