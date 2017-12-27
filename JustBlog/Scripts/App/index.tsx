import * as React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Pages/layout';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Layout />
    </HashRouter>,
    document.getElementById("app")
);