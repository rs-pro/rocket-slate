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
        <Tippy content="Добавить колонку">
          <a className="editor__button"
            onClick={this.onInsertColumn}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </a>
        </Tippy>

        <Tippy content="Добавить строку">
          <a className="editor__button"
            onClick={this.onInsertRow}
          >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </a>
        </Tippy>

        <Tippy content="Удалить колонку">
          <a className="editor__button"
            onClick={this.onRemoveColumn}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tippy>

        <Tippy content="Удалить строку">
          <a className="editor__button"
            onClick={this.onRemoveRow}
          >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tippy>

        <Tippy content="Удалить таблицу">
          <a className="editor__button"
            onClick={this.onRemoveTable}
          >
            <FontAwesomeIcon icon={faTable} />
            <span className="editor__button-mark">
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </a>
        </Tippy>

        <Tippy content="Вкл\выкл заголовки">
          <a className="editor__button"
            onClick={this.onRemoveTable}
          >
            <FontAwesomeIcon icon={faTable} />
          </a>
        </Tippy>
      </div>
    )
  }
}

export default TableToolbar;
