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
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Loading board...</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SpinningCircles width="50" height="50" fill="#3E187A" />
                    </div>
            </div>
            )
        }

        return (
            <div className="col-sm-3 card m-3" style={{ maxWidth: '18rem', background: "linear-gradient(to right, #994ECC, #3E187A)" }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-white">{board['name']}</h5>
                <p className="card-text text-white" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {board['description']}
                </p>
                <a href={`/boards/view/${board.id}`} className="btn btn-primary mt-2">View board</a>
                {localStorage.getItem('is_user') !== 'true' && (
                  <a href={`/boards/edit/${board.id}`} className='btn btn-secondary mt-2'>Edit board</a>
                )}
                {localStorage.getItem('is_admin') === 'true' && (
                  <button onClick={this.delete} className='btn btn-danger mt-2'>Delete board</button>
                )}
              </div>
            </div>
        );
    }
}

export default BoardIndex;