import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import ColumnRepository from "../Repository/ColumnRepository";

class ColumnForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEdit: false,
            column: null,
            name: '',
            board_id: '',
            order: 0,
            repository: new ColumnRepository(),
            boards: null,
            boardsRepository: new BoardRepository()

        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async onSubmitForm() {
        const data = {
            'name': this.state.name,
            'order': this.state.order,
            'board_id': this.state.board_id
        };

        let id;

        if (this.state.isEdit) {
            id = this.state.column.id;
            await this.state.repository.update(id, data)
        } else {
            id = await this.state.repository.add(data);
        }
        window.location.href = 'http://localhost:3000/columns/view/' + id
    }

    async componentDidMount() {
        const column_id = window.location.href.split("/").pop();

        let fetchedBoards = await this.state.boardsRepository.index(null, null, null);
        this.setState({boards: fetchedBoards});

        if (!isNaN(column_id)) {
            const data = await this.state.repository.view(column_id);
            this.setState({column: data});

            this.setState({name: data['name']});
            this.setState({order: data['order']});
            this.setState({board_id: data['board_id']})
            this.setState({isEdit: true})
        }

        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, isEdit} = this.state;

        if (isLoading && !isEdit) {
            return <h1>Loading board...</h1>
        }else if (isLoading && !isEdit) {
            return <h1>Loading form...</h1>
        }

        let boards = this.state.boards;

        return (
            <div>
                <h1>Edit board</h1>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onInputchange}/>
                <label>Order</label>
                <input type="number" name="order" value={this.state.order} onChange={this.onInputchange}/>
                <label>Board</label>
                <select name="board_id" onChange={this.onInputchange} defaultValue={this.state.board_id}>
                    {boards.map(function (board, key) {
                        return <option value={board.id}>{board.name}</option>
                    })}
                </select>
                <button onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

export default ColumnForm;