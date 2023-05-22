import React from 'react';
import RoleRepository from "../Repository/RoleRepository";
import {SpinningCircles} from "react-loading-icons";

class Role extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            role: props.role,
            isView: false,
            repository: new RoleRepository(),
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.role == null) {

            let data = await this.fetchTaskAndReturnData();
            this.setState({role: data});
            this.setState({isView: true});
        }

        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.role.id);

        window.location.href = 'http://localhost:3000/roles'
    }

    render() {
        const {isLoading, role, isView} = this.state;

        if (isLoading) {
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

        const link = isView ? <a href={`/roles/edit/${role.id}`}>Edit role</a>
            : <a href={`/roles/view/${role.id}`}>View role</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete role</button> : '';

        return (
            <div>
                <h3>{role['name']}</h3>
                {link}
                {delete_button}
            </div>
        );
    }

    async fetchTaskAndReturnData(){
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const task_id = window.location.href.split("/").pop();
        return await this.state.repository.view(task_id, filters, sorts, includes);
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

export default Role;