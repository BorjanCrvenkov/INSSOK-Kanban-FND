import React from 'react';
import UserRepository from "../Repository/UserRepository";
import User from "./User";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            columns: undefined,
            repository: new UserRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
        this.setState({users: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, users} = this.state;

        if (isLoading) {
            return <h1>Loading users...</h1>
        }

        if (!users.length) {
            return <h1>No users.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Users</h1>
                    <a href={'/users/add'}>Add new user</a>
                </div>
                {users.map(function (user, key) {
                    return <User user={user}/>
                })}
            </div>
        );
    };
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

export default Users;