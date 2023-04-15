import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class TaskDisplayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: props.showModal ?? false,
            task: props.task
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        let {showModal, task} = this.state;
        return (
            <>
                <Modal show={showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{task.label}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><div>
                        <label><b>Task title:</b></label>
                        <p>{task.title}</p>
                        <label><b>Task description:</b></label>
                        <p>{task.description}</p>
                        <label><b>Task priority:</b></label>
                        <p>{task.priority}</p>
                        <label><b>Task due_date:</b></label>
                        <p>{task.due_date}</p>
                        <label><b>Task type:</b></label>
                        <p>{task.type}</p>
                        <label><b>Task label:</b></label>
                        <p>{task.label}</p>
                        <label><b>Task assignee:</b></label>
                        {/*moze i slika za ovie dvajca?*/}
                        <p>{task.assignee.first_name} {task.assignee.last_name}</p>
                        <label><b>Task reporter:</b></label>
                        <p>{task.reporter.first_name} {task.reporter.last_name}</p>
                        <label><b>Task comments:</b></label>
                        <h1></h1>
                        {task.comments.map(function (comment, key) {
                            return <>
                                <label><b>Comment body:</b></label>
                                <p>{comment.body}</p>
                                {/*moze i slika za ovoj?*/}
                                <p>Posted by: {comment.user.first_name} {comment.user.last_name}</p>
                                <p>Posted at: {comment.created_at}</p>
                            </>
                        })}

                    </div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default TaskDisplayModal;
