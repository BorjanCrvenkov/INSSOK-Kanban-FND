import React from 'react';
import BoardRepository from "../Repository/BoardRepository";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            board: props.board,
            isView: false,
            repository: new BoardRepository(),
            workspace: null,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.board == null) {

            let data = await this.fetchBoardAndReturnData();
            this.setState({board: data});
            this.setState({workspace: data.workspace})
            this.setState({isView: true})
        }
        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.board.id);

        window.location.href = 'http://localhost:3000/boards'
    }

    render() {
        const {isLoading, board, isView, workspace} = this.state;

        if (isLoading) {
            return <h1>Loading board...</h1>
        }

        const link = isView ? <a href={`/boards/edit/${board.id}`}>Edit board</a>
            : <a href={`/boards/view/${board.id}`}>View board</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete board</button> : '';

        return (
            <div>
                <h3>{board['name']}</h3>
                <h4>{board['description']}</h4>
                {workspace &&
                <h3>Workspace name: {workspace.name}</h3>
                }
                {link}
                {delete_button}

            </div>
        );
    }

    async fetchBoardAndReturnData(){
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const board_id = window.location.href.split("/").pop();
        return await this.state.repository.view(board_id, filters, sorts, includes);
    }
}

function getFilters() {
    return null;
}

function getSorts() {
    return null;
}

function getIncludes() {
    return [
        'workspace'
    ];
}

export default Board;