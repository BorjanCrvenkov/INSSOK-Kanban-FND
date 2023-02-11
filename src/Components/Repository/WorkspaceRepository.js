import Repository from "../Repository/BaseRepository"

export default class WorkspaceRepository extends Repository{
    constructor() {
        super('workspaces');
    }
}