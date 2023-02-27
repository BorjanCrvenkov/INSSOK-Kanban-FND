import Repository from "../Repository/BaseRepository"

export default class UserWorkspaceRepository extends Repository {
    constructor() {
        super('user_workspaces');
    }

    async findByUserIdAndWorkspaceId(user_id, workspace_id) {
        let filters = {
            'user_id': user_id,
            'workspace_id': workspace_id,
        };

        return await this.index(filters, null, null);
    }

    async removeUserFromWorkspace(user_id, workspace_id) {
        let user_workspaces = await this.findByUserIdAndWorkspaceId(user_id, workspace_id);
        let user_workspace = user_workspaces[0];

        await this.deleteModel(user_workspace.id);
    }
}