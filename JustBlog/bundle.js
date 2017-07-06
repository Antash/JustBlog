System.register("Actions/action", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Actions/actionTypes", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var FETCH_COMMENTS, RECIEVE_COMMENTS, FETCH_COMMENTS_ERROR, DELETE_COMMENT, DELETE_COMMENT_ERROR, RECIEVE_ABSTRACTS, RECIEVE_POST;
    return {
        setters:[],
        execute: function() {
            exports_2("FETCH_COMMENTS", FETCH_COMMENTS = "FETCH_COMMENTS");
            exports_2("RECIEVE_COMMENTS", RECIEVE_COMMENTS = "RECIEVE_COMMENTS");
            exports_2("FETCH_COMMENTS_ERROR", FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR");
            exports_2("DELETE_COMMENT", DELETE_COMMENT = "DELETE_COMMENT");
            exports_2("DELETE_COMMENT_ERROR", DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR");
            exports_2("RECIEVE_ABSTRACTS", RECIEVE_ABSTRACTS = "RECIEVE_ABSTRACTS");
            exports_2("RECIEVE_POST", RECIEVE_POST = "RECIEVE_POST");
        }
    }
});
System.register("dispatcher", ['flux'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var flux_1;
    return {
        setters:[
            function (flux_1_1) {
                flux_1 = flux_1_1;
            }],
        execute: function() {
            exports_3("default",new flux_1.Dispatcher);
        }
    }
});
System.register("Models/commentData", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Actions/commentActions", ['axios', 'qs', "dispatcher", "Actions/actionTypes"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var axios_1, qs_1, dispatcher_1, Types;
    function loadComments() {
        dispatcher_1.default.dispatch({
            type: Types.FETCH_COMMENTS
        });
        axios_1.default.get("/comments")
            .then(response => dispatcher_1.default.dispatch({
            type: Types.RECIEVE_COMMENTS,
            data: response.data
        }))
            .catch(error => dispatcher_1.default.dispatch({
            type: Types.FETCH_COMMENTS_ERROR,
            data: error
        }));
    }
    exports_5("loadComments", loadComments);
    function addComment(comment) {
        axios_1.default.post("/comments/new", qs_1.default.stringify({ Author: comment.author, Text: comment.text }))
            .then(response => loadComments());
    }
    exports_5("addComment", addComment);
    function likeComment(id) {
        axios_1.default.post("/comments/like", qs_1.default.stringify({ Id: id }))
            .then(response => loadComments());
    }
    exports_5("likeComment", likeComment);
    function deleteComment(id) {
        axios_1.default.post("/comments/del", qs_1.default.stringify({ Id: id }))
            .then(response => loadComments());
    }
    exports_5("deleteComment", deleteComment);
    return {
        setters:[
            function (axios_1_1) {
                axios_1 = axios_1_1;
            },
            function (qs_1_1) {
                qs_1 = qs_1_1;
            },
            function (dispatcher_1_1) {
                dispatcher_1 = dispatcher_1_1;
            },
            function (Types_1) {
                Types = Types_1;
            }],
        execute: function() {
        }
    }
});
System.register("Components/CommentBox/comment", ['react', 'remarkable', "Actions/commentActions"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var react_1, remarkable_1, CommentActions;
    var Comment;
    return {
        setters:[
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (remarkable_1_1) {
                remarkable_1 = remarkable_1_1;
            },
            function (CommentActions_1) {
                CommentActions = CommentActions_1;
            }],
        execute: function() {
            class Comment extends react_1.default.Component {
                delete() {
                    CommentActions.deleteComment(this.props.comment.id);
                }
                like() {
                    CommentActions.likeComment(this.props.comment.id);
                }
                rawMarkup() {
                    var md = new remarkable_1.default();
                    var rawMarkup = md.render(this.props.children.toString());
                    return { __html: rawMarkup };
                }
                render() {
                    return (react_1.default.createElement("div", {className: "comment"}, react_1.default.createElement("h2", {className: "commentAuthor"}, this.props.comment.author), react_1.default.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()}), react_1.default.createElement("h3", null, "liked: ", this.props.comment.likes), react_1.default.createElement("button", {onClick: this.delete.bind(this)}, "Delete"), react_1.default.createElement("button", {onClick: this.like.bind(this)}, "Like!")));
                }
            }
            exports_6("default", Comment);
        }
    }
});
System.register("Components/CommentBox/commentForm", ['react', "Actions/commentActions"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var react_2, CommentActions;
    var CommentForm;
    return {
        setters:[
            function (react_2_1) {
                react_2 = react_2_1;
            },
            function (CommentActions_2) {
                CommentActions = CommentActions_2;
            }],
        execute: function() {
            class CommentForm extends react_2.default.Component {
                constructor() {
                    super();
                    this.state = {
                        author: '',
                        text: ''
                    };
                }
                handleAuthorChange(e) {
                    this.setState({ author: e.target.value });
                }
                handleTextChange(e) {
                    this.setState({ text: e.target.value });
                }
                handleSubmit(e) {
                    e.preventDefault();
                    var author = this.state.author.trim();
                    var text = this.state.text.trim();
                    if (!text || !author) {
                        return;
                    }
                    CommentActions.addComment({ author: author, text: text });
                    this.setState({ author: '', text: '' });
                }
                render() {
                    return (react_2.default.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit.bind(this)}, react_2.default.createElement("input", {type: "text", placeholder: "Your name", value: this.state.author, onChange: this.handleAuthorChange.bind(this)}), react_2.default.createElement("input", {type: "text", placeholder: "Say something...", value: this.state.text, onChange: this.handleTextChange.bind(this)}), react_2.default.createElement("input", {type: "submit", value: "Post"})));
                }
            }
            exports_7("default", CommentForm);
        }
    }
});
System.register("Components/CommentBox/commentList", ['react', "Components/CommentBox/comment"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var react_3, comment_1;
    var CommentList;
    return {
        setters:[
            function (react_3_1) {
                react_3 = react_3_1;
            },
            function (comment_1_1) {
                comment_1 = comment_1_1;
            }],
        execute: function() {
            class CommentList extends react_3.default.Component {
                render() {
                    var commentNodes = this.props.data.map(function (comment) {
                        return (react_3.default.createElement(comment_1.default, {key: comment.id, comment: comment}, comment.text));
                    }.bind(this));
                    return (react_3.default.createElement("div", {className: "commentList"}, commentNodes));
                }
            }
            exports_8("default", CommentList);
        }
    }
});
System.register("Stores/commentStore", ['fbemitter', "dispatcher", "Actions/actionTypes"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var fbemitter_1, dispatcher_2, Types;
    var CommentStore, commentStore;
    return {
        setters:[
            function (fbemitter_1_1) {
                fbemitter_1 = fbemitter_1_1;
            },
            function (dispatcher_2_1) {
                dispatcher_2 = dispatcher_2_1;
            },
            function (Types_2) {
                Types = Types_2;
            }],
        execute: function() {
            class CommentStore extends fbemitter_1.EventEmitter {
                constructor() {
                    super();
                    this.data = [];
                }
                getAllComments() {
                    return this.data;
                }
                handleActions(action) {
                    switch (action.type) {
                        case Types.RECIEVE_COMMENTS: {
                            this.data = action.data.data;
                            this.emit("change");
                        }
                    }
                }
            }
            commentStore = new CommentStore;
            dispatcher_2.default.register(commentStore.handleActions.bind(commentStore));
            exports_9("default",commentStore);
        }
    }
});
System.register("Components/commentBox", ['react', "Components/CommentBox/commentForm", "Components/CommentBox/commentList", "Stores/commentStore", "Actions/commentActions"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var react_4, commentForm_1, commentList_1, commentStore_1, CommentActions;
    var CommentBox;
    return {
        setters:[
            function (react_4_1) {
                react_4 = react_4_1;
            },
            function (commentForm_1_1) {
                commentForm_1 = commentForm_1_1;
            },
            function (commentList_1_1) {
                commentList_1 = commentList_1_1;
            },
            function (commentStore_1_1) {
                commentStore_1 = commentStore_1_1;
            },
            function (CommentActions_3) {
                CommentActions = CommentActions_3;
            }],
        execute: function() {
            class CommentBox extends react_4.default.Component {
                constructor() {
                    super();
                    this.state = {
                        data: []
                    };
                }
                loadCommentsFromServer() {
                    CommentActions.loadComments();
                }
                componentDidMount() {
                    this.loadCommentsFromServer();
                }
                componentWillMount() {
                    commentStore_1.default.addListener("change", () => {
                        this.setState({
                            data: commentStore_1.default.getAllComments()
                        });
                    });
                }
                componentWillUnmount() {
                    commentStore_1.default.removeAllListeners();
                }
                render() {
                    return (react_4.default.createElement("div", {className: "commentBox"}, react_4.default.createElement("h3", null, "Comments"), react_4.default.createElement(commentList_1.default, {data: this.state.data}), react_4.default.createElement(commentForm_1.default, null)));
                }
            }
            exports_10("default", CommentBox);
        }
    }
});
System.register("Components/footer", ['react'], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var react_5;
    var Footer;
    return {
        setters:[
            function (react_5_1) {
                react_5 = react_5_1;
            }],
        execute: function() {
            class Footer extends react_5.default.Component {
                render() {
                    return (react_5.default.createElement("footer", null, react_5.default.createElement("div", {className: "container"}, react_5.default.createElement("div", {className: "row"}, react_5.default.createElement("div", {className: "col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"}, react_5.default.createElement("ul", {className: "list-inline text-center"}, react_5.default.createElement("li", null, react_5.default.createElement("a", {href: "#"}, react_5.default.createElement("span", {className: "fa-stack fa-lg"}, react_5.default.createElement("i", {className: "fa fa-circle fa-stack-2x"}), react_5.default.createElement("i", {className: "fa fa-twitter fa-stack-1x fa-inverse"})))), react_5.default.createElement("li", null, react_5.default.createElement("a", {href: "#"}, react_5.default.createElement("span", {className: "fa-stack fa-lg"}, react_5.default.createElement("i", {className: "fa fa-circle fa-stack-2x"}), react_5.default.createElement("i", {className: "fa fa-facebook fa-stack-1x fa-inverse"})))), react_5.default.createElement("li", null, react_5.default.createElement("a", {href: "#"}, react_5.default.createElement("span", {className: "fa-stack fa-lg"}, react_5.default.createElement("i", {className: "fa fa-circle fa-stack-2x"}), react_5.default.createElement("i", {className: "fa fa-github fa-stack-1x fa-inverse"}))))), react_5.default.createElement("p", {className: "copyright text-muted"}, "Copyright antash 2017"))))));
                }
            }
            exports_11("default", Footer);
        }
    }
});
System.register("Components/header", ['react'], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var react_6;
    var Header;
    return {
        setters:[
            function (react_6_1) {
                react_6 = react_6_1;
            }],
        execute: function() {
            class Header extends react_6.default.Component {
                render() {
                    const imageStyle = {
                        backgroundImage: "url('Content/Images/" + this.props.imageFileName + "')"
                    };
                    return (react_6.default.createElement("header", {className: "intro-header", style: imageStyle}, react_6.default.createElement("div", {className: "container"}, react_6.default.createElement("div", {className: "row"}, react_6.default.createElement("div", {className: "col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"}, react_6.default.createElement("div", {className: "site-heading"}, react_6.default.createElement("h1", null, this.props.header), react_6.default.createElement("hr", {className: "small"}), react_6.default.createElement("span", {className: "subheading"}, this.props.subheader)))))));
                }
            }
            exports_12("default", Header);
        }
    }
});
System.register("Components/navigator", ['react', 'react-router-dom'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var react_7, react_router_dom_1;
    var Navigator;
    return {
        setters:[
            function (react_7_1) {
                react_7 = react_7_1;
            },
            function (react_router_dom_1_1) {
                react_router_dom_1 = react_router_dom_1_1;
            }],
        execute: function() {
            class Navigator extends react_7.default.Component {
                render() {
                    return (react_7.default.createElement("nav", {className: "navbar navbar-default navbar-custom navbar-fixed-top"}, react_7.default.createElement("div", {className: "container-fluid"}, react_7.default.createElement("div", {className: "navbar-header page-scroll"}, react_7.default.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1"}, react_7.default.createElement("span", {className: "sr-only"}, "Toggle navigation"), "Menu ", react_7.default.createElement("i", {className: "fa fa-bars"})), react_7.default.createElement(react_router_dom_1.Link, {className: "navbar-brand", to: "/"}, "Start Bootstrap")), react_7.default.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, react_7.default.createElement("ul", {className: "nav navbar-nav navbar-right"}, react_7.default.createElement("li", null, react_7.default.createElement(react_router_dom_1.Link, {to: "/"}, "Home")), react_7.default.createElement("li", null, react_7.default.createElement(react_router_dom_1.Link, {to: "/about"}, "About")), react_7.default.createElement("li", null, react_7.default.createElement(react_router_dom_1.Link, {to: "/post"}, "Sample Post")), react_7.default.createElement("li", null, react_7.default.createElement(react_router_dom_1.Link, {to: "/contact"}, "Contact")))))));
                }
            }
            exports_13("default", Navigator);
        }
    }
});
System.register("Components/PostEditor/editorToolbar", ['react'], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var react_8;
    var EditorToolbar;
    return {
        setters:[
            function (react_8_1) {
                react_8 = react_8_1;
            }],
        execute: function() {
            class EditorToolbar extends react_8.default.Component {
                onBoldClick() {
                    this.props.onStyleChanged('BOLD');
                }
                onItalicClick() {
                    this.props.onStyleChanged('ITALIC');
                }
                onUnderlineClick() {
                    this.props.onStyleChanged('UNDERLINE');
                }
                render() {
                    return (react_8.default.createElement("div", null, react_8.default.createElement("button", {className: "toolButton", onClick: this.onBoldClick.bind(this)}, "Bold"), react_8.default.createElement("button", {className: "toolButton", onClick: this.onItalicClick.bind(this)}, "Italic"), react_8.default.createElement("button", {className: "toolButton", onClick: this.onUnderlineClick.bind(this)}, "Underline")));
                }
            }
            exports_14("default", EditorToolbar);
        }
    }
});
System.register("Components/postEditor", ['react', 'draft-js', "Components/PostEditor/editorToolbar"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var react_9, draft_js_1, editorToolbar_1;
    var PostEditor;
    return {
        setters:[
            function (react_9_1) {
                react_9 = react_9_1;
            },
            function (draft_js_1_1) {
                draft_js_1 = draft_js_1_1;
            },
            function (editorToolbar_1_1) {
                editorToolbar_1 = editorToolbar_1_1;
            }],
        execute: function() {
            class PostEditor extends react_9.default.Component {
                constructor(props) {
                    super(props);
                    this.state = { editorState: draft_js_1.EditorState.createEmpty() };
                }
                onChange(e) {
                    this.setState({ editorState: e });
                }
                handleKeyCommand(command) {
                    const newState = draft_js_1.RichUtils.handleKeyCommand(this.state.editorState, command);
                    if (newState) {
                        this.onChange(newState);
                        return 'handled';
                    }
                    return 'not-handled';
                }
                handleStyleChanged(style) {
                    this.onChange(draft_js_1.RichUtils.toggleInlineStyle(this.state.editorState, style));
                }
                render() {
                    return (react_9.default.createElement("div", null, react_9.default.createElement(editorToolbar_1.default, {onStyleChanged: this.handleStyleChanged.bind(this)}), react_9.default.createElement("div", {className: "editor"}, react_9.default.createElement(draft_js_1.Editor, {editorState: this.state.editorState, handleKeyCommand: this.handleKeyCommand.bind(this), onChange: this.onChange.bind(this)}))));
                }
            }
            exports_15("default", PostEditor);
        }
    }
});
System.register("Models/postData", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("Stores/postStore", ['fbemitter', "dispatcher", "Actions/actionTypes"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var fbemitter_2, dispatcher_3, Types;
    var PostStore, postStore;
    return {
        setters:[
            function (fbemitter_2_1) {
                fbemitter_2 = fbemitter_2_1;
            },
            function (dispatcher_3_1) {
                dispatcher_3 = dispatcher_3_1;
            },
            function (Types_3) {
                Types = Types_3;
            }],
        execute: function() {
            class PostStore extends fbemitter_2.EventEmitter {
                constructor() {
                    super();
                    this.loadedAbstracts = [];
                    this.activePost = {
                        abstract: {
                            author: "",
                            publishDate: "",
                            bgImageFileName: "",
                        },
                        text: "hello post!"
                    };
                }
                getAllAbstracts() {
                    return this.loadedAbstracts;
                }
                getActivePost() {
                    return this.activePost;
                }
                getActivePostAbstract() {
                    return this.activePost.abstract;
                }
                handleActions(action) {
                    switch (action.type) {
                        case Types.RECIEVE_ABSTRACTS: {
                            this.loadedAbstracts = action.data.data;
                            this.emit("change");
                        }
                        case Types.RECIEVE_POST: {
                            this.activePost = action.data.data;
                            this.emit("change");
                        }
                    }
                }
            }
            postStore = new PostStore;
            dispatcher_3.default.register(postStore.handleActions.bind(postStore));
            exports_17("default",postStore);
        }
    }
});
System.register("Components/postHeader", ['react', "Stores/postStore"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var react_10, postStore_1;
    var PostHeader;
    return {
        setters:[
            function (react_10_1) {
                react_10 = react_10_1;
            },
            function (postStore_1_1) {
                postStore_1 = postStore_1_1;
            }],
        execute: function() {
            class PostHeader extends react_10.default.Component {
                constructor() {
                    super();
                    this.state = {};
                }
                componentWillMount() {
                    postStore_1.default.addListener("change", () => {
                        this.setState(postStore_1.default.getActivePostAbstract());
                    });
                }
                componentWillUnmount() {
                    postStore_1.default.removeAllListeners();
                }
                render() {
                    const imageStyle = {
                        backgroundImage: "url('Content/Images/" + this.state.bgImageFileName + "')"
                    };
                    return (react_10.default.createElement("header", {className: "intro-header", style: imageStyle}, react_10.default.createElement("div", {className: "container"}, react_10.default.createElement("div", {className: "row"}, react_10.default.createElement("div", {className: "col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"}, react_10.default.createElement("div", {className: "post-heading"}, react_10.default.createElement("h1", null, this.state.header), react_10.default.createElement("h2", {class: "subheading"}, this.state.subheader), react_10.default.createElement("span", {class: "meta"}, "Posted by ", react_10.default.createElement("a", {href: "#"}, this.state.author), " on ", this.state.publishDate)))))));
                }
            }
            exports_18("default", PostHeader);
        }
    }
});
System.register("Pages/home", ['react', "Components/commentBox"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var react_11, commentBox_1;
    var Home;
    return {
        setters:[
            function (react_11_1) {
                react_11 = react_11_1;
            },
            function (commentBox_1_1) {
                commentBox_1 = commentBox_1_1;
            }],
        execute: function() {
            class Home extends react_11.default.Component {
                render() {
                    return (react_11.default.createElement("div", null, react_11.default.createElement(commentBox_1.default, null)));
                }
            }
            exports_19("default", Home);
        }
    }
});
System.register("Pages/about", ['react'], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var react_12;
    var About;
    return {
        setters:[
            function (react_12_1) {
                react_12 = react_12_1;
            }],
        execute: function() {
            class About extends react_12.default.Component {
                render() {
                    return (react_12.default.createElement("div", null, "hello about!"));
                }
            }
            exports_20("default", About);
        }
    }
});
System.register("Pages/post", ['react', "Components/postEditor"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var react_13, postEditor_1;
    var Home;
    return {
        setters:[
            function (react_13_1) {
                react_13 = react_13_1;
            },
            function (postEditor_1_1) {
                postEditor_1 = postEditor_1_1;
            }],
        execute: function() {
            class Home extends react_13.default.Component {
                render() {
                    console.log(this.props);
                    return (react_13.default.createElement("div", null, react_13.default.createElement(postEditor_1.default, null)));
                }
            }
            exports_21("default", Home);
        }
    }
});
System.register("Pages/contact", ['react'], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var react_14;
    var Home;
    return {
        setters:[
            function (react_14_1) {
                react_14 = react_14_1;
            }],
        execute: function() {
            class Home extends react_14.default.Component {
                render() {
                    return (react_14.default.createElement("div", null, "hello contact!"));
                }
            }
            exports_22("default", Home);
        }
    }
});
System.register("Pages/layout", ['react', 'react-router-dom', "Pages/home", "Pages/about", "Pages/post", "Pages/contact", "Components/navigator", "Components/header", "Components/postHeader", "Components/footer"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var react_15, react_router_dom_2, home_1, about_1, post_1, contact_1, navigator_1, header_1, postHeader_1, footer_1;
    var Layout;
    return {
        setters:[
            function (react_15_1) {
                react_15 = react_15_1;
            },
            function (react_router_dom_2_1) {
                react_router_dom_2 = react_router_dom_2_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (post_1_1) {
                post_1 = post_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (navigator_1_1) {
                navigator_1 = navigator_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (postHeader_1_1) {
                postHeader_1 = postHeader_1_1;
            },
            function (footer_1_1) {
                footer_1 = footer_1_1;
            }],
        execute: function() {
            class Layout extends react_15.default.Component {
                render() {
                    return (react_15.default.createElement("div", null, react_15.default.createElement(navigator_1.default, null), react_15.default.createElement(react_router_dom_2.Switch, null, react_15.default.createElement(react_router_dom_2.Route, {exact: true, path: "/", render: () => react_15.default.createElement(header_1.default, {header: "Clean Blog", subheader: "A Clean Blog Theme by Start Bootstrap", imageFileName: "home-bg.jpg"})}), react_15.default.createElement(react_router_dom_2.Route, {path: "/about", render: () => react_15.default.createElement(header_1.default, {header: "About Me", subheader: "This is what I do.", imageFileName: "about-bg.jpg"})}), react_15.default.createElement(react_router_dom_2.Route, {path: "/post/:postId?", component: postHeader_1.default}), react_15.default.createElement(react_router_dom_2.Route, {path: "/contact", render: () => react_15.default.createElement(header_1.default, {header: "Contact Me", subheader: "Have questions? I have answers(maybe).", imageFileName: "contact-bg.jpg"})})), react_15.default.createElement(react_router_dom_2.Switch, null, react_15.default.createElement(react_router_dom_2.Route, {exact: true, path: "/", component: home_1.default}), react_15.default.createElement(react_router_dom_2.Route, {path: "/about", component: about_1.default}), react_15.default.createElement(react_router_dom_2.Route, {path: "/post/:postId?", component: post_1.default}), react_15.default.createElement(react_router_dom_2.Route, {path: "/contact", component: contact_1.default})), react_15.default.createElement(footer_1.default, null)));
                }
            }
            exports_23("default", Layout);
        }
    }
});
System.register("index", ['react', 'react-dom', "Pages/layout", 'react-router-dom'], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var react_16, react_dom_1, layout_1, react_router_dom_3;
    return {
        setters:[
            function (react_16_1) {
                react_16 = react_16_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (layout_1_1) {
                layout_1 = layout_1_1;
            },
            function (react_router_dom_3_1) {
                react_router_dom_3 = react_router_dom_3_1;
            }],
        execute: function() {
            react_dom_1.default.render(react_16.default.createElement(react_router_dom_3.HashRouter, null, react_16.default.createElement(layout_1.default, null)), document.getElementById("app"));
        }
    }
});
//# sourceMappingURL=bundle.js.map