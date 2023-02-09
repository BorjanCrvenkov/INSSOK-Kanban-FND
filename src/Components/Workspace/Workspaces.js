import React from 'react';
import Workspace from "./Workspace";
import {index} from "../Repository/WorkspaceRepository";

class Workspaces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspaces: undefined,
        }
    }

    async componentDidMount() {
        const data = await index();
        this.setState({workspaces: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, workspaces} = this.state;

        if (isLoading) {
            return <h1>Loading workspaces...</h1>
        }

        if (!workspaces.length) {
            return <h1>No workspaces.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Workspaces</h1>
                    <a href={'/workspaces/add'}>Add workspace</a>
                </div>
                {workspaces.map(function (workspace, key) {
                    return <Workspace workspace={workspace}/>
                })}
            </div>
        )
    }
}

export default Workspaces;