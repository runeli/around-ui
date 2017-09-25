import React, { Component } from 'react';
import AutoResizingTextarea from './AutoResizingTextarea';
import PostAroundButton from './PostAroundButton';
import HttpClient from './HttpClient';
import PropTypes from 'prop-types';
import ApplicationStateStore from './ApplicationStateStore';
import LocationDisplayPane from './LocationDisplayPane';

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

    async handlePostNewAround() {
        const messageToServer = {
            messageBody: this.state.valueToBePosted,
            date: new Date()
        };
        const maybeAroundAdded = await HttpClient.addAroundMessage(messageToServer);
        if(maybeAroundAdded) {
            ApplicationStateStore.addSingleAround(maybeAroundAdded);
        }
        this.context.router.history.push('/arounds');
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                    <AutoResizingTextarea 
                        className="new-around-input-textarea textarea-container new-thread-textarea" 
                        value={this.state.valueToBePosted} 
                        onChange={this.handleChange} 
                        autoComplete="false" 
                        spellCheck="false"
                        placeholder="Whats is happening around you?"/>
                <PostAroundButton visible={this.state.valueToBePosted.length > 0} onClick={this.handlePostNewAround.bind(this)}/>
                <LocationDisplayPane />
            </div>

        );
    }
}

PostAroundView.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostAroundView;