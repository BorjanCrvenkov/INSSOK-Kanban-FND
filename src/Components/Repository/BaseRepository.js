import instance from "../axios/axios";

export default class Repository {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async index(filters, sorts, includes) {
        let path = this.modelName;

        let requestParams = this.getRequestParams(filters, sorts, includes)

        path += requestParams;

        const response = await instance.get(path);

        return response.data.data;
    }

    async view(id, filters, sorts, includes) {
        let path = this.modelName + '/' + id;

        let requestParams = this.getRequestParams(filters, sorts, includes)

        path += requestParams;

        const response = await instance.get(path);

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
        const response = await instance.put(this.modelName + '/' + id, data);

        return response.data.data;
    };

    async deleteModel(id) {
        await instance.delete(this.modelName + '/' + id);
    };

    async add(data) {
        const response = await instance.post(this.modelName, data);

        return response.data.data['id'];
    }
}
