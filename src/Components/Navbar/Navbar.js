import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import React from "react";
import Workspaces from "../Workspace/Workspaces";
import Workspace from "../Workspace/Workspace";
import WorkspaceForm from "../Workspace/WorkspaceForm";
import BoardForm from "../Board/BoardForm";
import Board from "../Board/Board";
import Boards from "../Board/Boards";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/boards/add" element={<BoardForm/>}/>
            <Route path="/boards/edit/:id" element={<BoardForm/>}/>
            <Route path="/boards/view/:id" element={<Board board={null}/>}/>
            <Route path="/boards" element={<Boards/>}/>
            <Route path="/workspaces/add" element={<WorkspaceForm/>}/>
            <Route path="/workspaces/edit/:id" element={<WorkspaceForm/>}/>
            <Route path="/workspaces/view/:id" element={<Workspace workspace={null}/>}/>
            <Route path="/workspaces" element={<Workspaces/>}/>
        </Routes>
    );
};

export default Navigation;