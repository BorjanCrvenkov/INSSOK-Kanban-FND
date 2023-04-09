import React from 'react';
import TaskRepository from "../Repository/TaskRepository";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            task: props.task,
            isView: false,
            repository: new TaskRepository(),
            column: null,
            reporter: null,
            assignee: null,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.task == null) {

            let data = await this.fetchTaskAndReturnData();
            this.setState({task: data});
            this.setState({column: data.column});
            this.setState({reporter: data.reporter});
            this.setState({assignee: data.assignee});
            this.setState({isView: true});
        }
        this.setState({column: this.state.column})
        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.task.id);

        window.location.href = 'http://localhost:3000/tasks'
    }

    render() {
        const {isLoading, task, isView, column, reporter, assignee} = this.state;

        if (isLoading) {
            return <h1>Loading task...</h1>
        }

        const link = isView ? <a href={`/tasks/edit/${task.id}`} className="btn btn-primary">Edit task</a>
            : <a href={`/tasks/view/${task.id}`} className="btn btn-primary">View task</a>;

        const delete_button = isView ? <button onClick={this.delete} className="btn btn-danger">Delete task</button> : '';

        return (
            <div className="card bg-light mb-3">
                <div className="card-header"><h3>{task['title']}</h3></div>
                <div className="card-body">
                    <h4 className="card-text">{task['description']}</h4>
                    <p className="card-text">Priority: {task['priority']}</p>
                    <p className="card-text">Due date: {task['due_date']}</p>
                    <p className="card-text">Type: {task['type']}</p>
                    {column &&
                    <h5 className="card-title">Column name: {column.name}</h5>
                    }
                    {reporter &&
                    <h5 className="card-title">Reporter name: {reporter.name}</h5>
                    }
                    {assignee &&
                    <h5 className="card-title">Assignee name: {assignee.name}</h5>
                    }
                    <div className="d-flex justify-content-between">
                        {link}
                        {delete_button}
                    </div>
                </div>
            </div>
        );
    }

    async fetchTaskAndReturnData(){
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const task_id = window.location.href.split("/").pop();
        return await this.state.repository.view(task_id, filters, sorts, includes);
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

export default Task;
