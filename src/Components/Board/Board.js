import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskRepository from "../Repository/TaskRepository";
import TaskModal from "../Task/TaskModal";
import 'bootstrap/dist/js/bootstrap.min.js';
import ColumnModal from "../Column/ColumnModal";
import TaskDisplayModal from "../Task/TaskDisplayModal";
import {SpinningCircles} from "react-loading-icons";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            board: props.board,
            isView: false,
            repository: new BoardRepository(),
            task_repository: new TaskRepository(),
            workspace: null,
            columns: null,
            users: [],
            columnTasks: [],
            task: null,
        };
    }

    async componentDidMount() {
        if (this.state.board == null) {

            let data = await this.fetchBoardAndReturnData();
            this.setState({board: data});
            this.setState({workspace: data.workspace})
            this.setState({isView: true})
            this.setState({users: data.workspace.users})

            let obj = {};
            let columnTasks = [];

            let columns = data['columns']

            for (let column in columns) {
                let temp = columns[column];
                columnTasks[temp.id] = temp.tasks

                obj[temp['id']] = {
                    'id': temp.id,
                    'name': temp.name,
                    'tasks': temp.tasks
                }
            }

            this.setState({columns: obj})
            this.setState({columnTasks: columnTasks})
        }

        this.setState({isLoading: false})
    }

    render() {
        let {isLoading, board, users} = this.state;
        let stateColumns = this.state.columns;

        if (isLoading) {
            return <div>
                <h1 className='d-inline'>Loading board...</h1>
                <SpinningCircles width="25" height="25" fill="#999" style={{'margin-left': '10px'}}/>
            </div>
        }

        return (
            <div>
                <div className="mt-4 mb-4" style={{ border: "0px solid red", padding: "5px", display: "inline-block" }}>
                    <label>Filter by user</label>
                    <div className="icon-select" style={{ border: "0px solid green", padding: "5px", display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16" style={{ border: "0px solid #000", padding: "2px" }}>
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                        </svg>
                        <select className="form-select" id="assigneeFilter"
                            style={{ flex: "1", marginLeft: "10px", border: "1px solid #cecece", padding: "5px", width: "200px", display: "inline-block" }}
                            onChange={this.filterByAssigneeOnChange.bind(this)}>
                            <option value="All">All</option>
                            {users && users.map(function (user, key) {
                                return <option value={user.id}>{user.first_name} {user.last_name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
                    <DragDropContext
                        onDragEnd={result => this.onDragEnd(result, stateColumns)}
                    >
                        {Object.entries(stateColumns).map(([columnId, column], index) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                    key={columnId}
                                >
                                    <h3>{column.name}</h3>
                                    <div style={{margin: 8}}>
                                        <Droppable droppableId={columnId} key={columnId}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className='mt-3 p-3 border border-dark'
                                                    >
                                                        {column.tasks.map((item, index) => {
                                                            return (
                                                                <div
                                                                    onClick={(e) => this.openTaskDisplayModal(item, e)}>
                                                                    <Draggable
                                                                        key={String(item.id)}
                                                                        draggableId={String(item.id)}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => {
                                                                            return (
                                                                                <div ref={provided.innerRef}
                                                                                     {...provided.draggableProps}
                                                                                     {...provided.dragHandleProps} >
                                                                                    <div className="card bg-light mb-3"
                                                                                         style={{'width': '200px'}}>
                                                                                        <div className="card-body">
                                                                                            <h5 className="card-title">{item['title']}</h5>
                                                                                            <p className="card-text">{item['priority']}</p>
                                                                                            <p className="card-text">{item['label']}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                    <div>
                                                                        {this.state.task != null && this.state.task.id == item.id &&
                                                                        <TaskDisplayModal showModal={true} task={this.state.task}/>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                        {provided.placeholder}
                                                        <div>
                                                            <TaskModal column={column}
                                                                       workspace_id={board.workspace_id}/>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>

                    <div>
                        <ColumnModal board={board}/>
                    </div>
                </div>
            </div>
        );
    }

    openTaskDisplayModal(task, e) {
        e.preventDefault();
        this.setState({task: task})
    }

    async onDragEnd(result, columns) {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceTasks = [...sourceColumn.tasks];
            const destTasks = [...destColumn.tasks];
            const [removed] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, removed);
            this.setState({
                columns: {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        tasks: sourceTasks
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        tasks: destTasks
                    }
                }
            });

            this.updateColumnsOrder(sourceTasks)
            this.updateColumnsOrder(destTasks);
        } else {
            const column = columns[source.droppableId];
            const copiedTasks = [...column.tasks];
            const [removed] = copiedTasks.splice(source.index, 1);
            copiedTasks.splice(destination.index, 0, removed);
            this.setState({
                columns: {
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        tasks: copiedTasks
                    }
                }
            });

            if (copiedTasks[source.index] === copiedTasks[destination.index]) {
                return;
            }

            this.updateColumnsOrder(columns)
        }
    };

    filterByAssigneeOnChange(e) {
        let value = e.target.value;
        let elements = document.getElementById("assigneeFilter").options;
        let columnTasks = this.state.columnTasks;
        let stateColumns = this.state.columns;
        let updatedColumns = [];

        if (value == "All") {
            for (let i = 0; i < elements.length; i++) {
                elements[i].selected = false;
            }

            document.getElementById("assigneeFilter").value = "All"
            for (let column in stateColumns) {
                let temp = stateColumns[column];
                let tempTasks = columnTasks[temp.id];

                temp.tasks = tempTasks;
                updatedColumns.push(temp)
            }

            this.setState({columns: this.state.columns})
        } else {
            let ids = [];

            for (let i = 0; i < elements.length; i++) {
                if (elements[i].selected) {
                    ids.push(parseInt(elements[i].value))
                }
            }

            for (let column in stateColumns) {
                let temp = stateColumns[column];
                let tempTasks = columnTasks[temp.id];

                temp.tasks = tempTasks.filter(function (task) {
                    for (let id in ids) {
                        if (ids[id] == task.assignee_id) {
                            return task;
                        }
                    }
                })
                updatedColumns.push(temp)
            }
        }

        this.setState({columns: updatedColumns})
    }

    updateColumnsOrder(columns) {
        let repository = this.state.task_repository;
        let data = {
            'order': 0,
        };

        for (let i = 0; i < columns.length; i++) {
            let id = columns[i]['id'];
            data['order'] = i;

            repository.update(id, JSON.stringify(data));
        }
    }

    async fetchBoardAndReturnData() {
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
        'workspace.users',
        'columns.tasks.assignee',
        'columns.tasks.reporter',
    ];
}

export default Board;