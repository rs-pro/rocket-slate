// tslint:disable:object-literal-sort-keys

function covertData(node) {
  if (node.type === 'check-list-item') {
    return {
      checked: !!node.data.checked,
    };
  }
  if (node.type === 'mention') {
    return {
      data: {
        id: node.data.user,
        type: 'user',
      },
    };
  }
  if (node.type === 'image') {
    return {
      data: node.data,
    };
  }
  if (node.type === 'file') {
    const { id, url } = node.data;
    return {
      data: {
        id,
        url,
      },
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
  if (node.type === 'check-list-item') {
    return 'action-item';
  }
  if (node.type === 'file') {
    return 'link';
  }
  return node.type;
}

function convertChildren(node) {
  if (node.type === 'file') {
    return [{ text: node.data.name }];
  }
  if (node.type === 'code') {
    // tslint:disable-next-line:no-shadowed-variable
    return node.nodes.map((node) => {
      return {
        text: node.nodes[0].text,
      };
    });
  }
  return node.nodes.map(covertSlateNode47toRocketSlate);
}

function covertSlateNode47toRocketSlate(node) {
  const { type } = node;
  if (type) {
    return {
      type: convertType(node),
      children: convertChildren(node),
      ...covertData(node),
    };
  } else {
    const { text, marks } = node;
    if (marks && marks.length > 0) {
      return {
        text,
        ...(marks as any[]).reduce((marksFlag, mark) => {
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
}

export function convertSlateState47toRocketSlate(state47: any[]) {
  return state47.map(covertSlateNode47toRocketSlate);
}
