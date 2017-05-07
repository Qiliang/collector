import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import http from '../http';
import {Form, Icon, Input, Button, Modal} from 'antd';

const FormItem = Form.Item;


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@observer
class SpiderForm extends Component {

    @observable spiderName = 'sbd';
    @observable visible = false;

    show = () => {
        this.visible = true;
    }
    handleOk = (e) => {
        this.visible = false;
    }
    handleCancel = (e) => {
        this.visible = false;
    }

    componentDidMount() {

    }

    handleSubmit = async (e) => {
        let response = await http.post('/api/spiders', {name: this.spiderName});
        console.log(response)
        this.props.appState.refreshSpider();
        this.visible = false;
    }

    render() {
        return (
            <Modal title="爬虫" visible={this.visible} footer={null}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <Form>
                    <FormItem>

                        <Input prefix={<Icon type="user"
                                             style={{fontSize: 13}}/>} value={this.spiderName}
                               onChange={({target}) => this.spiderName = target.value} placeholder="爬虫名称"/>

                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            保存
                        </Button>
                    </FormItem>
                </Form>

            </Modal>
        );

    }
}

export default SpiderForm;