import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import {SpinningCircles} from "react-loading-icons";

class BoardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            board: null,
            name: '',
            description: '',
            workspace_id: '',
            task_prefix: '',
            repository: new BoardRepository(),
            workspaces: null,
            workspacesRepository: new WorkspaceRepository()

        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onSubmitForm(e) {
        e.preventDefault();

        const {name, description, workspace_id, task_prefix} = this.state;

        if (!name.trim()) {
            alert('Name field cannot be empty');
            return;
        }

        if (!description.trim()) {
            alert('Description field cannot be empty');
            return;
        }

        if (!workspace_id) {
            alert('Please select a workspace');
            return;
        }

        if (!task_prefix.trim()) {
            alert('Task Prefix field cannot be empty');
            return;
        }

        const data = {
            'name': name,
            'description': description,
            'workspace_id': workspace_id,
            'task_prefix': task_prefix,
        };

        let id;

        if (this.state.isEdit) {
            id = this.state.board.id;
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/boards/view/' + id
    }

    async componentDidMount() {
        const board_id = window.location.href.split("/").pop();

        let fetchedWorkspaces = await this.state.workspacesRepository.index(null, null, null);
        this.setState({workspaces: fetchedWorkspaces});

        if (!isNaN(board_id)) {
            const data = await this.state.repository.view(board_id);
            this.setState({board: data});

            this.setState({name: data['name']});
            this.setState({description: data['description']});
            this.setState({workspace_id: data['workspace_id']});
            this.setState({task_prefix: data['task_prefix']});
            this.setState({isEdit: true})
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit, workspace_id} = this.state;

        if (isLoading && isEdit) {
            return <div>
                <h1 className='d-inline'>Loading board...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        } else if (isLoading && !isEdit) {
            return <div>
                <h1 className='d-inline'>Loading form...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        let workspaces = this.state.workspaces;
        let heading = isEdit ? <h1 className="mb-4">Edit Board</h1> : <h1 className="mb-4">Add Board</h1>;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {heading}
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onInputchange}
                                       className="form-control" id="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" value={this.state.description}
                                       onChange={this.onInputchange} className="form-control" id="description"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="workspace_id">Workspace</label>
                                <select name="workspace_id" onChange={this.onInputchange} defaultValue={workspace_id}
                                        className="form-select" id="workspace_id">
                                    <option></option>
                                    {workspaces.map(function (workspace, key) {
                                        return <option value={workspace.id}>{workspace.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="task_prefix">Task Prefix</label>
                                <input type="text" name="task_prefix" value={this.state.task_prefix}
                                       onChange={this.onInputchange} className="form-control" id="task_prefix"/>
                            </div>

                            <button className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default BoardForm;