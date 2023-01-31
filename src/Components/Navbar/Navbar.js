import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import React from "react";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    );
};

export default Navigation;