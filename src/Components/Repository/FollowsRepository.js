import Repository from "../Repository/BaseRepository"

export default class BoardRepository extends Repository{
    constructor() {
        super('follows');
    }
}