import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill } from '@fortawesome/free-solid-svg-icons/faFill';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { useSlate } from 'slate-react';
import { RocketButton, RocketTooltip } from '@rocket-slate/editor';

import { Editor } from 'slate';
import colorList from './colorList';

const ButtonWrap = styled.div`
  display: inline-block;
  position: relative;
`;

const ColorList = styled.div`
  position: absolute;
  top: 36px;
  left: 0px;
  background: #fff;
  padding: 5px;
  width: 154px;
  z-index: 50000;
  border: 1px solid #ccc;
  line-height: 14px;
`;

const ColorItem = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px;
  display: inline-block;
  border: 1px solid #f2f2f2;
  cursor: pointer;

  :hover {
    border-color: #000;
  }
`;

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const isColorActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks && marks[format];
};

const colorUnset = (editor, format) => {
  Editor.removeMark(editor, format);
};

const setColor = (editor, format, color) => {
  Editor.addMark(editor, format, color);
};

export const COLOR_FONT = 'fg_color' as const;
export const COLOR_BG = 'bg_color' as const;

type ColorType = typeof COLOR_FONT | typeof COLOR_BG;

const ColorIcon: React.FC<{ type: ColorType }> = ({ type }) => {
  if (type === COLOR_BG) return <FontAwesomeIcon icon={faPalette} />;
  if (type === COLOR_FONT) return <FontAwesomeIcon icon={faFill} />;
  return null;
};

const getTitle = (type: ColorType) => {
  if (type === 'bg_color') return 'Цвет фона';
  if (type === 'fg_color') return 'Цвет текста';
  return 'color';
};

export const RocketSlateColorsButton: React.FC<{ type: ColorType }> = ({ type }) => {
  const editor = useSlate();
  const [isShow, setShow] = useState(false);
  const handlerClickToggleShow = () => {
    setShow(prevState => !prevState);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShow(false));
  return (
    <ButtonWrap className="RocketSlateColorButton" ref={wrapperRef}>
      <RocketTooltip title={getTitle(type)}>
        <RocketButton
          className="RocketSlateColorButton__Mark"
          icon={<ColorIcon type={type} />}
          onMouseDown={handlerClickToggleShow}
        />
      </RocketTooltip>
      {isShow && (
        <ColorList className="RocketSlateColorButton__List">
          <div className="RocketSlateColorButton__ListItems">
            {colorList.map(color => (
              <ColorItem key={color} style={{ backgroundColor: color }} onClick={() => setColor(editor, type, color)} />
            ))}
          </div>
          {isColorActive(editor, type) && (
            <button type="button" onClick={() => colorUnset(editor, type)}>
              Clear
            </button>
          )}
        </ColorList>
      )}
    </ButtonWrap>
  );
};
