import {observable} from 'mobx';
import http from './http';

class AppState {
    @observable timer = 0;
    @observable spiders = [];

    constructor() {
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    async refreshSpider() {
        let response = await http.get('/api/spiders');
        this.spiders = response._embedded.spiders;
        console.log(this.spiders)
    }

    async refreshSpiderCode(spider) {
        let response = await http.get(spider._links.codes.href);
        spider.codes = response._embedded.codes;
    }

    resetTimer() {
        this.timer = 0;
    }
}

export default AppState;
