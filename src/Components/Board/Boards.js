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
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading boards...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
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