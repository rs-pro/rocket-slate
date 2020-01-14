"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faTable = require("@fortawesome/free-solid-svg-icons/faTable");

var _faColumns = require("@fortawesome/free-solid-svg-icons/faColumns");

var _faPlus = require("@fortawesome/free-solid-svg-icons/faPlus");

var _faMinus = require("@fortawesome/free-solid-svg-icons/faMinus");

var _utils = require("@rocket-slate/utils");

var _slateReact = require("slate-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TableToolbar() {
  const editor = (0, _slateReact.useSlate)();
  const isTable = editor && editor.isSelectionInTable(editor.state);

  if (!isTable) {
    return null;
  }

  return _react.default.createElement("div", {
    key: "tbg6",
    className: "rocket-slate__toolbar-group"
  }, _react.default.createElement(_utils.Tooltip, {
    content: "table.column.add"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: () => editor.insertColumn()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faColumns.faColumns
  }), _react.default.createElement("span", {
    className: "rocket-slate__button-mark"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faPlus.faPlus
  })))), _react.default.createElement(_utils.Tooltip, {
    content: "table.row.add"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: () => editor.insertRow()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faColumns.faColumns,
    rotation: 90
  }), _react.default.createElement("span", {
    className: "rocket-slate__button-mark"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faPlus.faPlus
  })))), _react.default.createElement(_utils.Tooltip, {
    content: "table.column.remove"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: editor.removeColumn()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faColumns.faColumns
  }), _react.default.createElement("span", {
    className: "rocket-slate__button-mark"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faMinus.faMinus
  })))), _react.default.createElement(_utils.Tooltip, {
    content: "table.row.remove"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: () => editor.toggleHeaders()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faColumns.faColumns,
    rotation: 90
  }), _react.default.createElement("span", {
    className: "rocket-slate__button-mark"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faMinus.faMinus
  })))), _react.default.createElement(_utils.Tooltip, {
    content: "table.remove"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: () => editor.removeTable()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faTable.faTable
  }), _react.default.createElement("span", {
    className: "rocket-slate__button-mark"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faMinus.faMinus
  })))), _react.default.createElement(_utils.Tooltip, {
    content: "table.toggle_headers"
  }, _react.default.createElement("a", {
    className: "rocket-slate__button",
    onClick: () => editor.toggleHeaders()
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _faTable.faTable
  }))));
}

var _default = TableToolbar;
exports.default = _default;
//# sourceMappingURL=TableToolbar.js.map