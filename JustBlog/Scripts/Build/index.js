"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var commentBox_1 = require("./CommentBox/commentBox");
react_dom_1.default.render(react_1.default.createElement(commentBox_1.default, { url: "/comments", submitUrl: "/comments/new", pollInterval: 2000 }), document.getElementById("container"));
//# sourceMappingURL=index.js.map