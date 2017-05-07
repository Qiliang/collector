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
class SpiderCodeForm extends Component {

    @observable spider = null;
    @observable name = 'abc';
    @observable visible = false;

    show = (spider) => {
        this.spider=spider;
        this.visible = true;
    }
    handleOk = (e) => {
        this.visible = false;
    }
    handleCancel = (e) => {
        this.visible = false;
    }

    componentDidMount() {
        //this.props.form.validateFields();
    }

    handleSubmit = async (e) => {
        let response = await http.post("/api/codes", {name: this.name,spider:this.spider._links.self.href});
        console.log(response)
        await this.props.appState.refreshSpiderCode(this.spider);
        this.visible = false;
    }



    render() {
        return (
            <Modal title="爬虫脚本" visible={this.visible} footer={null}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            >
                <div>
                    <FormItem>
                        <Input prefix={<Icon type="user"
                                             style={{fontSize: 13}}/>} value={this.name}
                               onChange={({target}) =>this.name = target.value }
                               placeholder="脚本名称"/>

                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            保存
                        </Button>
                    </FormItem>
                </div>
            </Modal>
        );

    }
}

export default SpiderCodeForm;