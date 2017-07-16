import React, { Component } from 'react';

class AutoResizingTextarea extends Component {

    constructor() {
        super();
        this._initialHeight = 'auto';
        this._previousRenderHeight = 0;
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

    _setHeight(height) {
        this._ta.style.height = height + 'px';
    }

    render() {
        return <textarea ref={ta => {this._ta = ta}} {...this.props} rows="1" />        
    }
}

export default AutoResizingTextarea;