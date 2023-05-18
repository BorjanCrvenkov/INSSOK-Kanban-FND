import React from 'react';
import FollowsRepository from "../Repository/FollowsRepository";
import {SpinningCircles} from "react-loading-icons";

class FollowsRelation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            exists: null,
            task: props.task,
            reload: false,
            relation: null,
            repository: new FollowsRepository(),
        };
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    async componentDidMount() {
        let filters = getFilters(this.state.task.id);

        let data = await this.state.repository.index(filters, null, null);

        this.setState({exists: Boolean(data)});

        if (data) {
            this.setState({relation: data[0]})
        }

        this.setState({isLoading: false})
    }

    reload = () => {
        this.setState(prevState => ({
            reload: !prevState.reload
        }));
    };

    async follow() {
        document.getElementById('loadingAction').removeAttribute('hidden')

        let userId = JSON.parse(localStorage.getItem('user')).id;
        let taskId = this.state.task.id

        let data = {
            'user_id': userId,
            'task_id': taskId,
        };

        await this.state.repository.add(data);
        this.setState({reload: true})
    }

    async unfollow() {
        document.getElementById('loadingAction').removeAttribute('hidden')

        await this.state.repository.deleteModel(this.state.relation.id);

        this.setState({reload: true})
    }

    render() {
        const {exists, isLoading, task} = this.state;

        if (this.state.reload) {
            return <FollowsRelation task={task}/>;
        }

        if (isLoading) {
            return <div>
                <h4 className='d-inline'>Loading action...</h4>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        return (
            <div>
                <div className='d-inline'>
                    {!exists && <button className='btn btn-primary' onClick={this.follow}
                                        style={{'width': '345px'}}>Follow</button>}

                    {exists && <button className='btn btn-primary' onClick={this.unfollow}
                                       style={{'width': '345px'}}>Unfollow</button>}
                </div>
                <div id='loadingAction' hidden={true}>
                    <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
                </div>
            </div>
        )
    }
}

function getFilters(taskId) {
    let userId = JSON.parse(localStorage.getItem('user')).id;

    return {
        'user_id': userId,
        'task_id': taskId,
    };
}

export default FollowsRelation;