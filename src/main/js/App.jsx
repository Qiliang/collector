import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Button} from 'antd';
import {Layout, Menu, Breadcrumb, Icon, Modal, message, Popover} from 'antd';
import _ from 'lodash';
import './App.css';
import SpiderForm from './Spider/SpiderForm';
import SpiderCodeForm from './Spider/SpiderCodeForm';
import SpiderCodePanel from './Spider/SpiderCodePanel';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


@observer
class App extends Component {

    @observable currentWindow = {};

    showSpiderForm = () => {
        this.refs.spiderForm.show();
    }

    showSpiderCodeForm = (spider) => {
        this.refs.spiderCodeForm.show(spider);
    }

    async componentDidMount() {
        await this.props.appState.refreshSpider();
    }

    onMenuItemClick = ({item, key, keyPath}) => {
        if (item.props.code)
            this.currentWindow = item.props.code;
    }

    onOpen = async (spider) => {
        await this.props.appState.refreshSpiderCode(spider);
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['16']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            onClick={this.onMenuItemClick}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user"/>配置</span>}>
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option{this.props.appState.timer}</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<Popover
                                content={<a onClick={this.showSpiderForm}><Icon type="plus-circle-o"/>爬虫</a>}
                                trigger="hover"
                                placement="rightTop"
                            >
                                <Icon type="laptop"/>应用
                            </Popover>}>
                                {
                                    _.map(this.props.appState.spiders, (spider, index) =>
                                        (
                                            <SubMenu key={`spider_${spider.name}`} onTitleClick={() => {
                                                this.onOpen(spider)
                                            }}
                                                     title={
                                                         <Popover
                                                             content={<a
                                                                 onClick={() => this.showSpiderCodeForm(spider)}><Icon
                                                                 type="plus-circle-o"/>脚本</a>}
                                                             trigger="hover"
                                                             placement="rightTop">
                                                             <Icon type="schedule"/>{spider.name}</Popover>}>
                                                {
                                                    _.map(spider.codes, (code) => (
                                                        <Menu.Item key={`${spider.name}@${code.name}`} code={code}><Icon
                                                            type="code-o"/>{code.name}</Menu.Item>
                                                    ))
                                                }
                                            </SubMenu>
                                        )
                                    )
                                }
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        {this.currentWindow&&_.has(this.currentWindow, 'matcher')?
                            <SpiderCodePanel code={this.currentWindow} />: <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                                Content
                            </Content>
                        }

                    </Layout>
                </Layout>

                <SpiderForm ref="spiderForm" appState={this.props.appState}/>
                <SpiderCodeForm ref="spiderCodeForm" appState={this.props.appState}/>
                <DevTools />
            </Layout>
        );
    }

    onReset = () => {
        this.props.appState.resetTimer();
    }
}
;

export default App;
