import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ColumnModalForm from "./ColumnModalForm";


class ColumnModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            board: props.board,
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        let {showModal, board} = this.state;

        return (
            <>
                <Button variant="primary" onClick={this.toggleModal}>
                    Add new column
                </Button>

                <Modal show={showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new column</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ColumnModalForm board={board} toggleModal={this.toggleModal}/></Modal.Body>
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

export default ColumnModal;
