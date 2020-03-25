import React, { useCallback } from 'react';
import isUrl from 'is-url';
import { Range, Transforms } from 'slate';
import { RenderElementProps, useSlate } from 'slate-react';
import { LinkPlugin, RenderElementOptions, isLinkActive, LINK, unwrapLink } from 'slate-plugins-next';
import { RocketTooltip, RocketButtonBlock, IRocketSlatePlugin } from '@rocket-slate/editor';
import { IconLink } from '@rocket-slate/icons';

export { unwrapLink };

export const wrapLink = (editor, { url, file }: { url: string; file?: any }) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: LINK,
    data: {
      url,
      ...(file ? { file } : undefined),
    },
    children: isCollapsed
      ? [
          {
            text: url,
          },
        ]
      : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, {
      split: true,
    });
    Transforms.collapse(editor, {
      edge: 'end',
    });
  }
};

export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, { url });
  }
};

const RocketSlateLinkElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const {
    data: { url },
  } = element;
  return (
    <a {...attributes} href={url} data-slate-type={LINK}>
      {children}
    </a>
  );
};

const RocketSlateLinksPlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: LinkPlugin({
      component: RocketSlateLinkElement,
      ...options,
    }),
    withPlugin: (editor) => {
      const { insertData, insertText, isInline } = editor;

      editor.isInline = (element) => {
        return element.type === LINK ? true : isInline(element);
      };

      editor.insertText = (text) => {
        if (text && isUrl(text)) {
          wrapLink(editor, { url: text });
        } else {
          insertText(text);
        }
      };

      editor.insertData = (data) => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
          wrapLink(editor, { url: text });
        } else {
          insertData(data);
        }
      };

      return editor;
    },
  };
};

const RocketSlateLinksButton = () => {
  const editor = useSlate();
  const handlerMouseDownLinkButton = useCallback(
    (event: React.MouseEvent<any>) => {
      event.preventDefault();
      const url = window.prompt('Enter the URL of the link:');
      if (!url) {
        return;
      }
      insertLink(editor, url);
    },
    [editor],
  );
  return (
    <RocketTooltip title="Добавить ссылку">
      <RocketButtonBlock icon={<IconLink />} format={LINK} onMouseDown={handlerMouseDownLinkButton} />
    </RocketTooltip>
  );
};

export { RocketSlateLinksPlugin, RocketSlateLinksButton };
