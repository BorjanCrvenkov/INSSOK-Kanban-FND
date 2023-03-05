import React from 'react';
import BoardRepository from "../Repository/BoardRepository";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskRepository from "../Repository/TaskRepository";
import TaskModal from "../Task/TaskModal";
import 'bootstrap/dist/js/bootstrap.min.js';
import ColumnModal from "../Column/ColumnModal";

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
        };
    }

    async componentDidMount() {
        if (this.state.board == null) {

            let data = await this.fetchBoardAndReturnData();
            this.setState({board: data});
            this.setState({workspace: data.workspace})
            this.setState({isView: true})

            let obj = {};

            let columns = data['columns']

            for (let column in columns) {
                let temp = columns[column];

                obj[temp['id']] = {
                    'id': temp.id,
                    'name': temp.name,
                    'items': temp.tasks
                }
            }

            this.setState({columns: obj})
        }
        this.setState({isLoading: false})
    }

    render() {
        let {isLoading, board} = this.state;
        let stateColumns = this.state.columns;

        if (isLoading) {
            return <h1>Loading board...</h1>
        }

        return (
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
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={String(item.id)}
                                                                draggableId={String(item.id)}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div ref={provided.innerRef}
                                                                             {...provided.draggableProps}
                                                                             {...provided.dragHandleProps}>
                                                                            <div className="card bg-light mb-3"
                                                                                 style={{'width': '200px'}}>
                                                                                <div className="card-body">
                                                                                    <h5 className="card-title">{item['title']}</h5>
                                                                                    <p className="card-text">{item['priority']}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                    <div>
                                                        <TaskModal column={column} workspace_id={board.workspace_id}/>
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
        );
    }

    async onDragEnd(result, columns) {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            this.setState({
                columns: {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        items: destItems
                    }
                }
            });

            this.updateColumnsOrder(sourceItems)
            this.updateColumnsOrder(destItems);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            this.setState({
                columns: {
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        items: copiedItems
                    }
                }
            });

            if (copiedItems[source.index] === copiedItems[destination.index]) {
                return;
            }

            this.updateColumnsOrder(columns)
        }
    };

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
        'workspace',
        'columns.tasks',
    ];
}

export default Board;