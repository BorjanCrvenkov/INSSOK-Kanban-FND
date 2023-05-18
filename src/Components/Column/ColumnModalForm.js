import React from 'react';
import ColumnRepository from "../Repository/ColumnRepository";
import {SpinningCircles} from "react-loading-icons";

class ColumnModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            board: props.board,
            order: 0,
            isLoading: true,
            repository: new ColumnRepository(),
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoading: false})
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    closeModal(){
        this.props.toggleModal()
    }

    async onSubmitForm(e) {
        e.preventDefault();
        let board = this.state.board;
        const data = {
            'name': this.state.name,
            'order': board.columns ? board.columns.length : 0,
            'board_id': board.id
        };

        await this.state.repository.add(data);
        this.closeModal()
        window.location.reload(true);
    }


    render() {
        const {isLoading} = this.state;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading form...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        return (
            <div>
                <label>Name</label>
                <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.onInputchange}/>

                <button className='btn btn-primary mt-3' onClick={this.onSubmitForm}>Submit</button>
            </div>
        );
    }
}

export default ColumnModalForm;