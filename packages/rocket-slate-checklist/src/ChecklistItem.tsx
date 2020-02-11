import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { compare } from 'fast-json-patch';

import Checkbox from './Checkbox';

/**
 * Check list item.
 *
 * @type {Component}
 */

class CheckListItem extends React.Component<any, any> {
  /**
   * On change, set the new checked value on the block.
   *
   * @param {Event} event
   */

  public onChange = (event) => {
    const checked = event.target.checked;
    this.setChecked(checked);
  };

  public setChecked(checked) {
    const { editor, node } = this.props;
    const vprev = editor.value.toJSON().document.nodes;
    editor.setNodeByKey(node.key, { data: { checked } });
    const vnew = editor.value.toJSON().document.nodes;
    const diff = compare(vprev, vnew);
    // console.log(diff)
    // console.log(editor.props)
    if (editor.props.kind === 'issue') {
      axios
        .patch(`/api/v1/issues/${editor.props.issue.id}/content`, diff)
        .then((r) => {
          // console.log(r.data)
        })
        .catch((e) => {
          console.error(e);
          alert('При сохранении чекбокса произошла ошибка');
          checked = !checked;
          editor.setNodeByKey(node.key, { data: { checked } });
        });
    } else if (editor.props.kind === 'comment') {
      axios
        .patch(`/api/v1/issues/${editor.props.issue.id}/comments/${editor.props.comment.id}/content`, diff)
        .then((r) => {
          // console.log(r.data)
        })
        .catch((e) => {
          console.error(e);
          alert('При сохранении чекбокса произошла ошибка');
          checked = !checked;
          editor.setNodeByKey(node.key, { data: { checked } });
        });
    }
    // console.log("set checkbox", node.key, node.path, checked)
    // console.log(editor.value)
  }

  /**
   * Render a check list item, using `contenteditable="false"` to embed the
   * checkbox right next to the block's text.
   *
   * @return {Element}
   */

  public render() {
    const { attributes, children, node, readOnly } = this.props;
    const checked = node.data.get('checked') || false;
    const cl = classNames('check-list-item', 'editor__checkbox', {
      'editor__checkbox--readonly': readOnly,
    });

    const onCheckItemClick = (e) => {
      if (e.target.tagName === 'A') {
        return;
      }
      if (e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }
      if (readOnly) {
        this.setChecked(!checked);
      }
    };

    return (
      <span className={cl} {...attributes}>
        <span className="check-list-item__checkbox-wrapper" contentEditable={false}>
          <Checkbox checked={checked} onChange={this.onChange} />
          {/* <input type="checkbox" checked={checked} onChange={this.onChange} /> */}
        </span>
        <span
          className={classNames('check-list-item__content-wrapper', {
            'check-list-item__content-wrapper--checked': checked,
          })}
          contentEditable={!readOnly}
          suppressContentEditableWarning={true}
          onClick={onCheckItemClick}
        >
          {children}
        </span>
      </span>
    );
  }
}

export default CheckListItem;
