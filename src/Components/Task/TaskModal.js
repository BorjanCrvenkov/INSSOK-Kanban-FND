import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TaskModalForm from "./TaskModalForm";

class TaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            column: props.column,
            workspace_id: props.workspace_id,
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        let {showModal, column, workspace_id} = this.state;
        return (
            <>
                <Button variant="primary" onClick={this.toggleModal}>
                    Create task
                </Button>

                <Modal show={showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><TaskModalForm column={column} workspace_id={workspace_id} toggleModal={this.toggleModal}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default TaskModal;
