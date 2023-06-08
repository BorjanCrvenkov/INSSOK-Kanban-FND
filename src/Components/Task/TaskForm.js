import React from 'react';
import TaskRepository from "../Repository/TaskRepository";
import {SpinningCircles} from "react-loading-icons";

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
            reporter_id: '',
            assignee_id: '',
            repository: new TaskRepository(),
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

    async onSubmitForm(e) {
        e.preventDefault();

        const {title, description, priority, due_date, type} = this.state;

        if (!title || !description || !priority || !due_date || !type) {
            alert("Please fill out all fields.");
            return;
        }

        if (title.length > 50) {
            alert("Title cannot exceed 50 characters.");
            return;
        }

        const data = {
            'title': this.state.title,
            'description': this.state.description,
            'priority': this.state.priority,
            'due_date': this.state.due_date,
            'type': this.state.type,
            'reporter_id': this.state.reporter_id,
            'assignee_id': this.state.assignee_id
        };

        let id = this.state.task != null ? this.state.task.id : null;

        await this.state.repository.update(id, JSON.stringify(data))

        window.location.href = 'http://localhost:3000/boards/view/' + this.state.task.column.board_id
    }

    async componentDidMount() {
        const task_id = window.location.href.split("/").pop();

        if (!isNaN(task_id)) {
            const data = await this.state.repository.view(task_id, null, null, getIncludes());
            this.setState({task: data});

            this.setState({title: data.title});
            this.setState({description: data['description']});
            this.setState({priority: data['priority']});
            this.setState({due_date: data['due_date']});
            this.setState({type: data['type']});
            this.setState({reporter_id: data['reporter_id']});
            this.setState({assignee_id: data['assignee_id']});
            this.setState({isEdit: true});
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{textAlign: 'center'}}>Loading task...</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <SpinningCircles width="50" height="50" fill="#3E187A"/>
                    </div>
                </div>
            )
        }

        return (
            <div className="container mt-5">
                <h1 className="mb-4">{isEdit ? 'Edit Task' : 'Add Task'}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onInputchange}
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onInputchange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select name="priority" onChange={this.onInputchange} className="form-control"
                                defaultValue={this.state.priority}>
                            <option value={Priority.LOWEST}>Lowest</option>
                            <option value={Priority.LOW}>Low</option>
                            <option value={Priority.MEDIUM} selected>Medium</option>
                            <option value={Priority.HIGH}>High</option>
                            <option value={Priority.HIGHEST}>Highest</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="due_date" className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="due_date"
                            name="due_date"
                            value={this.state.due_date}
                            onChange={this.onInputchange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select name="type" onChange={this.onInputchange} className="form-control"
                                defaultValue={this.state.type}>
                            <option value={Type.STORY} selected>Story</option>
                            <option value={Type.TASK}>Task</option>
                            <option value={Type.BUG}>Bug</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

function getIncludes() {
    return [
        'column'
    ]
}

const Priority = {
    LOWEST: 'lowest',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    HIGHEST: 'highest',
};

const Type = {
    STORY: 'story',
    TASK: 'task',
    BUG: 'bug'
}

export default TaskForm;