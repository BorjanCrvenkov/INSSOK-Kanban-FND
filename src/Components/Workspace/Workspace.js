import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import Board from "../Board/Board";
import AddUserToWorkspace from "./AddUserToWorkspace";
import UserWorkspaceRepository from "../Repository/UserWorkspaceRepository";


class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspace: null,
            workspace_boards: null,
            repository: new WorkspaceRepository(),
            users: null,
            displayAddUser: false,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        let data = await this.fetchWorkspaceAndReturnData();

        this.setState({workspace: data});
        this.setState({workspace_boards: data.boards})
        this.setState({users: data.users})
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, workspace, workspace_boards, users, displayAddUser} = this.state;

        if (isLoading) {
            return <h1>Loading workspace...</h1>
        }

        return (
            <div>
                <h3>{workspace['name']}</h3>
                <h4>{workspace['description']}</h4>
                <div className="btn-group mt-3" role="group">
                    <button className="btn btn-primary" onClick={() => {
                        this.setState({displayAddUser: !this.state.displayAddUser})
                    }}>Add user to workspace</button>
                    <a href={`/workspaces/edit/${workspace.id}`} className="btn btn-success" style={{'margin-left': '10px'}}>Edit workspace</a>
                    <button onClick={this.delete} className="btn btn-danger" style={{'margin-left': '10px'}}>Delete workspace</button>
                </div>
                <div className="mt-3">
                    {displayAddUser &&
                    <AddUserToWorkspace workspace_id={workspace.id}/>
                    }
                </div>
                <div className="mt-3"><div><h4>
                        {workspace_boards && workspace_boards.length > 0 ? "All workspace boards:" : "This workspace doesn't have boards"}
                    </h4>
                        <a href={'/boards/add'} className='btn btn-primary'>Add board</a>
                    </div>
                </div>
                <div className="mt-3">
                    {workspace_boards &&
                    workspace_boards.map(function (board, key) {
                        return <Board board={board} className="mt-3"/>
                    })
                    }
                </div>
                {users && <div className="mt-4">
                    <h3>Users that have access to this workspace:</h3>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                        users.map(function (user, key) {
                            return <tr>
                                <td scope="col">{user.first_name}</td>
                                <td scope="col">{user.last_name}</td>
                                <td scope="col">{user.username}</td>
                                <td scope="col">{user.email}</td>
                                <td scope="col">
                                    <button onClick={() => {
                                        deleteUserFromWorkspace(user.id, workspace.id)
                                    }
                                    } className="btn btn-danger">Delete
                                    </button>
                                </td>
                            </tr>
                        })
                        }
                        </tbody>

                    </table>
                </div>
                }

            </div>
        );
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.workspace.id);

        window.location.href = 'http://localhost:3000/workspaces'
    }

    async fetchWorkspaceAndReturnData() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const workspace_id = window.location.href.split("/").pop();
        return await this.state.repository.view(workspace_id, filters, sorts, includes);
    }
}

async function deleteUserFromWorkspace(user_id, workspace_id) {
    let user_workspace_repository = new UserWorkspaceRepository();

    await user_workspace_repository.removeUserFromWorkspace(user_id, workspace_id);

    window.location.href = 'http://localhost:3000/workspaces/view/' + workspace_id;
}

function getFilters() {
    return null;
}

function getSorts() {
    return null;
}

function getIncludes() {
    return [
        'boards',
        'users'
    ]
}

export default Workspace;