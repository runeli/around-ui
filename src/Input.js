import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostMessageInput extends Component {

    constructor() {
        super();
        this.state = {
            errorText: null
        };
    }

    componentDidMount() {
        this.postMessageInput.input.addEventListener('keyup', this._handleEnterPress.bind(this));
    }

    componentWillUnmount() {
        this.postMessageInput.input.removeEventListener('keyup', this._handleEnterPress.bind(this));
    }

    _handleEnterPress(event) {
        if(event.keyCode === 13)
            this._handleAroundAdd();
    }

    _handleAroundAdd() {
        const valueToBeAdded = this.postMessageInput.input.value;
        if(!this.isAroundValid(valueToBeAdded)) {
            return;
        }
        this.props.onAroundAdd(valueToBeAdded);
        this.postMessageInput.input.value = '';
    }

    render() {
        return (
            <div className="input-container-new-message-container">
                <TextField 
                    className="float-left post-message-input-new-message flex-grow" 
                    hintText="Whats on your mind?" 
                    ref={postMessageInput => {this.postMessageInput = postMessageInput;}}
                    />
                <button 
                    label="POST" 
                    className="post-message-post-button" 
                    onClick={this._handleAroundAdd.bind(this)}                
                />
            </div>
        );
    }

    isAroundValid(aroundMessage) {
        if(aroundMessage.length > 240 || aroundMessage.length === 0) {
            this._handleAroundAddFailed();
            return false;
        } else {
            return true;
        }
    }

    _handleAroundAddFailed() {

    }
}

export default PostMessageInput;