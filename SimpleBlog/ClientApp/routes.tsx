import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components1/Layout';
import { Home } from './components1/Home';
import { FetchData } from './components1/FetchData';
import { Counter } from './components1/Counter';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
</Layout>;
