import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Comments from "../Comment/Comments";

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
                <Modal show={showModal} onHide={this.toggleModal} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title className="font-weight-bold text-left">
                            <h2 className="font-weight-bold">{task.label}: {task.title}</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-8">
                                <div className='border rounded p-3'>
                                    <h4 className="font-weight-bold">Description</h4>
                                    <p className="lead">{task.description}</p>
                                </div>
                                <div className="border rounded p-3 mt-2">
                                    <Comments task={task}/>
                                </div>
                            </div>
                            <div className="col-md-4 border rounded p-3">
                                <div className="mb-3">
                                    <label className="font-weight-bold">Priority:</label>
                                    <p>{task.priority}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Due Date:</label>
                                    <p>{task.due_date}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Type:</label>
                                    <p>{task.type}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Assignee:</label>
                                    {task.assignee && <p>
                                        {task.assignee.first_name} {task.assignee.last_name}
                                    </p>}
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Reporter:</label>
                                    <p>
                                        {task.reporter.first_name} {task.reporter.last_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
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
