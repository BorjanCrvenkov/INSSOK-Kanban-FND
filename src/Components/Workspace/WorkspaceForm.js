import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import {SpinningCircles} from "react-loading-icons";

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

    async onSubmitForm(e) {
        e.preventDefault();

        if (this.state.name.trim() === '') {
            alert('Name field cannot be empty');
            return;
        }

        if (this.state.description.trim() === '') {
            alert('Description field cannot be empty');
            return;
        }

        const data = {
            'name': this.state.name,
            'description': this.state.description
        };

        let id;

        if (this.state.isEdit) {
            id = this.state.workspace.id;
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/workspaces/view/' + id
    }

    async componentDidMount() {
        const workspace_id = window.location.href.split("/").pop();

        if (!isNaN(workspace_id)) {
            const data = await this.state.repository.view(workspace_id);
            this.setState({workspace: data});

            this.setState({name: data['name']});
            this.setState({description: data['description']});
            this.setState({isEdit: true})
        }
        this.setState({isLoading: false})
    }
      
    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && isEdit) {
            return <div>
                <h1 className='d-inline'>Loading form...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        } else if (isLoading && !isEdit) {
            return <div>
                <h1 className='d-inline'>Loading form...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        let heading = isEdit ? <h1>Edit Workspace</h1> : <h1>Add Workspace</h1>;

        return (
            <div>
                {heading}
                <div>
                    <form onSubmit={this.onSubmitForm}>
                        <label className="mt-2">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onInputchange}
                               className="form-control"/>
                        <label className="mt-2">Description</label>
                        <textarea name="description" value={this.state.description}
                               onChange={this.onInputchange} className="form-control"/>
                        <button onClick={this.onSubmitForm} className='btn btn-primary mt-3'>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default WorkspaceForm;