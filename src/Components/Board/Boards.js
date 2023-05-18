import React from 'react';
import Board from "./Board";
import BoardRepository from "../Repository/BoardRepository"
import BoardIndex from "./BoardIndex";
import {SpinningCircles} from "react-loading-icons";

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            boards: undefined,
            repository: new BoardRepository(),
        }
    }

    async componentDidMount() {
        const data = await this.state.repository.index(null, null, null);
        this.setState({boards: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, boards} = this.state;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading boards...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        if (!boards.length) {
            return <h1>No boards.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Boards</h1>
                    <a href={'/boards/add'} className="btn btn-primary">Add board</a>
                </div>
                <div className="row mt-3">
                {boards.map(function (board, key) {
                    return <BoardIndex board={board}/>
                })}
                </div>
            </div>
        )
    }
}

export default Boards;