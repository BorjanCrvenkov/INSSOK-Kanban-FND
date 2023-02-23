import React from 'react';
import UserRepository from "../Repository/UserRepository";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: props.user,
            isView: false,
            repository: new UserRepository(),
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {

        if (this.state.user == null) {
            let data = await this.fetchUserAndReturnData();

            this.setState({user: data});
            this.setState({isView: true})
        }

        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.user.id);

        window.location.href = 'http://localhost:3000/users'
    }

    render() {
        const {isLoading, user} = this.state;

        if (isLoading) {
            return <h1>Loading user...</h1>
        }

        const link = this.getEditOrAddLink(user);

        return (
            <div>
                {link}
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <img src={user.image_link} />
            </div>
        );
    }

    getEditOrAddLink(user) {
        return this.state.isView ? <a href={`/users/edit/${user.id}`}>Edit user</a>
            : <a href={`/users/view/${user.id}`}>View user</a>;
    }

    async fetchUserAndReturnData(){
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const user_id = window.location.href.split("/").pop();
        return await this.state.repository.view(user_id, filters, sorts, includes);
    }
}

function getFilters() {
    return null;
}

function getSorts() {
    return null;
}

function getIncludes() {
    return null;
}

export default User;