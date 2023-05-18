import React from 'react';
import CommentRepository from "../Repository/CommentRepository";
import {SpinningCircles} from "react-loading-icons";

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            comment: null,
            body: '',
            repository: new CommentRepository()
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
            'body': this.state.body
        };

        let id = this.state.comment != null ? this.state.comment.id : null;

        if (this.state.isEdit) {
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/comments/view/' + id
    }

    async componentDidMount() {
        const task_id = window.location.href.split("/").pop();

        let fetchedColumns = await this.state.columnRepository.index(null, null, null);
        this.setState({columns: fetchedColumns});

        if (!isNaN(task_id)) {
            const data = await this.state.repository.view(task_id);
            this.setState({comment: data});

            this.setState({name: data['body']});
            this.setState({isEdit: true});
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && !isEdit) {
            return <div>
                <h1 className='d-inline'>Loading comment...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        let columns = this.state.columns;

        return (
            <div>
                <h1>Edit comment</h1>
                <label>Body</label>
                <input type="text" name="body" value={this.state.body} onChange={this.onInputchange}/>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

export default CommentForm;