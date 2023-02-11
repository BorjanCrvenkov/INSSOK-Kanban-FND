import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import WorkspaceRepository from "../Repository/WorkspaceRepository";

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

    async onSubmitForm() {
        const data = {
            'name': this.state.name,
            'description': this.state.description,
            'workspace_id': this.state.workspace_id
        };

        let id = this.state.board.id;

        if (this.state.isEdit) {
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
            this.setState({workspace_id: data['workspace_id']})
            this.setState({isEdit: true})
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit, workspace_id} = this.state;

        if (isLoading && !isEdit) {
            return <h1>Loading board...</h1>
        }

        let workspaces = this.state.workspaces;

        return (
            <div>
                <h1>Edit board</h1>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onInputchange}/>
                <label>Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.onInputchange}/>
                <label>Workspace</label>
                <select name="workspace_id" onChange={this.onInputchange} defaultValue={workspace_id}>
                    {workspaces.map(function (workspace, key) {
                            return <option value={workspace.id}>{workspace.name}</option>
                    })}
                </select>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

export default BoardForm;