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
var remarkable_1 = require("remarkable");
;
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comment.prototype.rawMarkup = function () {
        var md = new remarkable_1.default();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    };
    Comment.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "comment" },
            react_1.default.createElement("h2", { className: "commentAuthor" }, this.props.author),
            react_1.default.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })));
    };
    return Comment;
}(react_1.default.Component));
exports.Comment = Comment;
;
//# sourceMappingURL=comment.js.map