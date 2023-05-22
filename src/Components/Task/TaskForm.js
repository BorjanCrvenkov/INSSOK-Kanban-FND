import React from 'react';
import TaskRepository from "../Repository/TaskRepository";
import ColumnRepository from "../Repository/ColumnRepository";
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

    async onSubmitForm(e) {
        e.preventDefault();
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
      const { isLoading, isEdit, workspace_id } = this.state;
    
      if (isLoading && !isEdit) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ textAlign: 'center' }}>Loading task...</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <SpinningCircles width="50" height="50" fill="#3E187A" />
              </div>
      </div>
      )
      }
    
      let columns = this.state.columns;
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const { title, description, priority, due_date, type, column_id } = this.state;
    
        if (!title || !description || !priority || !due_date || !type || !column_id) {
          alert("Please fill out all fields.");
          return;
        }
    
        if (title.length > 50) {
          alert("Title cannot exceed 50 characters.");
          return;
        }
    
        // Add additional validation rules here
    
        this.onSubmitForm();
      };
    
      return (
        <div className="container mt-5">
          <h1 className="mb-4">{isEdit ? 'Edit Task' : 'Add Task'}</h1>
          <form onSubmit={handleSubmit}>
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
              <input
                type="number"
                className="form-control"
                id="priority"
                name="priority"
                value={this.state.priority}
                onChange={this.onInputchange}
                min={1}
                required
              />
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
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={this.state.type}
                onChange={this.onInputchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="column_id" className="form-label">Column</label>
              <select
                className="form-select"
                id="column_id"
                name="column_id"
                onChange={this.onInputchange}
                defaultValue={this.state.column_id}
                required
              >
                <option value="" disabled>Select a column</option>
                {columns.map(function (column, key) {
                  return (
                    <option key={key} value={column.id}>
                      {column.name}
                    </option>
                  );
                })}
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

export default TaskForm;