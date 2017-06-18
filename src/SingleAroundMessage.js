import React, { Component } from 'react';

class SingleAroundMessage extends Component {
    
    render() {
        return (
            <div className="around-message-container">
                <div className="flex-grow around-message">{this.props.messageBody}</div>
            </div>
        );
    }
}

export default SingleAroundMessage;