import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import http from '../http';
import {Form, Icon, Input, Button, Modal} from 'antd';

@observer
class SpiderPanel extends Component {

    @observable spiderName = 'sbd';
    @observable visible = false;

    componentDidMount() {

    }

    render() {
        return (<Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
            SpiderPanel
        </Content>);

    }
}

export default SpiderPanel;