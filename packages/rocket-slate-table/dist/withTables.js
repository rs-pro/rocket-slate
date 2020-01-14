"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

const withTables = editor => {
  const {
    deleteBackward,
    deleteForward,
    insertBreak
  } = editor;

  editor.deleteBackward = unit => {
    const {
      selection
    } = editor;

    if (selection && _slate.Range.isCollapsed(selection)) {
      const [cell] = _slate.Editor.nodes(editor, {
        match: n => n.type === 'table-cell'
      });

      if (cell) {
        const [, cellPath] = cell;

        const start = _slate.Editor.start(editor, cellPath);

        if (_slate.Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = unit => {
    const {
      selection
    } = editor;

    if (selection && _slate.Range.isCollapsed(selection)) {
      const [cell] = _slate.Editor.nodes(editor, {
        match: n => n.type === 'table-cell'
      });

      if (cell) {
        const [, cellPath] = cell;

        const end = _slate.Editor.end(editor, cellPath);

        if (_slate.Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const {
      selection
    } = editor;

    if (selection) {
      const [table] = _slate.Editor.nodes(editor, {
        match: n => n.type === 'table'
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

var _default = withTables;
exports.default = _default;
//# sourceMappingURL=withTables.js.map