import React from 'react';
import CommentRepository from "../Repository/CommentRepository";
import {SpinningCircles} from "react-loading-icons";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            comment: props.comment,
            isView: false,
            repository: new CommentRepository(),
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.comment == null) {

            let data = await this.fetchTaskAndReturnData();
            this.setState({comment: data});
            this.setState({isView: true});
        }

        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.comment.id);

        window.location.href = 'http://localhost:3000/comments'
    }

    render() {
        const {isLoading, comment, isView} = this.state;

        if (isLoading) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading comment...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        const link = isView ? <a href={`/comments/edit/${comment.id}`}>Edit comment</a>
            : <a href={`/comments/view/${comment.id}`}>View comment</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete comment</button> : '';

        return (
            <div>
                <h3>{comment['body']}</h3>
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
    return null;
}

export default Comment;