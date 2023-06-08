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
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Loading workspaces...</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SpinningCircles width="50" height="50" fill="#3E187A" />
                </div>
        </div>
        )
      }
      
      

        if (!workspaces.length) {
            return <h1>No workspaces.</h1>
        }

        return (
          <div style={{ border: "0px solid red", padding: "10px" }}>

            <div style={{ background: "linear-gradient(to right, #994ECC, #3E187A)", border: "0px solid magenta", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "10px" }}>
              <h1 style={{ border: "0px dashed black", color: "white" }}>Workspaces</h1>
              <div style={{ display: "flex", alignItems: "center", border: "0px dashed green" }}>
                {localStorage.getItem('is_user') !== 'true' && (
                  <div className="ml-auto">
                    <a href="/workspaces/add" className="btn btn-primary" style={{ backgroundColor: "#994ECC", border: "0px dashed green", fontSize: "20px", padding: "10px 20px" }}>Add workspace</a>
                  </div>
                )}
              </div>
            </div>


                

            <ol className="mt-3" style={{ border: "0px solid green", padding: "10px", listStyleType: "decimal" }}>
              {workspaces.map(function (workspace, key) {
                return (
                  <li key={key}>
                    <div style={{ border: "0px solid blue", padding: "10px", marginBottom: "10px" }}>
                      <WorkspaceIndex workspace={workspace} />
                    </div>
                  </li>
                );
              })}
            </ol>
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