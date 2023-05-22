import React from 'react';
import Task from "./Task";
import TaskRepository from "../Repository/TaskRepository"
import {SpinningCircles} from "react-loading-icons";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tasks: undefined,
            repository: new TaskRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
        this.setState({tasks: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, tasks} = this.state;

        if (isLoading) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        if (!tasks.length) {
            return <h1>No tasks.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Tasks</h1>
                    <a href={'/tasks/add'} className="btn btn-primary">Add task</a>
                </div>
                <br></br>
                {tasks.map(function (task, key) {
                    return <Task task={task}/>
                })}
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
    return [
        'reporter',
        'assignee'
    ];
}

export default Tasks;
