import React from 'react';
import ColumnRepository from "../Repository/ColumnRepository";
import Column from "./Column";
import {SpinningCircles} from "react-loading-icons";

class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            columns: undefined,
            repository: new ColumnRepository(),
        }
    }

    async componentDidMount() {
        let filters = getFilters();
        let sorts = getSorts();
        let includes = getIncludes();

        const data = await this.state.repository.index(filters, sorts, includes);
        this.setState({columns: data});
        this.setState({isLoading: false})
    }

    render() {
        const {isLoading, columns} = this.state;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading columns...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        if (!columns.length) {
            return <h1>No columns.</h1>
        }

        return (
            <div>
                <div>
                    <h1>Columns</h1>
                    <a href="/columns/add" className="btn btn-primary">Add Column</a>
                </div>
                <br></br>
                {columns.map(function (column, key) {
                    return <Column column={column}/>
                })}
            </div>
        )
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
        'board',
        'tasks',
    ];
}

export default Columns;
