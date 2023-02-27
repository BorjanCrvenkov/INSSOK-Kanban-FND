import React from 'react';
import Workspace from "./Workspace";
import WorkspaceRepository from "../Repository/WorkspaceRepository"
import WorkspaceIndex from "./WorkspaceIndex";

class Workspaces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspaces: undefined,
            repository: new WorkspaceRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
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
                    <a href={'/workspaces/add'} className='btn btn-primary mt-3'>Add workspace</a>
                </div>
                <div className="row mt-3">
                {workspaces.map(function (workspace, key) {
                    return <WorkspaceIndex workspace={workspace}/>
                })}
                </div>
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

export default Workspaces;