import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navigation from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <main>
                        <div className={"container"}>
                            <Navigation/>
                        </div>
                    </main>
                </Router>
            </div>
        );
    }
};

export default App;
