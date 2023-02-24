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
        e.preventDefault()

        const data = {
            'first_name': this.state.first_name,
            'last_name': this.state.last_name,
            'username': this.state.username,
            'email': this.state.email,
        };

        if(this.state.image != null){
            data['image'] = this.state.image;
        }

        if(this.state.password.length !== 0){
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

    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && isEdit) {
            return <h1>Loading user...</h1>
        }else if (isLoading && !isEdit) {
            return <h1>Loading user...</h1>
        }

        let heading = isEdit ? <h1>Edit User</h1> : <h1>Add User</h1>;

        return (
            <div>
                {heading}
                <form onSubmit={this.onSubmitForm}>
                    <label>First name</label>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.onInputchange}/>
                    <label>Last name</label>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.onInputchange}/>
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.onInputchange}/>
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.onInputchange}/>
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.onInputchange}/>
                    <label>Image</label>
                    <input type="file" name="image" onChange={this.imageChange}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }

    uploadPicture = (e) => {
        this.setState({
            picturePreview : URL.createObjectURL(e.target.files[0]),
            pictureAsFile : e.target.files[0]
        })
    };
}

export default UserForm;