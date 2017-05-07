require('es6-promise').polyfill();
require('isomorphic-fetch');

export default {
    async post(url,body={}){
       let response= await fetch(`${url}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
       return response.json();
    },

    async put(url,body={}){
        let response= await fetch(`${url}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        return response.json();
    },

    async patch(url,body={}){
        let response= await fetch(`${url}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        return response.json();
    },

    async get(url){
        let response= await fetch(`${url}`);
        return response.json();
    }



}