import Repository from "../Repository/BaseRepository"

export default class WorkspaceRepository extends Repository{
    constructor() {
        super('workspaces');
    }

    async view(id, filters = null, sorts = null, includes = null) {
        let data = await super.view(id, filters, sorts, includes);

        let auth_user = JSON.parse(JSON.parse(localStorage.getItem('user')))

        for (let user of data.users) {
            if(user.id == auth_user.id){
                let access_type = user.pivot.access_type;

                localStorage.setItem('access_type', access_type)
            }
        }

        this.setLocalStoragePermissions()

        return data;
    }

    setLocalStoragePermissions(){
        let is_admin_role = localStorage.getItem('role') == 'administrator';
        let has_admin_access_type = localStorage.getItem('access_type') == access_types.admin;
        let has_manager_access_type = localStorage.getItem('access_type') == access_types.manager;

        let is_admin = is_admin_role || has_admin_access_type;
        let is_manager = !is_admin_role && has_manager_access_type;
        let is_user = !is_admin && !is_manager;

        localStorage.setItem('is_admin', is_admin);
        localStorage.setItem('is_manager', is_manager);
        localStorage.setItem('is_user', is_user);
    }
}
const access_types = {
    'admin': 'admin',
    'manager': 'manager',
    'user': 'user',
};