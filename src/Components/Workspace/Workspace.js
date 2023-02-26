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
            workspace: props.workspace,
            workspace_boards: null,
            isView: false,
            repository: new WorkspaceRepository(),
            isCalledOnIndex: true,
            users: null,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.workspace == null) {

            let data = await this.fetchWorkspaceAndReturnData();

            this.setState({workspace: data});
            this.setState({workspace_boards: data.boards})
            this.setState({users: data.users})
            this.setState({isView: true})
            this.setState({isCalledOnIndex: false})
        }
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isView, workspace, workspace_boards, isCalledOnIndex, users} = this.state;

        if (isLoading) {
            return <h1>Loading workspace...</h1>
        }

        const link = this.getEditOrAddLink(workspace);

        return (
            <div>
                <h3>{workspace['name']}</h3>
                <h4>{workspace['description']}</h4>
                {link}
                {isView && <button onClick={this.delete}>Delete workspace</button>}

                {!isCalledOnIndex &&
                <AddUserToWorkspace workspace_id={workspace.id}/>
                }

                {!isCalledOnIndex && <div><h4>
                    {workspace_boards && workspace_boards.length > 0 ? "All workspace boards:" : "This workspace doesn't have boards"}
                </h4>
                    <a href={'/boards/add'}>Add board</a>
                </div>
                }

                {!isCalledOnIndex && workspace_boards &&
                workspace_boards.map(function (board, key) {
                    return <Board board={board}/>
                })
                }

                Users that have access to this workspace:
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>


                    {!isCalledOnIndex && users &&
                    users.map(function (user, key) {
                        return <tr>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><button onClick={() => {
                                deleteUserFromWorkspace(user.id, workspace.id)
                            }
                            }>Delete</button></td>
                        </tr>
                    })
                    }
                </table>

            </div>
        );
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.workspace.id);

        window.location.href = 'http://localhost:3000/workspaces'
    }

    getEditOrAddLink(workspace) {
        return this.state.isView ? <a href={`/workspaces/edit/${workspace.id}`}>Edit workspace</a>
            : <a href={`/workspaces/view/${workspace.id}`}>View workspace</a>;
    }

    async fetchWorkspaceAndReturnData() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const workspace_id = window.location.href.split("/").pop();
        return await this.state.repository.view(workspace_id, filters, sorts, includes);
    }
}

async function deleteUserFromWorkspace(user_id, workspace_id){
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