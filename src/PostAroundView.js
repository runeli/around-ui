import React, { Component } from 'react';
import AutoResizingTextarea from './AutoResizingTextarea';
import PostAroundButton from './PostAroundButton';
import HttpClient from './HttpClient';
import PropTypes from 'prop-types';


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
        const helsinkiLocation = {lng: 24.9410248, lat:60.1733244};
        HttpClient.addAroundMessage(null, 'abc123', this.state.valueToBePosted, helsinkiLocation);
        this.context.router.history.push('/arounds');
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                    <AutoResizingTextarea 
                        className="new-around-input-textarea textarea-container" 
                        value={this.state.valueToBePosted} 
                        onChange={this.handleChange} autoComplete="false" 
                        spellCheck="false"
                        placeholder="Whats is happening around you?"/>
                <PostAroundButton visible={this.state.valueToBePosted.length > 0} onClick={this.handlePostNewAround.bind(this)}/>
            </div>

        );
    }
}

PostAroundView.contextTypes = {
  router: PropTypes.object.isRequired
};


export default PostAroundView;