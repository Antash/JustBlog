/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commentForm__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commentList__ = __webpack_require__(2);



class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    loadCommentsFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }
    handleCommentSubmit(comment) {
        var data = new FormData();
        data.append('Author', comment.Author);
        data.append('Text', comment.Text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    }
    render() {
        return React.createElement(
            'div',
            { className: 'commentBox' },
            React.createElement(
                'h1',
                null,
                'Comments'
            ),
            React.createElement(__WEBPACK_IMPORTED_MODULE_1__commentList__["a" /* default */], { data: this.state.data }),
            React.createElement(__WEBPACK_IMPORTED_MODULE_0__commentForm__["a" /* default */], { onCommentSubmit: this.handleCommentSubmit.bind(this) })
        );
    }
}
ReactDOM.render(React.createElement(CommentBox, { url: '/comments', submitUrl: '/comments/new', pollInterval: 2000 }), document.getElementById("content"));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CommentForm extends React.Component {
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
        this.props.onCommentSubmit({ Author: author, Text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return React.createElement(
            'form',
            { className: 'commentForm', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', {
                type: 'text',
                placeholder: 'Your name',
                value: this.state.author,
                onChange: this.handleAuthorChange.bind(this)
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Say something...',
                value: this.state.text,
                onChange: this.handleTextChange.bind(this)
            }),
            React.createElement('input', { type: 'submit', value: 'Post' })
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommentForm;
;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comment__ = __webpack_require__(3);


class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(
                __WEBPACK_IMPORTED_MODULE_0__comment__["a" /* default */],
                { author: comment.Author, key: comment.Id },
                comment.Text
            );
        });
        return React.createElement(
            "div",
            { className: "commentList" },
            commentNodes
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommentList;
;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Comment extends React.Component {
    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return React.createElement(
            "div",
            { className: "comment" },
            React.createElement(
                "h2",
                { className: "commentAuthor" },
                this.props.author
            ),
            React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
        );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Comment;
;

/***/ })
/******/ ]);