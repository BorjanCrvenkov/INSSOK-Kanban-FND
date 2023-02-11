import React from 'react';
import Board from "./Board";
import BoardRepository from "../Repository/BoardRepository"

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
            return <h1>Loading boards...</h1>
        }

        if (!boards.length) {
            return <h1>No boards.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Boards</h1>
                    <a href={'/boards/add'}>Add board</a>
                </div>
                {boards.map(function (board, key) {
                    return <Board board={board}/>
                })}
            </div>
        )
    }
}

export default Boards;