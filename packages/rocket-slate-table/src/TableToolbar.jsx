import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faColumns } from "@fortawesome/free-solid-svg-icons/faColumns";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

import Button from "./Button";
import Tippy from "@tippy.js/react";

class TableToolbar extends React.PureComponent {
  onInsertColumn = () => {
    this.props.editor.insertColumn()
  }

  onInsertRow = () => {
    this.props.editor.insertRow()
  }

  onRemoveColumn = () => {
    this.props.editor.removeColumn()
  }

  onRemoveRow= () => {
    this.props.editor.removeRow()
  }

  onRemoveTable = () => {
    this.props.editor.removeTable()
  }

  onToggleHeaders = () => {
    this.props.editor.toggleTableHeaders()
  }

  render() {
    const isTable = this.props.editor && this.props.editor.isSelectionInTable(this.props.editorState);
    if (!isTable) {
      return null
    }

    return (
      <div key="tbg6" className="editor__toolbar-group">
        <Tooltip content={"table.column.add"}>
          <a className="editor__button"
            onClick={this.onInsertColumn}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </a>
        </Tooltip>

        <Tooltip content={"table.row.add"}>
          <a className="editor__button"
            onClick={this.onInsertRow}
          >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </a>
        </Tooltip>

        <Tooltip content={"table.column.remove"}>
          <a className="editor__button"
            onClick={this.onRemoveColumn}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tooltip>

        <Tooltip content={"table.row.remove"}>
          <a className="editor__button"
            onClick={this.onToggleHeaders}
          >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tooltip>

        <Tooltip content={"table.remove"}>
          <a className="editor__button"
            onClick={this.onRemoveTable}
          >
            <FontAwesomeIcon icon={faTable} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tooltip>

        <Tooltip content={"table.toggle_headers"}>
          <a className="editor__button"
            onClick={this.onToggleHeaders}
          >
            <FontAwesomeIcon icon={faTable} />
          </a>
        </Tooltip>
      </div>
    )
  }
}

export default TableToolbar;
