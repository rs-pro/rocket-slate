import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faColumns } from "@fortawesome/free-solid-svg-icons/faColumns";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { RocketTooltip } from '@rocket-slate/editor';
import { useSlate } from 'slate-react';

function TableToolbar() {
const editor = useSlate()

const isTable = editor && editor.isSelectionInTable(editor.state);
    if (!isTable) {
        return null
    }

    return (
        <div key="tbg6" className="rocket-slate__toolbar-group">
        <RocketTooltip title="table.column.add">
            <a className="rocket-slate__button"
            onClick={() => editor.insertColumn()}
            >
            <FontAwesomeIcon icon={faColumns} />
            <span className="rocket-slate__button-mark">
                <FontAwesomeIcon icon={faPlus} />
            </span>
            </a>
        </RocketTooltip>

        <RocketTooltip title="table.row.add">
            <a className="rocket-slate__button"
            onClick={() => editor.insertRow()}
            >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="rocket-slate__button-mark">
                <FontAwesomeIcon icon={faPlus} />
            </span>
            </a>
        </RocketTooltip>

        <RocketTooltip title="table.column.remove">
            <a className="rocket-slate__button"
            onClick={editor.removeColumn()}
            >
            <FontAwesomeIcon icon={faColumns} />
            <span className="rocket-slate__button-mark">
                <FontAwesomeIcon icon={faMinus} />
            </span>
            </a>
        </RocketTooltip>

        <RocketTooltip title="table.row.remove">
            <a className="rocket-slate__button"
            onClick={() => editor.toggleHeaders()}
            >
            <FontAwesomeIcon icon={faColumns} rotation={90} />
            <span className="rocket-slate__button-mark">
                <FontAwesomeIcon icon={faMinus} />
            </span>
            </a>
        </RocketTooltip>

        <RocketTooltip title="table.remove">
            <a className="rocket-slate__button"
            onClick={() => editor.removeTable()}
            >
            <FontAwesomeIcon icon={faTable} />
            <span className="rocket-slate__button-mark">
                <FontAwesomeIcon icon={faMinus} />
            </span>
            </a>
        </RocketTooltip>

        <RocketTooltip title="table.toggle_headers">
            <a className="rocket-slate__button"
            onClick={() => editor.toggleHeaders()}
            >
            <FontAwesomeIcon icon={faTable} />
            </a>
        </RocketTooltip>
        </div>
    )
}


export default TableToolbar
