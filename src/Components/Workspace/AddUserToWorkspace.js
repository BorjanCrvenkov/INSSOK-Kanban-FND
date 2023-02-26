import React from "react";
import UserWorkspaceRepository from "../Repository/UserWorkspaceRepository";
import UserRepository from "../Repository/UserRepository";

class AddUserToWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'workspace_id': props.workspace_id,
            'repository': new UserWorkspaceRepository(),
            'user_repository': new UserRepository(),
            'email': '',
            'access_type': AccessType.USER,
            'error': null,
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
        e.preventDefault()
        this.setState({error: null})
        let email = this.state.email;

        let users = await this.state.user_repository.findByEmail(email);
        let user = users[0];

        if (user == null) {
            this.setState({error: 'User with the provided email doesnt exist!'})
            return;
        }

        let workspace_id = this.state.workspace_id;

        let result = await this.state.repository.findByUserIdAndWorkspaceId(user.id, workspace_id);

        if(result != null){
            this.setState({error: 'User already has access to this workspace!'})
        }

        let data = {
            'workspace_id': workspace_id,
            'user_id': user.id,
            'access_type': this.state.access_type,
        };

        let id = await this.state.repository.add(data);

        if (id == null) {
            this.setState({error: 'Error'})
            return;
        }

        window.location.href = 'http://localhost:3000/workspaces/view/' + workspace_id

    }

    render() {
        let {error} = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <h3>Add user to workspace</h3>
                    {error}
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.onInputchange}/>
                    <label>Access type</label>
                    <select name="access_type" onChange={this.onInputchange}>
                        <option value={AccessType.USER} selected>User</option>
                        <option value={AccessType.MANAGER}>Manager</option>
                        <option value={AccessType.ADMIN}>Admin</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>

            </div>
        )
    }
}

const AccessType = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
};

export default AddUserToWorkspace;