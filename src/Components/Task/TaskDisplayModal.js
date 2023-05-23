import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Comments from "../Comment/Comments";
import FollowsRelation from "../Workspace/FollowsRelation";
import lowestPriority from '../../Images/TaskPriority/lowest.png'
import lowPriority from '../../Images/TaskPriority/low.png'
import mediumPriority from '../../Images/TaskPriority/medium.png'
import highPriority from '../../Images/TaskPriority/high.png'
import highestPriority from '../../Images/TaskPriority/highest.png'
import story from "../../Images/TaskType/Story.png";
import bug from "../../Images/TaskType/Bug.png";
import taskType from "../../Images/TaskType/Task.png";
import TaskAssignee from "./TaskAssignee";


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

    resolvePriorityImage() {
        let priority = this.state.task.priority;

        if (priority == Priority.LOWEST) {
            return lowestPriority;
        } else if (priority == Priority.LOW) {
            return lowPriority;
        } else if (priority == Priority.MEDIUM) {
            return mediumPriority;
        } else if (priority == Priority.HIGH) {
            return highPriority;
        } else if (priority == Priority.HIGHEST) {
            return highestPriority;
        }
    }

    resolveTypeImage() {
        let type = this.state.task.type;

        if (type == Type.STORY) {
            return story;
        } else if (type == Type.BUG) {
            return bug;
        } else if (type == Type.TASK) {
            return taskType;
        }
    }

    render() {
        let {showModal, task} = this.state;

        let priorityImage = this.resolvePriorityImage();
        let typeImage = this.resolveTypeImage();

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
                                    <FollowsRelation task={task} style={{'margin-left': '50px'}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Priority:</label>
                                    <div>
                                        <p className='d-inline'>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                                        <img style={{'margin-left': '10px', width: "20px", height: "20px"}} src={priorityImage}/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Due Date:</label>
                                    <p>{task.due_date}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Type:</label>
                                    <br/>
                                    <p className='d-inline'>{task.type.charAt(0).toUpperCase() + task.type.slice(1)}</p>
                                    <img style={{'margin-left': '10px', width: "20px", height: "20px"}} src={typeImage}/>
                                </div>
                                <div className="mb-3">
                                    <TaskAssignee task={task}/>
                                </div>
                                <div className="mb-3">
                                    <label className="font-weight-bold">Reporter:</label>
                                    <p>
                                        <img className="card-img-top d-inline rounded-1"
                                             style={{width: "30px", height: "30px"}} src={task.reporter['image_link']}/>

                                        <p className='d-inline'
                                           style={{'margin-left': '10px'}}>{task.reporter.first_name} {task.reporter.last_name}</p>

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

const Priority = {
    LOWEST: 'lowest',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    HIGHEST: 'highest',
};

const Type = {
    STORY: 'story',
    TASK: 'task',
    BUG: 'bug'
}

export default TaskDisplayModal;
