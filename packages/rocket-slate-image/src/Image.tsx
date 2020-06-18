import React, { useCallback, useMemo, useRef } from 'react';
import { Transforms } from 'slate';
import { RenderElementProps, useSlate, useFocused, useReadOnly, useSelected, ReactEditor } from 'slate-react';
import { Resizable } from 're-resizable';
import { IMAGE } from 'slate-plugins-next';
import styled from 'styled-components';

const regexpDataUrl = /^data:/i;
const isDataUrl = url => regexpDataUrl.test(url);

export interface IImageData {
  src: string;
  id?: string | number;
  title?: string;
  name?: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
}

const RocketSlateImageElementSpan = styled.span`
  display: block;
`;

export const RocketImageElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const image = useRef<HTMLImageElement>(null);
  const editor = useSlate();
  const isFocused = useFocused();
  const isSelected = useSelected();
  const isReadOnly = useReadOnly();
  const { data } = element;
  const { src, height, width, isLoading, title, name } = data as IImageData;
  const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);

  const handlerResize = useCallback(() => {
    if (image && image.current) {
      const { width, height } = image.current;
      Transforms.setNodes(editor, { data: { ...data, width, height } }, { at: path });
    }
  }, [editor, image, path]);

  const size =
    (width !== undefined &&
      height !== undefined && {
        width,
        height,
      }) ||
    undefined;

  const titleImg = title || name || (src && (isDataUrl(src) ? src.slice(0, 10) : src)) || '';

  return (
    <RocketSlateImageElementSpan className="RocketSlateImageElement" {...attributes} data-slate-type={IMAGE}>
      <RocketSlateImageElementSpan className="RocketSlateImageElement__Holder" contentEditable={false}>
        {isReadOnly || isLoading ? (
          <RocketSlateImageElementSpan
            className="RocketSlateImageElement__Wrapper"
            style={{ ...size, ...(isLoading ? { position: 'relative' } : undefined) }}
          >
            <a
              href={isReadOnly ? src : undefined}
              rel="noopener noreferrer"
              target="_blank"
              style={{ display: 'block' }}
            >
              <img
                ref={image}
                src={src}
                alt={titleImg}
                title={titleImg}
                style={{ maxWidth: '100%', opacity: isLoading ? 0.2 : 1 }}
              />
            </a>
            {isLoading && <div style={{ position: 'absolute', top: 0, left: 0 }}>Загрузка...</div>}
          </RocketSlateImageElementSpan>
        ) : (
          <Resizable
            className="RocketSlateImageElement__Resizer"
            size={size}
            minHeight={100}
            minWidth={100}
            onResizeStop={handlerResize}
          >
            <img
              ref={image}
              src={src}
              alt={titleImg}
              title={titleImg}
              style={{ maxWidth: '100%', boxShadow: isSelected && isFocused ? '0 0 0 2px #B4D5FF' : 'none' }}
            />
          </Resizable>
        )}
      </RocketSlateImageElementSpan>
      {children}
    </RocketSlateImageElementSpan>
  );
};
