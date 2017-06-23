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
var CommentForm = (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm() {
        var _this = _super.call(this) || this;
        _this.state = {
            author: '',
            text: ''
        };
        return _this;
    }
    CommentForm.prototype.handleAuthorChange = function (e) {
        this.setState({ author: e.target.value });
    };
    CommentForm.prototype.handleTextChange = function (e) {
        this.setState({ text: e.target.value });
    };
    CommentForm.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    };
    CommentForm.prototype.render = function () {
        return (react_1.default.createElement("form", { className: "commentForm", onSubmit: this.handleSubmit.bind(this) },
            react_1.default.createElement("input", { type: "text", placeholder: "Your name", value: this.state.author, onChange: this.handleAuthorChange.bind(this) }),
            react_1.default.createElement("input", { type: "text", placeholder: "Say something...", value: this.state.text, onChange: this.handleTextChange.bind(this) }),
            react_1.default.createElement("input", { type: "submit", value: "Post" })));
    };
    return CommentForm;
}(react_1.default.Component));
exports.default = CommentForm;
;
//# sourceMappingURL=commentForm.js.map