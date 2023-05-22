import React from 'react';
import RoleRepository from "../Repository/RoleRepository";
import {SpinningCircles} from "react-loading-icons";

class RoleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            role: null,
            name: '',
            repository: new RoleRepository(),

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

        const data = {
            'name': this.state.name
        };

        let id;

        if (this.state.isEdit) {
            id = this.state.role.id;
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/roles/view/' + id
    }

    async componentDidMount() {
        const role_id = window.location.href.split("/").pop();

        if (!isNaN(role_id)) {
            const data = await this.state.repository.view(role_id);
            this.setState({ role: data });

            this.setState({ name: data['name'] });
            this.setState({ isEdit: true })
        }

        this.setState({ isLoading: false })
    }

    imageChange = (e) => {
        e.preventDefault()
        let file = e.target.files[0];
        this.setState({ image: file })
    }

    render() {
        const { isLoading, isEdit } = this.state;

        if (isLoading && isEdit) {
            return <div>
                <h1 className='d-inline'>Loading role...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        } else if (isLoading && !isEdit) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading role...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        let heading = isEdit ? <h1>Edit Role</h1> : <h1>Add Role</h1>;

        return (
            <div className="mt-5 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {heading}
                        <form onSubmit={this.onSubmitForm}>

                            <div className="row">
                                <div className="col">
                                    <label>Role Name</label>
                                    <input type="text" name="name" value={this.state.name}
                                        onChange={this.onInputchange} className="form-control" />
                                </div>
                            </div>
                            <button type='submit' className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    uploadPicture = (e) => {
        this.setState({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        })
    };
}

export default RoleForm;