import React from 'react';
import TaskRepository from "../Repository/TaskRepository";

class TaskAssignee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            repository: new TaskRepository(),
            authUser: JSON.parse(JSON.parse(localStorage.getItem('user'))),
        };

        this.assign = this.assign.bind(this);
    }

    async assign(){
        let task = this.state.task;

        task.assignee=this.state.authUser;

        this.setState({task: task});

        this.state.repository.update(task.id, JSON.stringify({
            'assignee_id': this.state.authUser.id,
        }));
    }

    render() {
        let assignee = this.state.task.assignee ?? null;

        let authUser = this.state.authUser;

        return (
            <div>
                <label className="font-weight-bold">Assignee:</label>

                {assignee && <p>
                    <div className="mt-2">
                        <img className="card-img-top d-inline rounded-1"
                             style={{width: "30px", height: "30px"}}
                             src={assignee['image_link']}/>
                        <p className='d-inline'
                           style={{'margin-left': '10px'}}>{assignee.first_name} {assignee.last_name}</p>
                    </div>
                </p>}

                {
                    (!assignee || assignee.id != authUser.id) &&
                        <div>
                            <button className="btn btn-primary mt-1" onClick={this.assign}>Assign to me</button>
                        </div>

                }
            </div>
        );
    }
}


export default TaskAssignee;
