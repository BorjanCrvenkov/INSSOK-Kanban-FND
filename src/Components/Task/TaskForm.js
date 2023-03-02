import React from 'react';
import TaskRepository from "../Repository/TaskRepository";
import ColumnRepository from "../Repository/ColumnRepository";

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            task: null,
            title: '',
            description: '',
            priority: '',
            due_date: '',
            type: '',
            column_id: '',
            reporter_id: '',
            assignee_id: '',
            repository: new TaskRepository(),
            columns: null,
            columnRepository: new ColumnRepository(),
            reporters: null,
            assignees: null,
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onSubmitForm() {
        const data = {
            'title': this.state.title,
            'description': this.state.description,
            'priority': this.state.priority,
            'due_date': this.state.due_date,
            'type': this.state.type,
            'column_id': this.state.column_id,
            'reporter_id': this.state.reporter_id,
            'assignee_id': this.state.assignee_id
        };

        let id = this.state.task != null ? this.state.task.id : null;

        if (this.state.isEdit) {
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/tasks/view/' + id
    }

    async componentDidMount() {
        const task_id = window.location.href.split("/").pop();

        let fetchedColumns = await this.state.columnRepository.index(null, null, null);
        this.setState({columns: fetchedColumns});

        if (!isNaN(task_id)) {
            const data = await this.state.repository.view(task_id);
            this.setState({task: data});

            this.setState({name: data['title']});
            this.setState({description: data['description']});
            this.setState({priority: data['priority']});
            this.setState({due_date: data['due_date']});
            this.setState({type: data['type']});
            this.setState({column_id: data['column_id']});
            this.setState({reporter_id: data['reporter_id']});
            this.setState({assignee_id: data['assignee_id']});
            this.setState({isEdit: true});
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit, workspace_id} = this.state;

        if (isLoading && !isEdit) {
            return <h1>Loading task...</h1>
        }

        let columns = this.state.columns;

        return (
            <div>
                <h1>Edit task</h1>
                <label>Title</label>
                <input type="text" name="title" value={this.state.title} onChange={this.onInputchange}/>
                <label>Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.onInputchange}/>
                <label>Priority</label>
                <input type="text" name="priority" value={this.state.priority} onChange={this.onInputchange}/>
                <label>Due Date</label>
                <input type="text" name="due_date" value={this.state.due_date} onChange={this.onInputchange}/>
                <label>Type</label>
                <input type="text" name="type" value={this.state.type} onChange={this.onInputchange}/>
                <label>Column</label>
                <select name="column_id" onChange={this.onInputchange} defaultValue={this.state.column_id}>
                    {columns.map(function (column, key) {
                            return <option value={column.id}>{column.name}</option>
                    })}
                </select>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

export default TaskForm;