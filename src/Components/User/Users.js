import React from 'react';
import UserRepository from "../Repository/UserRepository";
import User from "./User";
import UserIndex from "./UserIndex";
import {SpinningCircles} from "react-loading-icons";

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
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading users...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        if (!users.length) {
            return <h1>No users.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Users</h1>
                    <a href={'/users/add'} className="btn btn-primary">Add new user</a>
                </div>
                <div className="row mt-3">
                {users.map(function (user, key) {
                    return <UserIndex user={user}/>
                })}
                </div>
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