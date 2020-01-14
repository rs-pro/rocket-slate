"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withTables", {
  enumerable: true,
  get: function () {
    return _withTables.default;
  }
});
Object.defineProperty(exports, "TableToolbar", {
  enumerable: true,
  get: function () {
    return _TableToolbar.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _rocketSlate = require("rocket-slate");

var _withTables = _interopRequireDefault(require("./withTables"));

var _TableToolbar = _interopRequireDefault(require("./TableToolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _rocketSlate.addElement)("tables", "table", ({
  attributes,
  children
}) => _react.default.createElement("table", attributes, _react.default.createElement("tbody", null, children)));
(0, _rocketSlate.addElement)("tables", "table-row", ({
  attributes,
  children
}) => _react.default.createElement("tr", attributes, children));
(0, _rocketSlate.addElement)("tables", "table-cell", ({
  attributes,
  children
}) => _react.default.createElement("td", attributes, children));
//# sourceMappingURL=index.js.map