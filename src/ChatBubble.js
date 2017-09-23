import React, { Component } from 'react';

class ChatBubble extends Component {
    render() {
        if(this.props.count > 0) {
            return (                
                <div className="chat-bubble">
                    🗩 {this.props.count}
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default ChatBubble;