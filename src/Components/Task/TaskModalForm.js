import React from 'react';
import TaskRepository from "../Repository/TaskRepository";
import UserRepository from "../Repository/UserRepository";

class TaskModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            priority: Priority.MEDIUM,
            due_date: '',
            type: Type.STORY,
            reporter_id: '',
            assignee_id: '',
            repository: new TaskRepository(),
            columns: null,
            reporters: null,
            assignees: null,
            column: props.column,
            workspace_id: props.workspace_id,
            users: [],
            isLoading: true,
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    async componentDidMount() {
        let users = await this.fetchUsersForWorkspace();

        this.setState({users: users})
        this.setState({isLoading: false})
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    closeModal(){
        this.props.toggleModal()
    }

    async onSubmitForm(e) {
        e.preventDefault();
        const data = {
            'title': this.state.title,
            'description': this.state.description,
            'priority': this.state.priority,
            'due_date': this.state.due_date,
            'type': this.state.type,
            'column_id': this.state.column.id,
            'reporter_id': this.state.reporter_id,
            'assignee_id': this.state.assignee_id
        };

        await this.state.repository.add(data);
        this.closeModal()
        window.location.reload(true);
    }


    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <h1>Loading form...</h1>
        }

        return (
            <div>
                <label>Title</label>
                <input className="form-control" type="text" name="title" value={this.state.title}
                       onChange={this.onInputchange}/>
                <label>Description</label>
                <input className="form-control" type="text" name="description" value={this.state.description}
                       onChange={this.onInputchange}/>
                <label>Priority</label>
                <select name="priority" onChange={this.onInputchange} className="form-control">
                    <option value={Priority.LOWEST}>Lowest</option>
                    <option value={Priority.LOW}>Low</option>
                    <option value={Priority.MEDIUM} selected>Medium</option>
                    <option value={Priority.HIGH}>High</option>
                    <option value={Priority.HIGHEST}>Highest</option>
                </select>
                <label>Due Date</label>
                <input className="form-control" type="date" name="due_date" value={this.state.due_date}
                       onChange={this.onInputchange}/>
                <label>Type</label>
                <select name="type" onChange={this.onInputchange} className="form-control">
                    <option value={Type.STORY} selected>Story</option>
                    <option value={Type.TASK}>Task</option>
                    <option value={Type.BUG}>Bug</option>
                </select>
                <label>Assignee</label>
                <select name='assignee_id' className="form-control" onChange={this.onInputchange}>
                    <option value={null} selected>No one</option>
                    {users && users.map(function (user, key) {
                        return <option value={user.id}>
                            {user.first_name} {user.last_name}
                        </option>;
                    })})
                </select>

                <button className='btn btn-primary mt-3' onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }

    async fetchUsersForWorkspace(){
        let user_repository = new UserRepository();

        let filters = {
            'workspace_id': this.state.workspace_id,
        }

        return await user_repository.index(filters, null, null)
    }

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

export default TaskModalForm;