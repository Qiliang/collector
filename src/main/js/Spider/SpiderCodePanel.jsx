import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import http from '../http';
import {Form, Layout, Icon, Input, Button, Modal, message} from 'antd';
import CodeMirror from './CodeMirror';
require('codemirror/lib/codemirror.css');
require('codemirror/mode/groovy/groovy');
const {Header, Content, Sider} = Layout;

@observer
class SpiderCodePanel extends Component {

    onSave = async () => {
        try {
            let {matcher, inputer, outputer} = this.props.code;
            let response = await http.patch(this.props.code._links.self.href, {matcher, inputer, outputer});
            message.info('保存成功');
        } catch (e) {
            message.error(e);
        }

    }

    render() {
        return (<Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
            SpiderCodePanel {this.props.code.name} <Button onClick={this.onSave} type="primary">保存</Button>

            <div>
                matcher
                <CodeMirror value={this.props.code.matcher}
                            onChange={(newCode) => this.props.code.matcher = newCode}
                            options={{lineNumbers: true, mode: 'groovy'}}/>
            </div>
            <div>
                inputer
                <CodeMirror value={this.props.code.inputer}
                            onChange={(newCode) => this.props.code.inputer = newCode}
                            options={{lineNumbers: true, mode: 'groovy'}}/>
            </div>
            <div>
                outputer
                <CodeMirror value={this.props.code.outputer} onChange={(newCode) => {
                    this.props.code.outputer = newCode
                }} options={{lineNumbers: true, mode: 'groovy'}}/>
            </div>
        </Content>);

    }
}

export default SpiderCodePanel;