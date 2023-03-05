import React from "react";


class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
        }
    }

    render() {
        // style="max-width: 18rem;"
        const {task} = this.state;
        return(
                <div>
                    <div className="card bg-light mb-3" style={{'width': '250px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{task['title']}</h5>
                            <p className="card-text">{task['priority']}</p>
                        </div>
                    </div>
                </div>
        )
    }
}

export default TaskItem;