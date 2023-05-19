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
            return <div>
                <h1 className='d-inline'>Loading workspace...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        return (
            <div>
              <div className="card" style={{ border: "0px dashed yellow", height: "100%", background: "linear-gradient(to right, #ff82ba, #82baff)" }}>
                <div className="card-body d-flex flex-column justify-content-between" style={{ border: "0px dashed cyan" }}>
                  <h5 className="card-title">{workspace['name']}</h5>
                  <p className="card-text">{workspace['description']}</p>
                  <a href={`/workspaces/view/${workspace.id}`} className="btn btn-primary">View workspace</a>
                </div>
              </div>
            </div>
          );
          
          
          
          
    }
}

export default WorkspaceIndex;