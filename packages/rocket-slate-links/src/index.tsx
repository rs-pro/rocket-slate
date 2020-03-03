import React from 'react';
import { Range, Transforms } from 'slate';
import { RenderElementProps, useSlate } from 'slate-react';
import {
  withLink,
  LinkPlugin,
  RenderElementOptions,
  ToolbarBlock,
  isLinkActive,
  LINK,
  unwrapLink,
} from 'slate-plugins-next';
import { RocketTooltip, withBaseStyleButton, withButtonRef, IRocketSlatePlugin } from '@rocket-slate/core';
import { IconLink } from '@rocket-slate/icons';

export { unwrapLink };

export const wrapLink = (editor, { id, url }) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: LINK,
    data: {
      id,
      url,
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
    wrapLink(editor, url);
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
    withPlugin: withLink,
  };
};

const RocketSlateLinksButtonWrap = withButtonRef(withBaseStyleButton(ToolbarBlock));

const RocketSlateLinksButton = () => {
  const editor = useSlate();
  return (
    <RocketTooltip title="Добавить ссылку">
      <RocketSlateLinksButtonWrap
        icon={<IconLink />}
        format={LINK}
        onMouseDown={(event) => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the link:');
          if (!url) {
            return;
          }
          insertLink(editor, url);
        }}
      />
    </RocketTooltip>
  );
};

export { RocketSlateLinksPlugin, RocketSlateLinksButton };
