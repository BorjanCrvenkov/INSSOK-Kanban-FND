import React from "react";
import {SpinningCircles} from "react-loading-icons";

class BoardIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            board: props.board,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.board.id);

        window.location.href = 'http://localhost:3000/boards'
    }

    render() {
        const {isLoading, board} = this.state;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading board...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        return (
            <div className="col-sm-4 card m-3" style={{width: '25rem', background: "linear-gradient(to right, #ff82ba, #82baff)"}}>
                <div className="card-body d-flex flex-column ">
                    <h5 className="card-title">{board['name']}</h5>
                    <p className="card-text">{board['description']}</p>
                    <a href={`/boards/view/${board.id}`} className="btn btn-primary mt-auto">View board</a>
                    {localStorage.getItem('is_user') != 'true'
                    && <a href={`/boards/edit/${board.id}`} className='btn btn-secondary mt-2'>Edit board</a>
                    }
                    {localStorage.getItem('is_admin') == 'true'
                    && <button onClick={this.delete}
                               className='btn btn-danger mt-2'>Delete board
                    </button>}
                </div>
            </div>
        );
    }
}

export default BoardIndex;