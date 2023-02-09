import React from 'react';
import {view, update, add} from "../Repository/WorkspaceRepository";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


class WorkspaceEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            workspace: null,
            name: null,
            description: null,
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

        if(this.state.isEdit){
            await updateWorkspace(this.state.workspace['id'], data)
        }else{
            await addWorkspace(data)
        }
    }

    async componentDidMount() {
        const workspace_id = window.location.href.split("/").pop();

        if(!isNaN(workspace_id)){
            const data = await view(workspace_id);
            this.setState({workspace: data});

            this.setState({name: data['name']});
            this.setState({description: data['description']});
            this.setState({isEdit: true})
        }
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, workspace, isEdit} = this.state;

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
    await update(id, data)

    window.location.href = 'http://localhost:3000/workspaces/view/' + id
}

async function addWorkspace(data) {
    const id = await add( data)

    window.location.href = 'http://localhost:3000/workspaces/view/' + id
}

export default WorkspaceEdit;