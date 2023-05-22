import React from 'react';
import WorkspaceRepository from "../Repository/WorkspaceRepository";
import {SpinningCircles} from "react-loading-icons";

class WorkspaceIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            workspace: props.workspace,
        };
    }

    async componentDidMount() {
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, workspace} = this.state;

        if (isLoading) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Loading workspace...</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SpinningCircles width="50" height="50" fill="#3E187A" />
                </div>
        </div>
        )
        }


        return (
          <div>
            <div className="card" style={{ border: "0px solid lime", height: "100%", background: "linear-gradient(to right, #994ECC, #3E187A)" }}>
              <div className="card-body d-flex flex-column" style={{ border: "0px solid black" }}>
                <div className="d-flex justify-content-between align-items-center" style={{ border: "0px dashed cyan" }}>
                  <div style={{ border: "0px dashed red" }}>
                    <h5 className="card-title" style={{ border: "0px dashed yellow" }}>{workspace['name']}</h5>
                    <p className="card-text" style={{ border: "0px dashed red" }}>
                      {workspace['description'].length > 100
                        ? `${workspace['description'].substring(0, 100)}...`
                        : workspace['description']
                      }
                    </p>
                  </div>
                  <div className="ml-auto d-flex align-items-center" style={{ border: "0px dashed black" }}>
                    <a href={`/workspaces/view/${workspace.id}`} className="btn btn-primary" style={{ backgroundColor: "#994ECC" }}>View workspace</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
        
        
        
          
          
          
          
    }
}

export default WorkspaceIndex;