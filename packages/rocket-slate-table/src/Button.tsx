import React, { useCallback, useState } from 'react';

import { useSlate } from 'slate-react';
import {
  ToolbarTable,
  insertTable,
  deleteTable,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  isSelectionInTable,
} from 'slate-plugins-next';
import { RocketTooltip, RocketButton } from '@rocket-slate/editor';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import {
  IconTableColAdd,
  IconTableColDel,
  IconTableRowAdd,
  IconTableRowDel
} from '@rocket-slate/icons'


const ButtonTableWrap = styled.div`
  position: relative;
`;

const IconWrap = styled.div`
  position: relative;
`;

const IconSub = styled.div`
  position: absolute;
  padding: 2px;
  font-size: 0.4em;
  background-color: #fff;
  border-radius: 50%;
  bottom: 0;
  right: 0;

  > svg {
    height: auto;
  }
`;

const ListWrap = styled.div`
  position: absolute;
  padding: 2px;
  top: 100%;
  left: 0;
  margin-top: 2px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;

  > div {
    white-space: nowrap;
  }
`;

const useCallbackButtonTable = (editor, callback) => {
  return useCallback(
    (event) => {
      event.preventDefault();
      callback(editor);
    },
    [editor, callback],
  );
};

export const RocketSlateTableButton = () => {
  const editor = useSlate();
  const isTableActive = isSelectionInTable(editor);

  const [isShowList, setShowList] = useState(false);
  const handlerClickBtnTable = useCallback(() => {
    setShowList(!isShowList);
  }, [isShowList]);

  const handlerTableInsert = useCallbackButtonTable(editor, insertTable);
  const handlerTableDelete = useCallbackButtonTable(editor, deleteTable);
  const handlerTableRowAdd = useCallbackButtonTable(editor, addRow);
  const handlerTableRowDelete = useCallbackButtonTable(editor, deleteRow);
  const handlerTableColumnAdd = useCallbackButtonTable(editor, addColumn);
  const handlerTableColumnDelete = useCallbackButtonTable(editor, deleteColumn);

  return (
    <ButtonTableWrap className="rocket-slate-table-menu">
      <RocketTooltip title="Управление таблицей">
        <RocketButton
          active={isShowList}
          className="rocket-slate-table-menu__btn"
          icon={<FontAwesomeIcon icon={faTable} />}
          onMouseDown={handlerClickBtnTable}
        />
      </RocketTooltip>
      {isShowList && (
        <ListWrap className="rocket-slate-table-menu__lst">
          <div>
            <RocketTooltip title="Создать таблицу">
              <RocketButton
                active
                icon={
                  <IconWrap>
                    <FontAwesomeIcon icon={faTable} />
                    <IconSub>
                      <FontAwesomeIcon icon={faPlus} />
                    </IconSub>
                  </IconWrap>
                }
                onMouseDown={handlerTableInsert}
              />
            </RocketTooltip>
            <RocketTooltip title="Добавить ряд">
              <RocketButton active={isTableActive} icon={<IconTableRowAdd />} onMouseDown={handlerTableRowAdd} />
            </RocketTooltip>
            <RocketTooltip title="Удалить ряд">
              <RocketButton active={isTableActive} icon={<IconTableRowDel />} onMouseDown={handlerTableRowDelete} />
            </RocketTooltip>
          </div>
          <div>
            <RocketTooltip title="Удалить таблицу">
              <RocketButton
                active={isTableActive}
                icon={
                  <IconWrap>
                    <FontAwesomeIcon icon={faTable} />
                    <IconSub>
                      <FontAwesomeIcon icon={faMinus} />
                    </IconSub>
                  </IconWrap>
                }
                onMouseDown={handlerTableDelete}
              />
            </RocketTooltip>
            <RocketTooltip title="Добавить столбец">
              <RocketButton active={isTableActive} icon={<IconTableColAdd />} onMouseDown={handlerTableColumnAdd} />
            </RocketTooltip>
            <RocketTooltip title="Удалить столбец">
              <RocketButton active={isTableActive} icon={<IconTableColDel />} onMouseDown={handlerTableColumnDelete} />
            </RocketTooltip>
          </div>
        </ListWrap>
      )}
      {/*<RocketTooltip title="table.column.add">
        <a className="rocket-slate__button" onClick={() => editor.insertColumn()}>
          <FontAwesomeIcon icon={faColumns} />
          <span className="rocket-slate__button-mark">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </a>
      </RocketTooltip>

      <RocketTooltip title="table.row.add">
        <a className="rocket-slate__button" onClick={() => editor.insertRow()}>
          <FontAwesomeIcon icon={faColumns} rotation={90} />
          <span className="rocket-slate__button-mark">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </a>
      </RocketTooltip>

      <RocketTooltip title="table.column.remove">
        <a className="rocket-slate__button" onClick={editor.removeColumn()}>
          <FontAwesomeIcon icon={faColumns} />
          <span className="rocket-slate__button-mark">
            <FontAwesomeIcon icon={faMinus} />
          </span>
        </a>
      </RocketTooltip>

      <RocketTooltip title="table.row.remove">
        <a className="rocket-slate__button" onClick={() => editor.toggleHeaders()}>
          <FontAwesomeIcon icon={faColumns} rotation={90} />
          <span className="rocket-slate__button-mark">
            <FontAwesomeIcon icon={faMinus} />
          </span>
        </a>
      </RocketTooltip>

      <RocketTooltip title="table.remove">
        <a className="rocket-slate__button" onClick={() => editor.removeTable()}>
          <FontAwesomeIcon icon={faTable} />
          <span className="rocket-slate__button-mark">
            <FontAwesomeIcon icon={faMinus} />
          </span>
        </a>
      </RocketTooltip>

      <RocketTooltip title="table.toggle_headers">
        <a className="rocket-slate__button" onClick={() => editor.toggleHeaders()}>
          <FontAwesomeIcon icon={faTable} />
        </a>
      </RocketTooltip>*/}
    </ButtonTableWrap>
  );
};