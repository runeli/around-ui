import React, { Component } from 'react';

class AutoResizingTextarea extends Component {

    constructor() {
        super();
        this._initialHeight = '16pt';
    }

    componentDidUpdate() {
        this._updateTextareaHeight();
    }

    componentDidMount() {
        this._updateTextareaHeight();
    }

    _updateTextareaHeight() {
        const computedStyle = window.getComputedStyle(this._ta);
        const paddings = parseInt(computedStyle.paddingTop, 10) + parseInt(computedStyle.paddingBottom, 10);
        this._ta.style.height = this._initialHeight;
        this._ta.style.height = (this._ta.scrollHeight - paddings).toString() + 'px';
    }

    render() {
        return <textarea ref={ta => {this._ta = ta}} {...this.props} />        
    }
}

export default AutoResizingTextarea;