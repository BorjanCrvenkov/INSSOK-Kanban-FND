import React from 'react';
import Task from "./Task";
import TaskRepository from "../Repository/TaskRepository"

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
        const data = await this.state.repository.index(null, null, null);
        this.setState({tasks: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, tasks} = this.state;

        if (isLoading) {
            return <h1>Loading tasks...</h1>
        }

        if (!tasks.length) {
            return <h1>No tasks.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Tasks</h1>
                    <a href={'/tasks/add'}>Add task</a>
                </div>
                {tasks.map(function (task, key) {
                    return <Task task={task}/>
                })}
            </div>
        )
    }
}

export default Tasks;