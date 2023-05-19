import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository"
import WorkspaceIndex from "./WorkspaceIndex";
import {SpinningCircles} from "react-loading-icons";

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
            return <div>
                <h1 className='d-inline'>Loading workspaces...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        if (!workspaces.length) {
            return <h1>No workspaces.</h1>
        }

        return (
            <div style={{ border: "0px solid red", padding: "10px" }}>
              <div style={{ border: "0px solid magenta", padding: "10px" }}>
                <h1>Workspaces</h1>
                {localStorage.getItem('is_user') !== 'true' && (
                  <a href="/workspaces/add" className="btn btn-primary mt-3">Add workspace</a>
                )}
              </div>
              <div className="row mt-3" style={{ border: "0px solid green", padding: "10px" }}>
                {workspaces.map(function (workspace, key) {
                  return (
                    <div className="col-md-4 mb-3" key={key}>
                      <div style={{ border: "0px solid blue", padding: "10px", height: "100%" }}>
                        <WorkspaceIndex workspace={workspace} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
          
          
          
          
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