function covertData(node) {
  if (node.type === 'mention') {
    return {
      data: {
        id: node.data.user,
        type: 'user',
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
  if (node.type === 'file') {
    return 'paragraph';
  }
  return node.type;
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
  const { text, marks } = node;
  if (marks && marks.length > 0) {
    return {
      text,
      ...marks.reduce((marksFlag, mark) => {
        if (['bg_color', 'fg_color'].includes(mark.type)){
          return {
            ...marksFlag,
            [mark.type]: mark.data.color,
          };
        }
        return {
          ...marksFlag,
          [mark.type]: true,
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
    return [{ text: node.nodes.map((node) => node.nodes[0].text).join('\n') }];
  }
  if (node.type === 'mention') {
    return [
      {
        text: node.nodes[0].text.split(' (@')[0],
      },
    ];
  }
  return node.nodes.map(covertSlateNode47toRocketSlate);
}

export function convertSlateState47toRocketSlate(state47) {
  return state47.map(covertSlateNode47toRocketSlate);
}
