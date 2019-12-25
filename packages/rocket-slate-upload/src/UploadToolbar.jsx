import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";

import Button from "./Button";
import Tippy from "@tippy.js/react";

import { wrapLink, unwrapLink } from "@rocket-slate/utils"

const ImageButton = React.forwardRef((props, ref) => {
  const { uploadFiles, ...rest } = props;
  return (
    <Button ref={ref} className="editor__button--upload" {...rest}>
      <FontAwesomeIcon icon={faImage} />
      <input
        type="file"
        multiple
        onChange={uploadFiles("image")}
      />
    </Button>
  );
});

const FileButton = React.forwardRef((props, ref) => {
  const { uploadFiles, ...rest } = props;
  return (
    <Button ref={ref} className="editor__button--upload" {...rest}>
      <FontAwesomeIcon icon={faUpload} />
      <input
        type="file"
        multiple
        onChange={uploadFiles("file")}
      />
    </Button>
  );
});

const LinkButton = React.forwardRef((props, ref) => {
  const { onClickLink, ...rest } = props;
  return (
    <Button ref={ref} onMouseDown={onClickLink} {...rest}>
      <FontAwesomeIcon icon={faLink} />
    </Button>
  );
});

export default class UploadToolbar extends React.PureComponent {
  /**
   * Check whether the current selection has a link in it.
   *
   * @return {Boolean} hasLinks
   */

  hasLinks = () => {
    const { value } = this.props.editorState;
    return value.inlines.some(inline => inline.type == "link");
  };

  /**
   * When clicking a link, if the selection has a link in it, remove the link.
   * Otherwise, add a new link with an href and text.
   *
   * @param {Event} event
   */

  onClickLink = event => {
    event.preventDefault();
    const { editor } = this.props;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.call(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt("Адрес ссылки:");

      if (href === null) {
        return;
      }

      editor.call(wrapLink, href);
    } else {
      const href = window.prompt("Адрес ссылки:");

      if (href === null) {
        return;
      }

      const text = window.prompt("Текст ссылки:");

      if (text === null) {
        return;
      }

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .call(wrapLink, href);
    }
  };

  render() {
    return (
      <div key="tbg5" className="editor__toolbar-group">
        <Tippy content="Загрузить изображение">
          <ImageButton uploadFiles={this.props.uploadFiles} />
        </Tippy>
        <Tippy content="Загрузить файл">
          <FileButton uploadFiles={this.props.uploadFiles} />
        </Tippy>
        <Tippy content="Добавить ссылку">
          <LinkButton onClickLink={this.onClickLink} />
        </Tippy>
      </div>
    )
  }
}


