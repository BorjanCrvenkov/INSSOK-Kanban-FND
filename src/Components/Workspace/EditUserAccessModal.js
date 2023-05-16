import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserWorkspaceForm from "./UserWorkspaceForm";

class EditUserAccessModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            workspace: props.workspace,
            user: props.user,
            accessType: props.accessType,
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    };

    render() {
        let {showModal, workspace, user} = this.state;

        return (
            <>
                {
                    localStorage.getItem('is_user') != 'true' && <Button variant="secondary" onClick={this.toggleModal}>
                        Edit access
                    </Button>
                }

                <Modal show={showModal} onHide={this.toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit user workspace access</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><UserWorkspaceForm workspace={workspace} user={user}
                                                   toggleModal={this.toggleModal}/></Modal.Body>
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

export default EditUserAccessModal;