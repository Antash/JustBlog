"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var commentForm_1 = require("./commentForm");
var commentList_1 = require("./commentList");
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox() {
        var _this = _super.call(this) || this;
        _this.state = {
            data: []
        };
        return _this;
    }
    CommentBox.prototype.loadCommentsFromServer = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    };
    CommentBox.prototype.componentDidMount = function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    };
    CommentBox.prototype.handleCommentSubmit = function (comment) {
        var data = new FormData();
        data.append('Author', comment.author);
        data.append('Text', comment.text);
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    };
    CommentBox.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "commentBox" },
            react_1.default.createElement("h1", null, "Comments"),
            react_1.default.createElement(commentList_1.default, { data: this.state.data }),
            react_1.default.createElement(commentForm_1.default, { onCommentSubmit: this.handleCommentSubmit.bind(this) })));
    };
    return CommentBox;
}(react_1.default.Component));
exports.CommentBox = CommentBox;
exports.default = CommentBox;
//# sourceMappingURL=commentBox.js.map