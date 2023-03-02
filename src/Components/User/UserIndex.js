import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";

class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: props.user,
        };
    }

    async componentDidMount() {
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, user} = this.state;

        if (isLoading) {
            return <h1>Loading user...</h1>
        }

        return (
            <div className="col-sm-4 card m-3" style={{width: '25rem'}}>
                <img className="card-img-top" src={user['image_link']}/>
                <div className="card-body d-flex flex-column ">
                    <h5 className="card-title">{user['first_name']} {user['last_name']}</h5>
                    <p className="card-text">{user['email']}</p>
                    <a href={`/users/view/${user.id}`} className="btn btn-primary mt-auto">View user</a>
                </div>
            </div>
        );
    }
}

export default UserIndex;