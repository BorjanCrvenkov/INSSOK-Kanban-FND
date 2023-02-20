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

            let data = await this.fetchBoardAndReturnData();
            this.setState({task: data});
            this.setState({column: data.column});
            this.setState({reporter: data.reporter});
            this.setState({assignee: data.assignee});
            this.setState({isView: true});
        }
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

        const link = isView ? <a href={`/tasks/edit/${task.id}`}>Edit task</a>
            : <a href={`/tasks/view/${task.id}`}>View task</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete task</button> : '';

        return (
            <div>
                <h3>{board['title']}</h3>
                <h4>{board['description']}</h4>
                <h4>{board['priority']}</h4>
                <h4>{board['due_date']}</h4>
                <h4>{board['type']}</h4>
                {column &&
                <h3>Column name: {column.name}</h3>
                }
                {reporter &&
                <h3>Reporter name: {reporter.name}</h3>
                }
                {assignee &&
                <h3>Assignee name: {assignee.name}</h3>
                }
                {link}
                {delete_button}
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
        'columns',
        'reporters',
        'assignees'
    ];
}

export default Task;