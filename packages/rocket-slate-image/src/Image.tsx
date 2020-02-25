import React, { useMemo, useRef } from 'react';
import { Transforms } from 'slate';
import { RenderElementProps, useSlate, useFocused, useReadOnly, useSelected, ReactEditor } from 'slate-react';
import { Resizable } from 're-resizable';
import { IMAGE } from 'slate-plugins-next';

export interface IImageData {
  src: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
}

export const RocketImageElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const image = useRef<HTMLImageElement>(null);
  const editor = useSlate();
  const isFocused = useFocused();
  const isSelected = useSelected();
  const isReadOnly = useReadOnly();
  const { data } = element;
  const { src, height, width, isLoading } = data as IImageData;
  const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);

  const size =
    (width !== undefined &&
      height !== undefined && {
        width,
        height,
      }) ||
    undefined;

  return (
    <div {...attributes} data-slate-type={IMAGE}>
      <div contentEditable={false}>
        {isReadOnly || isLoading ? (
          <div style={{ ...size, ...(isLoading ? { position: 'relative' } : undefined) }}>
            <a href={isReadOnly ? src : undefined} target="_blank" style={{ display: 'block' }}>
              <img ref={image} src={src} alt="" style={{ maxWidth: '100%', opacity: isLoading ? 0.2 : 1 }} />
            </a>
            {isLoading && <div style={{ position: 'absolute', top: 0, left: 0 }}>Загрузка...</div>}
          </div>
        ) : (
          <Resizable
            size={size}
            minHeight={100}
            minWidth={100}
            onResizeStop={(e, direction, ref, d) => {
              if (image && image.current) {
                const { width, height } = image.current;
                Transforms.setNodes(editor, { data: { ...data, width, height } }, { at: path });
              }
            }}
          >
            <img
              ref={image}
              src={src}
              alt=""
              style={{ maxWidth: '100%', boxShadow: isSelected && isFocused ? '0 0 0 2px #B4D5FF' : 'none' }}
            />
          </Resizable>
        )}
      </div>
      {children}
    </div>
  );
};
