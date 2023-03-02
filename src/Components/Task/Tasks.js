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