import Repository from "../Repository/BaseRepository"

export default class ColumnRepository extends Repository{
    constructor() {
        super('columns');
    }
}