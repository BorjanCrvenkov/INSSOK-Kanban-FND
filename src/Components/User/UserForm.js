import React from 'react';
import UserRepository from "../Repository/UserRepository";

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            user: null,
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            image: null,
            repository: new UserRepository(),

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

        const data = {
            'first_name': this.state.first_name,
            'last_name': this.state.last_name,
            'username': this.state.username,
            'email': this.state.email,
        };

        if (this.state.image != null) {
            data['image'] = this.state.image;
        }

        if (this.state.password.length !== 0) {
            data['password'] = this.state.password
        }

        let id;

        if (this.state.isEdit) {
            id = this.state.user.id;
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/users/view/' + id
    }

    async componentDidMount() {
        const user_id = window.location.href.split("/").pop();

        if (!isNaN(user_id)) {
            const data = await this.state.repository.view(user_id);
            this.setState({user: data});

            this.setState({first_name: data['first_name']});
            this.setState({last_name: data['last_name']});
            this.setState({username: data['username']});
            this.setState({email: data['email']});
            this.setState({isEdit: true})
        }

        this.setState({isLoading: false})
    }

    imageChange = (e) => {
        e.preventDefault()
        let file = e.target.files[0];
        this.setState({image: file})
    }

    onSubmitForm = (event) => {
        event.preventDefault();

        if (this.state.first_name.trim() === '') {
            alert('First name field cannot be empty');
            return;
        }
    
        if (this.state.last_name.trim() === '') {
            alert('Last name field cannot be empty');
            return;
        }
        
        if (this.state.username.trim() === '') {
            alert('Username field cannot be empty');
            return;
        }

        if (this.state.password.trim() === '') {
            alert('Password field cannot be empty');
            return;
        }

        if (this.state.email.trim() === '') {
            alert('Email field cannot be empty');
            return;
        }
    };
    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && isEdit) {
            return <h1>Loading user...</h1>
        } else if (isLoading && !isEdit) {
            return <h1>Loading user...</h1>
        }

        let heading = isEdit ? <h1>Edit User</h1> : <h1>Register</h1>;

        return (
            <div className="mt-5 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {heading}
                        <form onSubmit={this.onSubmitForm}>

                            <div className="row">
                                <div className="col">
                                    <label>First name</label>
                                    <input type="text" name="first_name" value={this.state.first_name}
                                           onChange={this.onInputchange} className="form-control"/>
                                </div>
                                <div className="col">
                                    <label>Last name</label>
                                    <input type="text" name="last_name" value={this.state.last_name}
                                           onChange={this.onInputchange} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Username</label>
                                    <input type="text" name="username" value={this.state.username}
                                           onChange={this.onInputchange}
                                           className="form-control"/>
                                </div>
                                <div className="col">
                                    <label>Password</label>
                                    <input type="password" name="password" value={this.state.password}
                                           onChange={this.onInputchange} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Email</label>
                                    <input type="email" name="email" value={this.state.email}
                                           onChange={this.onInputchange}
                                           className="form-control"/>
                                </div>
                                <div className="col">
                                    <label>Image</label>
                                    <input type="file" name="image" onChange={this.imageChange}
                                           className="form-control"/>
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

export default UserForm;