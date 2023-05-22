import React from 'react';
import UserRepository from "../Repository/UserRepository";
import {SpinningCircles} from "react-loading-icons";

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

        if(window.location.href.split("/").pop() === 'me'){
            let user = await this.state.repository.getAuthUserInfo();

            this.setState({user: user});
        }else if(this.state.user == null) {
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
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading user...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        const link = this.getEditOrAddLink(user);

        return (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="profile-card" style={{ border: "0px solid blue", width: "100%" }}>
                    <div className="profile-image" style={{ border: "0px solid red" }}>
                      <img src={user['image_link']} alt="Profile Image" style={{ width: "300px", height: "300px" }} />
                    </div>
                    <div className="profile-details" style={{ border: "0px solid green" }}>
                      <h2 style={{ border: "0px solid yellow" }}>{user['first_name']} {user['last_name']}</h2>
                      <p style={{ border: "0px solid orange" }}>{user['email']}</p>
                    </div>
                    <div className="profile-actions" style={{ border: "0px solid purple" }}>
                      <a href={`/users/edit/${user.id}`} className="btn btn-primary" style={{ border: "0px solid pink" }}>Edit User</a>
                    </div>
                  </div>
                </div>
              </div>
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