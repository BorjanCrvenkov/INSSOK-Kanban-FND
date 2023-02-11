import React from 'react';
import {deleteWorkspace, view} from "../Repository/WorkspaceRepository";

class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspace: props.workspace,
            isView: false
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.workspace == null) {
            const workspace_id = window.location.href.split("/").pop();
            const data = await view(workspace_id);
            this.setState({workspace: data});
            this.setState({isView: true})
        }
        this.setState({isLoading: false})
    }

    async delete(){
        await deleteWorkspace(this.state.workspace['id']);

        window.location.href = 'http://localhost:3000/workspaces'
    }

    render() {
        const {isLoading, workspace, isView} = this.state;

        if (isLoading) {
            return <h1>Loading workspace...</h1>
        }

        const link = isView ? <a href={`/workspaces/edit/${workspace.id}`}>Edit workspace</a>
            : <a href={`/workspaces/view/${workspace.id}`}>View workspace</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete workspace</button> : '' ;

        return (
            <div>
                <h3>{workspace['name']}</h3>
                <h4>{workspace['description']}</h4>
                {link}
                {delete_button}

            </div>
        );
    }
}

export default Workspace;