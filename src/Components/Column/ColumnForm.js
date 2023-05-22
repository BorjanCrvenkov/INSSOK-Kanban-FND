import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import ColumnRepository from "../Repository/ColumnRepository";
import {SpinningCircles} from "react-loading-icons";

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

    async onSubmitForm(e) {
        e.preventDefault();
        const { name, order, board_id } = this.state;

        if (!name.trim()) {
            alert('Name field cannot be empty');
            return;
        }

        if (isNaN(order) || order < 0) {
            alert('Order field must be a positive number');
            return;
        }

        if (!board_id) {
            alert('Please select a board');
            return;
        }

        const data = {
            'name': name,
            'order': order,
            'board_id': board_id,
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
        const { isLoading, isEdit } = this.state;
      
        if (isLoading && !isEdit) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Loading column...</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SpinningCircles width="50" height="50" fill="#3E187A" />
                </div>
            </div>
        )
        } else if (isLoading && !isEdit) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Loading column...</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SpinningCircles width="50" height="50" fill="#3E187A" />
                </div>
            </div>
        )
        }
      
        let boards = this.state.boards;
      
        return (
          <div className="container">
            <h1 className="mb-4">Add column</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onInputchange} className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="order" className="form-label">Order</label>
                <input type="number" name="order" value={this.state.order} onChange={this.onInputchange} className="form-control" id="order" required />
              </div>
              <div className="mb-3">
                <label htmlFor="board_id" className="form-label">Board</label>
                <select name="board_id" onChange={this.onInputchange} defaultValue={this.state.board_id} className="form-select" id="board_id" required>
                  {boards.map(function (board, key) {
                    return <option value={board.id} key={key}>{board.name}</option>
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        );
      }
}

export default ColumnForm;