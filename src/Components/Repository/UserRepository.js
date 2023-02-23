import Repository from "../Repository/BaseRepository"
import instance from "../axios/axios";

export default class UserRepository extends Repository{
    constructor() {
        super('users');
    }


    async update(id, data) {
        const response = await instance.post(this.modelName + '/' + id, data);

        return response.data.data;
    }
}