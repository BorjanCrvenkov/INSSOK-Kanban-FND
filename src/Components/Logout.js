import * as React from "react";
import BaseRepository from "./Repository/BaseRepository";

class Logout extends React.Component{
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let repository = new BaseRepository();

        await repository.logout();

        window.location.href = 'http://localhost:3000/login'
    }

    render() {
        return <>
            Logging out
            </>
    }
}

export default Logout;