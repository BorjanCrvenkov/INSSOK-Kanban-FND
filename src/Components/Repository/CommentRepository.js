import Repository from "../Repository/BaseRepository"

export default class CommentRepository extends Repository{
    constructor() {
        super('comments');
    }
}