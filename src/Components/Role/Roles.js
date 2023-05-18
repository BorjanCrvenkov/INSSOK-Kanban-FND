import React from 'react';
import Role from "./Role";
import RoleRepository from "../Repository/RoleRepository";
import {SpinningCircles} from "react-loading-icons";


class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            roles: undefined,
            repository: new RoleRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
        this.setState({roles: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, roles} = this.state;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading roles...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        if (!roles.length) {
            return <h1>No roles.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Roles</h1>
                    <a href={'/roles/add'}>Add role</a>
                </div>
                {roles.map(function (role, key) {
                    return <Role role={role}/>
                })}
            </div>
        )
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

export default Roles;