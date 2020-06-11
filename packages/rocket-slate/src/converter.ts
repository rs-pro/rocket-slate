function covertData(node) {
  if (node.type === 'mention') {
    return {
      data: {
        id: node.data.user,
        type: 'user',
      },
    };
  }
  if (node.type === 'issue') {
    return {
      data: {
        id: node.data.issue,
        type: 'issue',
      },
    };
  }
  if (node.type === 'image' || node.type === 'check-list-item') {
    return {
      data: node.data,
    };
  }
  if (node.type === 'link') {
    return {
      data: {
        url: node.data.href,
      },
    };
  }
  return undefined;
}

function convertType(node) {
  if (node.type === 'table_row') return 'table-row';
  if (node.type === 'table_cell') return 'table-cell';
  if (node.type === 'file') return 'paragraph';
  if (node.type === 'issue') return 'mention';
  return node.type;
}

function convertMarks(mark) {
  if (mark === 'del') return 'strikethrough';
  if (mark === 'underlined') return 'underline';
  return mark;
}

function covertSlateNode47toRocketSlate(node) {
  const { type } = node;
  if (type) {
    return {
      type: convertType(node),
      children: convertChildren(node),
      ...covertData(node),
    };
  }
  const { text, marks, leaves, object } = node;
  if (object && leaves && object === 'text') {
    return [...leaves.map(covertSlateNode47toRocketSlate)];
  }
  if (leaves) {
    return [...leaves.map(covertSlateNode47toRocketSlate)];
  }
  if (marks && marks.length > 0) {
    return {
      text,
      ...marks.reduce((marksFlag, mark) => {
        if (['bg_color', 'fg_color'].includes(mark.type)) {
          return {
            ...marksFlag,
            [mark.type]: mark.data.color,
          };
        }
        return {
          ...marksFlag,
          [convertMarks(mark.type)]: true,
        };
      }, {}),
    };
  }
  return {
    text,
  };
}

function convertChildren(node) {
  if (node.type === 'file') {
    const { id, size, url } = node.data;
    return [
      {
        type: 'link',
        data: {
          file: {
            id,
            size,
          },
          url,
        },
        children: [{ text: node.data.name }],
      },
    ];
  }
  if (node.type === 'code') {
    return [
      {
        text: node.nodes
          .map(codeLine =>
            codeLine.nodes.map(codeLineNode => {
              if (codeLineNode.leaves) return codeLineNode.leaves.map(leaf => leaf.text).join('');
              if (codeLineNode.text) return codeLineNode.text;
              return '';
            }),
          )
          .join('\n'),
      },
    ];
  }
  if (node.type === 'mention') {
    return [
      {
        text: node.nodes[0].text.split(' (@')[0],
      },
    ];
  }
  if (node.nodes) {
    return node.nodes.reduce((nodesAcc, nodeParagraph) => {
      const nodes = covertSlateNode47toRocketSlate(nodeParagraph);
      if (Array.isArray(nodes)) {
        return [...nodesAcc, ...nodes];
      }
      return [...nodesAcc, nodes];
    }, []);
  }
  return [{ text: '' }];
}

export function convertSlateState47toRocketSlate(state47) {
  return state47.map(covertSlateNode47toRocketSlate);
}
