import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import React from "react";
import Workspaces from "../Workspace/Workspaces";
import Workspace from "../Workspace/Workspace";
import WorkspaceEdit from "../Workspace/WorkspaceEdit";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/workspaces/add" element={<WorkspaceEdit /> }/>
            <Route path="/workspaces/edit/:id" element={<WorkspaceEdit /> }/>
            <Route path="/workspaces/view/:id" element={<Workspace workspace={null} /> }/>
            <Route path="/workspaces" element={<Workspaces />}/>
        </Routes>
    );
};

export default Navigation;