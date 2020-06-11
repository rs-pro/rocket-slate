import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useSlate } from 'slate-react';
import {
  insertTable,
  deleteTable,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  isSelectionInTable,
} from 'slate-plugins-next';
import { RocketButton } from '@rocket-slate/editor';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import { IconTableColAdd, IconTableColDel, IconTableRowAdd, IconTableRowDel } from '@rocket-slate/icons';

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

  .rocket-slate-table-menu__sub-btn {
    color: #000;
  }

  .rocket-slate-table-menu__sub-btn[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }

  > div {
    white-space: nowrap;
  }
`;

const useCallbackButtonTable = (editor, callback) => {
  return useCallback(
    event => {
      event.preventDefault();
      callback(editor);
    },
    [editor, callback],
  );
};

export const RocketSlateTableButton: React.FC<{ className?: string }> = ({ className }) => {
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
      <RocketButton
        title={editor.getLocale('table.btns.table_control')}
        active={isShowList || isTableActive}
        className={classNames('rocket-slate-table-menu__btn', className)}
        icon={<FontAwesomeIcon icon={faTable} />}
        onMouseDown={handlerClickBtnTable}
      />
      {isShowList && (
        <ListWrap className="rocket-slate-table-menu__lst">
          <div>
            <RocketButton
              title={editor.getLocale('table.btns.table_create')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
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
            <RocketButton
              title={editor.getLocale('table.btns.table_row_add')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
              icon={<IconTableRowAdd />}
              onMouseDown={handlerTableRowAdd}
              disabled={!isTableActive}
            />
            <RocketButton
              title={editor.getLocale('table.btns.table_row_delete')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
              icon={<IconTableRowDel />}
              onMouseDown={handlerTableRowDelete}
              disabled={!isTableActive}
            />
          </div>
          <div>
            <RocketButton
              title={editor.getLocale('table.btns.table_delete')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
              icon={
                <IconWrap>
                  <FontAwesomeIcon icon={faTable} />
                  <IconSub>
                    <FontAwesomeIcon icon={faMinus} />
                  </IconSub>
                </IconWrap>
              }
              onMouseDown={handlerTableDelete}
              disabled={!isTableActive}
            />
            <RocketButton
              title={editor.getLocale('table.btns.table_col_add')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
              icon={<IconTableColAdd />}
              onMouseDown={handlerTableColumnAdd}
              disabled={!isTableActive}
            />
            <RocketButton
              title={editor.getLocale('table.btns.table_col_delete')}
              className={classNames('rocket-slate-table-menu__sub-btn', className)}
              icon={<IconTableColDel />}
              onMouseDown={handlerTableColumnDelete}
              disabled={!isTableActive}
            />
          </div>
        </ListWrap>
      )}
    </ButtonTableWrap>
  );
};
