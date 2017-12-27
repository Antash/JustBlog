import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import About from './about';
import Post from './post';
import Contact from './contact';
import Login from './login';
import Manage from './manage';
import Navigator from '../Components/navigator';
import Header from '../Components/header';
import PostHeader from '../Components/postHeader';
import Footer from '../Components/footer';
import { ILoginState } from "../loginState";
import loginStore from '../Stores/loginStore';
import authService from '../Services/authService';
import Edit from "./edit";

export default class Layout extends React.Component<{}, ILoginState> {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        authService.checkLogin();
    }

    componentWillMount() {
        loginStore.addListener("change", () => {
            this.setState({
                loggedIn: loginStore.isLoggedIn()
            });
        });
    }

    componentWillUnmount() {
        loginStore.removeAllListeners();
    }

    render() {
        return (
            <div>
                <Navigator loggedIn={this.state.loggedIn} />

                <Switch>
                    //private stuff
                    {this.state.loggedIn &&
                        <Route path="/manage" render={() =>
                            <Header header="Manage Blog" subheader="Posts, categories, etc." imageFileName="about-bg.jpg" />} />
                    }
                    {this.state.loggedIn &&
                        <Route exact path="/post/new" render={() =>
                            <Header header="New Post" subheader="Any ideas?" imageFileName="about-bg.jpg" />} />
                    }
                    <Route exact path="/" render={() =>
                        <Header header="Clean Blog" subheader="A Clean Blog Theme by Start Bootstrap" imageFileName="home-bg.jpg" />} />
                    <Route path="/about" render={() =>
                        <Header header="About Me" subheader="This is what I do." imageFileName="about-bg.jpg" />} />
                    <Route path="/post/:postId?" component={PostHeader} />
                    <Route path="/contact" render={() =>
                        <Header header="Contact Me" subheader="Have questions? I have answers(maybe)." imageFileName="contact-bg.jpg" />} />
                    <Route path="/login" render={() =>
                        <Header header="Login" subheader="Autorization needed for private features access." imageFileName="about-bg.jpg" />} />
                    //404 page
                    <Route render={() =>
                        <Header header="404 Page Not Found" subheader="We are sorry but the page you are looking for does not exist." imageFileName="about-bg.jpg" />} />
                </Switch>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <Switch>
                                //private stuff
                                {this.state.loggedIn &&
                                    <Route path="/manage" component={Manage} />
                                }
                                {this.state.loggedIn &&
                                    <Route exact path="/post/new" component={Edit} />
                                }
                                <Route exact path="/" component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/post/:postId?" component={Post} />
                                <Route path="/contact" component={Contact} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}