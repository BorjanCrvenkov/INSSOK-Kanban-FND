import * as React from "react";
import UserWorkspaceRepository from "../Repository/UserWorkspaceRepository";

class UserWorkspaceForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            workspace: props.workspace,
            user: props.user,
            accessType: '',
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    closeModal(){
        this.props.toggleModal()
    }

    async onSubmitForm(e) {
        e.preventDefault();
        const data = {
            'access_type': this.state.accessType,
        };

        let repository = new UserWorkspaceRepository();

        await repository.update(this.state.user.pivot.id, JSON.stringify(data));
        this.closeModal();
        window.location.reload(false);
    }

    render() {
        const {workspace, user} = this.state;

        return <>
            <p>
                Workspace name: {workspace.name}
            </p>
            <p>
                User name: {user.first_name} {user.last_name}
            </p>
            <select name="accessType" onChange={this.onInputchange} className="form-control" defaultValue={user.pivot.access_type}>
                <option value={accessTypes.admin}>Administrator</option>
                <option value={accessTypes.manager}>Manager</option>
                <option value={accessTypes.user}>User</option>
            </select>

            <button className='btn btn-primary mt-3' onClick={this.onSubmitForm}>Submit</button>
        </>
    }
}

const accessTypes = {
    'admin': 'admin',
    'manager': 'manager',
    'user': 'user',
};

export default UserWorkspaceForm;