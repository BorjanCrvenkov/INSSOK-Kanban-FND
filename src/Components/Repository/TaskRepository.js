import Repository from "../Repository/BaseRepository"

export default class TaskRepository extends Repository{
    constructor() {
        super('tasks');
    }
}