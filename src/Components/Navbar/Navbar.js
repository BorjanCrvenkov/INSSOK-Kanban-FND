import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import React from "react";
import Workspaces from "../Workspace/Workspaces";
import Workspace from "../Workspace/Workspace";
import WorkspaceForm from "../Workspace/WorkspaceForm";
import BoardForm from "../Board/BoardForm";
import Board from "../Board/Board";
import Boards from "../Board/Boards";
import ColumnForm from "../Column/ColumnForm";
import Column from "../Column/Column";
import Columns from "../Column/Columns";
import Task from "../Task/Task";
import Tasks from "../Task/Tasks"
import TaskForm from "../Task/TaskForm"
import UserForm from "../User/UserForm";
import User from "../User/User";
import Users from "../User/Users";
import LoginForm from "../LoginForm";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/register" element={<UserForm user={null}/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/users/add" element={<UserForm/>}/>
            <Route path="/users/edit/:id" element={<UserForm/>}/>
            <Route path="/users/view/:id" element={<User user={null}/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/columns/add" element={<ColumnForm/>}/>
            <Route path="/columns/edit/:id" element={<ColumnForm/>}/>
            <Route path="/columns/view/:id" element={<Column column={null}/>}/>
            <Route path="/columns" element={<Columns/>}/>
            <Route path="/boards/add" element={<BoardForm/>}/>
            <Route path="/boards/edit/:id" element={<BoardForm/>}/>
            <Route path="/boards/view/:id" element={<Board board={null}/>}/>
            <Route path="/boards" element={<Boards/>}/>
            <Route path="/workspaces/add" element={<WorkspaceForm/>}/>
            <Route path="/workspaces/edit/:id" element={<WorkspaceForm/>}/>
            <Route path="/workspaces/view/:id" element={<Workspace workspace={null}/>}/>
            <Route path="/workspaces" element={<Workspaces/>}/>
            <Route path="/tasks" element={<Tasks/>}/>
            <Route path="/tasks/add" element={<TaskForm/>}/>
            <Route path="/tasks/edit/:id" element={<TaskForm/>}/>
            <Route path="/tasks/view/:id" element={<Task task={null}/>}/>
        </Routes>
    );
};

export default Navigation;