import React from 'react';
import ColumnRepository from "../Repository/ColumnRepository";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            column: props.column,
            isView: false,
            repository: new ColumnRepository(),
            board: null,
            tasks: null,
        };
        this.delete = this.delete.bind(this)
    }

    async componentDidMount() {
        if (this.state.column == null) {

            let data = await this.fetchColumnAndReturnData();
            this.setState({column: data});
            this.setState({board: data.board})
            this.setState({tasks: data.tasks})
            this.setState({isView: true})
        }
        this.setState({board: this.state.column.board})
        this.setState({tasks: this.state.column.tasks})
        this.setState({isLoading: false})
    }

    async delete() {
        await this.state.repository.deleteModel(this.state.column.id);

        window.location.href = 'http://localhost:3000/columns'
    }

    render() {
        const {isLoading, column, isView, board, tasks} = this.state;

        if (isLoading) {
            return <h1>Loading column...</h1>
        }

        const link = isView ? <a href={`/columns/edit/${column.id}`}>Edit column</a>
            : <a href={`/columns/view/${column.id}`}>View column</a>;

        const delete_button = isView ? <button onClick={this.delete}>Delete column</button> : '';

        return (
            <div>
                <h3>{column['name']}</h3>
                {board &&
                <h3>Board name: {board.name}</h3>
                }
                <h4>Tasks</h4>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due date</th>
                        <th>Type</th>
                        <th>Reporter</th>
                        <th>Assignee</th>
                    </tr>
                {tasks &&
                    tasks.map(function (task, key) {
                    return <tr>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.priority}</td>
                    <td>{task.due_date}</td>
                    <td>{task.type}</td>
                    <td>{task.reporter_id}</td>
                    <td>{task.assignee_id}</td>
                    </tr>
                })}
                </table>
                    {link}
                    {delete_button}

                </div>
                    );
                }

                async fetchColumnAndReturnData(){
                let filters = getFilters();
                let sorts = getSorts();
                let includes = getIncludes();

                const column_id = window.location.href.split("/").pop();
                return await this.state.repository.view(column_id, filters, sorts, includes);
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

                export default Column;