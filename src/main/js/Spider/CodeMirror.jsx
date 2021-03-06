'use strict';
import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
const ReactDOM = require('react-dom');
const findDOMNode = ReactDOM.findDOMNode;
const className = require('classnames');
const debounce = require('lodash.debounce');

function normalizeLineEndings(str) {
    if (!str) return str;
    return str.replace(/\r\n|\r/g, '\n');
}

@observer
class CodeMirror extends Component {
    displayName = 'CodeMirror'
    @observable isFocused = false;
    propTypes = {
        className: React.PropTypes.any,
        codeMirrorInstance: React.PropTypes.func,
        defaultValue: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onFocusChange: React.PropTypes.func,
        onScroll: React.PropTypes.func,
        options: React.PropTypes.object,
        path: React.PropTypes.string,
        value: React.PropTypes.string,
        preserveScrollPosition: React.PropTypes.bool
    }

    getCodeMirrorInstance() {
        return this.props.codeMirrorInstance || require('codemirror');
    }

    // componentWillMount() {
    //     this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
    // }

    componentDidMount() {
        const textareaNode = findDOMNode(this.refs.textarea);
        const codeMirrorInstance = this.getCodeMirrorInstance();
        this.codeMirror = codeMirrorInstance.fromTextArea(textareaNode, this.props.options);
        this.codeMirror.on('change', this.codemirrorValueChanged);
        this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        this.codeMirror.on('scroll', this.scrollChanged);
        this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
    }

    componentWillUnmount() {
        // is there a lighter-weight way to remove the cm instance?
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.codeMirror && nextProps.value !== undefined && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
    //         if (this.props.preserveScrollPosition) {
    //             var prevScrollPosition = this.codeMirror.getScrollInfo();
    //             this.codeMirror.setValue(nextProps.value);
    //             this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
    //         } else {
    //             this.codeMirror.setValue(nextProps.value);
    //         }
    //     }
    //     if (typeof nextProps.options === 'object') {
    //         for (var optionName in nextProps.options) {
    //             if (nextProps.options.hasOwnProperty(optionName)) {
    //                 this.codeMirror.setOption(optionName, nextProps.options[optionName]);
    //             }
    //         }
    //     }
    // }

    getCodeMirror() {
        return this.codeMirror;
    }

    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }

    focusChanged(focused){
        this.isFocused = focused;
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }

    scrollChanged=(cm)=> {
        this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
    }

    codemirrorValueChanged = (doc, change) => {
        if (this.props.onChange && change.origin !== 'setValue') {
            this.props.onChange(doc.getValue(), change);
        }
    }

    render() {
        var editorClassName = className('ReactCodeMirror', this.isFocused ? 'ReactCodeMirror--focused' : null, this.props.className);
        return (
            <div className={editorClassName}><textarea ref="textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off"></textarea></div>
        );
    }
}

module.exports = CodeMirror;
