import React, { Component } from 'react';

class SingleMessageInThread extends Component {
    render() {
        return (
            <div className="around-thread">
                {this.props.children}
            </div>
        );
    }
}

export default SingleMessageInThread;