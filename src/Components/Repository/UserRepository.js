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

    async findByEmail(email){
        let filters = {
            'email': email
        };

        let user = await this.index(filters, null, null);

        if(user == null){
            console.log("User not found!")
            return ;
        }

        return user;
    }

    async getAuthUserInfo(){
        this.checkIfTokenExistsAndIsNotExpired();

        const response = await instance.get('/auth/user');

        return response.data.data;
    }
}