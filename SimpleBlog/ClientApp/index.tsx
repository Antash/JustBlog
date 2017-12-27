import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './Pages/layout';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Layout />
    </HashRouter>,
    document.getElementById("react-app")
);