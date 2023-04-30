import React from 'react';
import CommentRepository from "../Repository/CommentRepository";
import {SpinningCircles, ThreeDots} from "react-loading-icons";

class CommentFormForTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            task_id: props.task.id,
            repository: new CommentRepository(),
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
        let elem = document.getElementById('posted').removeAttribute('hidden')

        const data = {
            'body': this.state.body,
            'task_id': this.state.task_id,
        };

        let id = this.state.comment != null ? this.state.comment.id : null;

        if (id != null) {
            await this.state.repository.update(id, data)
        } else {
            await this.state.repository.add(JSON.stringify(data));
        }
        this.props.reload();
    }

    render() {
        return (
            <div>
                <form>
                    <label>Add new comment</label>
                    <input type='text' name='body' onChange={this.onInputchange} className="form-control d-inline" style={{'width': '85%'}} required/>
                    <button type='submit' className='btn btn-primary d-inline' style={{'margin-left': '20px', 'margin-top': '-5px'}} onClick={this.onSubmitForm}>Submit</button>
                </form>
                <div id='posted' hidden={true}>
                    <p className='d-inline'>Comment is being posted</p>
                    <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
                </div>
            </div>
        );
    }
}

export default CommentFormForTaskModal;