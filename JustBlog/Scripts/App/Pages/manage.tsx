import React from 'react';
import AuthComponent from "../Components/authComponent";
import { Link } from 'react-router-dom';

export default class About extends AuthComponent {
    render() {
        return (
            <div>
                <Link to="/post/new">Create new post!</Link>
            </div>
        );
    }
}