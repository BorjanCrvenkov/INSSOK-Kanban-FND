import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import Workspace from "./Workspace";

class WorkspaceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            workspace: null,
            name: '',
            description: '',
            repository: new WorkspaceRepository(),

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
            'description': this.state.description
        };

        let id = this.state.workspace.id;

        if(this.state.isEdit){
            await this.state.repository.update(id, data)
        }else{
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/workspaces/view/' + id
    }

    async componentDidMount() {
        const workspace_id = window.location.href.split("/").pop();

        if(!this.state.workspace){
            const data = await this.state.repository.view(workspace_id)
            this.setState({workspace: data});

            this.setState({name: data['name']});
            this.setState({description: data['description']});
            this.setState({isEdit: true})
        }
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && !isEdit) {
            return <h1>Loading workspace...</h1>
        }

        return (
            <div>
                <h1>Edit Workspace</h1>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onInputchange}/>
                <label>Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.onInputchange}/>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

async function updateWorkspace(id, data) {

}

async function addWorkspace(data) {

}

export default WorkspaceForm;