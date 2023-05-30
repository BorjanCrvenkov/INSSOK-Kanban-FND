import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import AddUserToWorkspace from "./AddUserToWorkspace";
import UserWorkspaceRepository from "../Repository/UserWorkspaceRepository";
import BoardIndex from "../Board/BoardIndex";
import EditUserAccessModal from "./EditUserAccessModal";
import { SpinningCircles } from "react-loading-icons";

class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspace: null,
            workspace_boards: null,
            filtered_boards: null,
            repository: new WorkspaceRepository(),
            users: null,
            displayAddUser: false,
            searchQuery: "",
        };
        this.delete = this.delete.bind(this);
        this.filterBoards = this.filterBoards.bind(this);
    }

    async componentDidMount() {
        let data = await this.fetchWorkspaceAndReturnData();

        this.setState({ workspace: data });
        this.setState({ workspace_boards: data.boards });
        this.setState({ users: data.users });
        this.setState({ isLoading: false });
    }

    filterBoards() {
        const { workspace_boards, searchQuery } = this.state;
      
        if (!searchQuery || searchQuery.trim() === "") {
          this.setState({ filtered_boards: workspace_boards });
          return;
        }
      
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filteredBoards = workspace_boards.filter((board) => {
          const lowerCaseName = board.name.toLowerCase();
          return lowerCaseName.startsWith(lowerCaseQuery);
        });
      
        this.setState({ filtered_boards: filteredBoards });
      }
      
      
      
    render() {
        const {
            isLoading,
            workspace,
            workspace_boards,
            filtered_boards,
            users,
            displayAddUser,
            searchQuery,
        } = this.state;

        if (isLoading) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading workspace...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h3 style={{ border: "0px solid red" }}>{workspace['name']}</h3>
                <h4 style={{ border: "0px solid green" }}>{workspace['description']}</h4>
                <div style={{ border: "0px solid blue" }} className="btn-group mt-3" role="group">
                    {localStorage.getItem('is_user') != 'true' &&
                        <button
                            style={{ border: "0px solid cyan" }}
                            className="btn btn-primary"
                            onClick={() => {
                                this.setState({ displayAddUser: !this.state.displayAddUser });
                            }}
                        >
                            Add user to workspace
                        </button>
                    }
                    {localStorage.getItem('is_user') != 'true' &&
                        <a
                            href={`/workspaces/edit/${workspace.id}`}
                            className="btn btn-success"
                            style={{ 'border: "0px solid magenta", margin-left': '10px' }}
                        >
                            Edit workspace
                        </a>
                    }
                    {localStorage.getItem('is_admin') == 'true' &&
                        <button onClick={this.delete} className="btn btn-danger" style={{ 'border: "0px solid yellow", margin-left': '10px' }}>
                            Delete workspace
                        </button>
                    }
                </div>
                <div style={{ border: "0px solid pink" }} className="mt-3">
                    {displayAddUser && <AddUserToWorkspace workspace_id={workspace.id} />}
                </div>
                <div style={{ border: "0px solid purple", borderRadius: "10px", display: "flex", justifyContent: "space-between" }} className="mt-3">
                    <div>
                        <div style={{ border: "0px solid lime" }}>
                            <h4 style={{ border: "0px solid red" }}>
                                {workspace_boards && workspace_boards.length > 0 ? "All workspace boards:" : "This workspace doesn't have boards"}
                            </h4>
                            <div style={{ marginLeft: "10px", alignSelf: "flex-start" }}>
                                <a href={'/boards/add'} className='btn btn-primary'>Add board</a>
                            </div>
                        </div>
                    </div>
                    <div style={{ border: "0px dashed magenta", display: "flex", alignItems: "center" }}>
                        <div style={{ border: "0px dashed lime" }}>
                            <h4 style={{ border: "0px dashed red" }}>Search boards</h4>
                        </div>
                        <div style={{ border: "0px dashed blue", marginLeft: "10px" }}>
                            <input
                                style={{ border: "0px solid #3E187A" }}
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={this.state.searchQuery} 
                                onChange={(e) => {
                                    this.setState({ searchQuery: e.target.value }, this.filterBoards);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-3" style={{ border: "0px solid green", display: "flex", justifyContent: "center", flexWrap: "wrap", height: "100%" }}>
                  {searchQuery.trim() !== "" ? (
                    filtered_boards && filtered_boards.length > 0 ? (
                        filtered_boards.map((board) => (
                            <BoardIndex board={board} className="mt-3" key={board.id} />
                          ))                       
                    ) : (
                      <p>No matching boards found.</p>
                    )
                  ) : (
                    workspace_boards.map((board) => (
                        <BoardIndex board={board} className="mt-3" key={board.id} />
                      ))   
                  )}
                </div>





                {users && (
                    <div style={{ border: "0px solid blue" }} className="mt-4">
                        <h3 style={{ border: "0px solid magenta" }}>Users that have access to this workspace:</h3>
                        <table style={{ border: "0px solid yellow" }} className="table table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Access type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(function (user, key) {
                                    return (
                                        <tr key={key}>
                                            <td scope="col">
                                                <img src={user.image_link} alt='' width="30" height="30" className='rounded-1' />
                                            </td>
                                            <td scope="col">{user.first_name} {user.last_name}</td>
                                            <td scope="col">{user.username}</td>
                                            <td scope="col">{user.email}</td>
                                            <td scope="col">{user.pivot.access_type}</td>
                                            <td scope="col">
                                                <EditUserAccessModal workspace={workspace} user={user} accessType={user.pivot.access_type} />
                                                {localStorage.getItem('is_admin') == 'true' &&
                                                    <button
                                                        onClick={() => {
                                                            deleteUserFromWorkspace(user.id, workspace.id);
                                                        }}
                                                        className="btn btn-danger"
                                                        style={{ 'margin-left': '15px' }}
                                                    >
                                                        Delete
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.workspace.id);

        window.location.href = 'http://localhost:3000/workspaces';
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