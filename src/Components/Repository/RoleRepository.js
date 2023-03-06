import Repository from "../Repository/BaseRepository"

export default class RoleRepository extends Repository{
    constructor() {
        super('roles');
    }
}