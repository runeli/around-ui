import React, { Component } from 'react';
import ChatBubble from './ChatBubble';
class SingleAroundThread extends Component {

    _handleOnThreadClick() {
        this.props.onThreadClick();
    }

    render() {
        return (
            <div ref={(div) => {this.threadContainer = div;}} className="around-thread" onClick={this._handleOnThreadClick.bind(this)}>
                {this.props.initialMessage}                
                <ChatBubble count={this.props.count}/>
            </div>
        );
    }
}

export default SingleAroundThread;