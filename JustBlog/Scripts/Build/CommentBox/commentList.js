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
var comment_1 = require("./comment");
var CommentList = (function (_super) {
    __extends(CommentList, _super);
    function CommentList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentList.prototype.render = function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (react_1.default.createElement(comment_1.Comment, { author: comment.author, key: comment.id, children: comment.text }, comment.text));
        });
        return (react_1.default.createElement("div", { className: "commentList" }, commentNodes));
    };
    return CommentList;
}(react_1.default.Component));
exports.default = CommentList;
;
//# sourceMappingURL=commentList.js.map