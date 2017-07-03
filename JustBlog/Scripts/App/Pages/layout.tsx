import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import About from './about';
import Post from './post';
import Contact from './contact';
import Navigator from '../Components/navigator';
import Header from '../Components/header';
import Footer from '../Components/footer';

export default class Layout extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Navigator />
                <Header />
                <div>
                hello world!
                </div>
                <Footer />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/post" component={Post} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}