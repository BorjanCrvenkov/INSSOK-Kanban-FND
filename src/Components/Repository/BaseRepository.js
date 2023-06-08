import instance from "../axios/axios";

export default class Repository {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async index(filters, sorts, includes) {
        this.checkIfTokenExistsAndIsNotExpired();

        let path = this.modelName;

        let requestParams = this.getRequestParams(filters, sorts, includes)

        path += requestParams;

        const response = await instance.get(path).catch((error) => {
            this.handleErrorResponse(error)
        });

        return response.data.data;
    }

    async view(id, filters = null, sorts = null, includes = null) {
        this.checkIfTokenExistsAndIsNotExpired();

        let path = this.modelName + '/' + id;

        let requestParams = this.getRequestParams(filters, sorts, includes);

        path += requestParams;

        const response = await instance.get(path).catch((error) => {
            this.handleErrorResponse(error)
        });

        return response.data.data;
    };

    getRequestParams(filters, sorts, includes) {
        let params = '';
        let filtersParam = '';
        let sortsParam = '';
        let includeParam = '';

        if (filters != null) {
            Object.keys(filters).forEach(function (key) {
                filtersParam += "filter[" + key + "]=" + filters[key] + "&";
            });

            filtersParam = filtersParam.substring(0, filtersParam.length - 1);

            if (sorts || includes) {
                filtersParam += '&'
            }

            params += filtersParam;
        }

        if (sorts != null) {
            sortsParam = 'sort=';

            for (let i = 0; i < sorts.length; i++) {
                if (i !== 0) {
                    sortsParam += ','
                }

                sortsParam += sorts[i];
            }

            if (includes) {
                sortsParam += '&'
            }
            params += sortsParam
        }

        if (includes != null) {
            includeParam = 'include=';

            for (let i = 0; i < includes.length; i++) {
                if (i !== 0) {
                    includeParam += ','
                }

                includeParam += includes[i];
            }
            params += includeParam
        }

        if (params.length > 1) {
            params = "?" + params
        }

        return params;
    }

    async update(id, data) {
        this.checkIfTokenExistsAndIsNotExpired();

        const response = await instance.put(this.modelName + '/' + id, data).catch((error) => {
            this.handleErrorResponse(error)
        });

        return response.data.data;
    };

    async deleteModel(id) {
        this.checkIfTokenExistsAndIsNotExpired();

        await instance.delete(this.modelName + '/' + id).catch((error) => {
            this.handleErrorResponse(error)
        });
    };

    async add(data) {
        let route = this.modelName;
        let is_register = window.location.href.split("/").pop() == 'register';

        if (is_register) {
            route = 'auth/register';
        }else {
            this.checkIfTokenExistsAndIsNotExpired();
        }

        const response = await instance.post(route, data).catch((error) => {
            this.handleErrorResponse(error)
        });

        if(!response){
            return ;
        }

        if(is_register){
            window.location.href = 'http://localhost:3000/login';
            return;
        }

        return response.data.data['id'];
    }

    async login(data) {
        let response = await instance.post('/auth/login', data)
            .then(response => {
                let auth = response.data.auth;

                let token = auth.plainTextToken;

                let expires_at = auth.expires_at;

                let user = response.data.data;

                user = JSON.stringify(user);


                localStorage.setItem("token", token);
                localStorage.setItem("expires_at", expires_at);
                localStorage.setItem('user', JSON.stringify(user));

                user = JSON.parse(user);
                localStorage.setItem('role', user.role.name);

                return response;
            }).catch((error) => {
                this.handleErrorResponse(error)
            });

        if(!response){
            return ;
        }

        window.location.href = 'http://localhost:3000/workspaces'
    }

    checkIfTokenExistsAndIsNotExpired() {
        let token = localStorage.getItem('token');
        let expires_at = localStorage.getItem('expires_at');

        if (token === null) {
            window.location.href = 'http://localhost:3000/login'
        }

        if (expires_at != null && Date.parse(expires_at) > Date.now()) {
            window.location.href = 'http://localhost:3000/login'
        }
    }

    async logout() {
        await instance.post('/auth/logout').catch((error) => {
            this.handleErrorResponse(error)
        });

        localStorage.clear();

        return true;
    }

    async handleErrorResponse(error){
        let single_message =  error.response.data.meta != null
        let message = single_message ? error.response.data.meta.message : error.response.data.errors;

        this.showNotification(message, single_message);
    }

    async showNotification(errors, single_message) {
        const container = document.getElementById('notification-container');

        if(single_message){
            const notification = document.createElement('div');
            notification.innerHTML = `<div class="alert alert-danger" role="alert">${errors}</div>`;

            container.appendChild(notification);

            setTimeout(() => {
                container.removeChild(notification);
            }, 3000);

            notification.classList.add('show');
            return;
        }

        for (let i in errors) {
            const notification = document.createElement('div');
            notification.innerHTML = `<div class="alert alert-danger" role="alert">${errors[i]}</div>`;

            container.appendChild(notification);

            setTimeout(() => {
                container.removeChild(notification);
            }, 6000);

            notification.classList.add('show');
        }
    }
}
