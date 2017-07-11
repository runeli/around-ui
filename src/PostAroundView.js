import React, { Component } from 'react';
import AutoResizingTextarea from './AutoResizingTextarea';

class PostAroundView extends Component {

    constructor() {
        super();
        this.state = {
            valueToBePosted: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(a) {
        this.setState({valueToBePosted: a.target.value});
    }

    render() {
        return (
            <div className="textarea-container">
                <AutoResizingTextarea 
                className="new-around-input-textarea" 
                value={this.state.valueToBePosted} 
                onChange={this.handleChange} autoComplete="false" 
                spellCheck="false"
                placeholder="Whats is happening around you?"/>
            </div>
        );
    }
}

export default PostAroundView;