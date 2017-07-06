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

                <Switch>
                    <Route exact path="/" render={() =>
                        <Header header="Clean Blog" subheader="A Clean Blog Theme by Start Bootstrap" imageFileName="home-bg.jpg" />} />
                    <Route path="/about" render={() =>
                        <Header header="About Me" subheader="This is what I do." imageFileName="about-bg.jpg" />} />
                    <Route path="/post/:postId?" render={() =>
                        <Header header="Sample Post" subheader="Just a post." imageFileName="post-bg.jpg" />} />
                    <Route path="/contact" render={() =>
                        <Header header="Contact Me" subheader="Have questions? I have answers(maybe)." imageFileName="contact-bg.jpg" />} />
                </Switch>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/post/:postId?" component={Post} />
                    <Route path="/contact" component={Contact} />
                </Switch>

                <Footer />
            </div>
        );
    }
}