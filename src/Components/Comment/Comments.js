import React from 'react';
import Comment from "./Comment";
import CommentRepository from "../Repository/CommentRepository";


class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            comments: undefined,
            repository: new CommentRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
        this.setState({comments: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, comments} = this.state;

        if (isLoading) {
            return <h1>Loading comments...</h1>
        }

        if (!comments.length) {
            return <h1>No comments.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Comments</h1>
                    <a href={'/comments/add'}>Add comment</a>
                </div>
                {comments.map(function (comment, key) {
                    return <Comment comment={comment}/>
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

export default Comments;