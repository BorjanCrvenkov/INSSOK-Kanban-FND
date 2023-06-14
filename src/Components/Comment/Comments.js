import React from 'react';
import CommentFormForTaskModal from "./CommentFormForTaskModal";
import CommentRepository from "../Repository/CommentRepository";
import moment from 'moment';
import {Form} from "react-bootstrap";
import {SpinningCircles} from "react-loading-icons";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            comments: undefined,
            task: props.task,
            repository: new CommentRepository(),
            reload: false,
            isAscending: false,
            sorting_comments_helper: null,
            body: '',
            displayForm: false,
            displayForCommentId: true,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.openEditForm = this.openEditForm.bind(this);
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async componentDidMount() {
        let filters = getFilters(this.state.task.id);
        let sorts = getSorts();
        let includes = getIncludes();

        let data = await this.state.repository.index(filters, sorts, includes);

        if (!data) {
            this.setState({isLoading: false})
            return;
        }

        let data_clone = data.map((x) => x);

        let ascending_sorted_comments = this.bubbleSort(data, true);

        let sorting_comments_helper = this.bubbleSort(data_clone, false);

        this.setState({comments: ascending_sorted_comments});
        this.setState({sorting_comments_helper: sorting_comments_helper});
        this.setState({isLoading: false})
    }

    bubbleSort(arr, asc) {
        let i, j, temp;
        let n = arr.length;

        for (i = 0; i < n - 1; i++) {
            for (j = 0; j < n - i - 1; j++) {
                if (asc && arr[j].id > arr[j + 1].id) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                } else if (!asc && arr[j].id < arr[j + 1].id) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        return arr;
    }

    handleToggle() {
        this.setState({
            isAscending: !this.state.isAscending,
        });
        this.sortComments();
    }

    sortComments() {
        let comments = this.state.comments;

        this.setState({comments: this.state.sorting_comments_helper});
        this.setState({sorting_comments_helper: comments});
    }

    reload = () => {
        this.setState(prevState => ({
            reload: !prevState.reload
        }));
    };

    async onSubmitForm(id) {
        const data = {
            'body': this.state.body
        };

        await new CommentRepository().update(id, JSON.stringify(data));

        this.reload();
    }

    openEditForm(comment) {
        if (comment.id != this.state.displayForCommentId) {
            this.setState({displayForm: false})
        }

        this.setState((prevState) => ({
            body: comment.body,
            displayForm: !prevState.displayForm,
            displayForCommentId: comment.id
        }));
    }

    delete = async (id) => {
        document.getElementById('deleting').removeAttribute('hidden');

        await this.state.repository.deleteModel(id);

        this.reload();
    };

    render() {
        const {isLoading, comments, task, body, displayForm, displayForCommentId} = this.state;

        if (this.state.reload) {
            return <Comments task={task}/>;
        }

        if (isLoading) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20vh'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{textAlign: 'center'}}>Loading comments...</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <SpinningCircles width="50" height="50" fill="#3E187A"/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <h5 className="mb-3 border-bottom pb-3">Comments</h5>
                    <button onClick={this.handleToggle} className='d-inline btn btn-primary'>Change comment sorting
                    </button>

                    <div className='d-inline align-top' style={{'margin-left': '300px'}}>
                        <label style={{'padding-right': '10px'}}>Oldest</label>
                        <Form.Check
                            type="switch"
                            id="toggle-switch"
                            checked={this.state.isAscending}
                            onChange={this.handleToggle}
                            disabled
                            className='d-inline'
                        />
                        <label style={{'padding-left': '10px'}}>Latest</label>
                    </div>
                </div>

                <div className="border-bottom pb-3 mb-3 mt-3">
                    <CommentFormForTaskModal task={this.state.task} reload={this.reload}/>
                </div>
                {comments && comments.map((comment, key) => {
                    return (
                        <div className="border-bottom pb-3 mb-3" key={key}>
                            {(!displayForm || displayForCommentId != comment.id) &&
                            <p>{comment.body}</p>
                            }

                            <div id='deleting' hidden={true}>
                                <p className='d-inline'>Comment is being deleted</p>
                                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
                            </div>

                            {displayForm && displayForCommentId == comment.id &&
                            <div>
                                <input type='text' className="form-control d-inline"
                                       style={{width: '85%', 'margin-bottom': "10px"}} onChange={this.onInputChange}
                                       value={body} name='body'/>
                                <button className="btn btn-primary"
                                        style={{'margin-left': '20px', 'margin-top': '-5px'}}
                                        onClick={() => this.onSubmitForm(comment.id)}>Submit
                                </button>
                            </div>
                            }
                            {localStorage.getItem('is_admin') &&
                            <div>
                                <button style={{width: '200px'}} className='btn btn-secondary d-inline'
                                        onClick={() => this.openEditForm(comment)}>{!displayForm ? 'Edit' : (displayForCommentId == comment.id) ? 'Close' : 'Edit'}</button>
                                <button style={{width: '200px', 'margin-left': '10px'}} className='btn btn-danger d-inline'
                                        onClick={() => this.delete(comment.id)}>Delete Comment
                                </button>
                            </div>
                            }
                            <p className="text-muted">
                                Posted
                                by: {comment.user.first_name} {comment.user.last_name} {moment(comment.created_at).fromNow()}
                            </p>
                            <p className="text-muted">
                                Last edited {moment(comment.updated_at).fromNow()}
                            </p>
                        </div>
                    );
                })}
            </div>
        )
    }
}

function getFilters(task_id) {
    return {
        'task_id': task_id,
    };
}

function getSorts() {
    return null;
}

function getIncludes() {
    return [
        'user'
    ];
}

export default Comments;