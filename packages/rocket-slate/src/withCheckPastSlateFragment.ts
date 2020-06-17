export const withCheckPastSlateFragment = (editor, insertDataBase) => {
  const { insertData } = editor;
  // eslint-disable-next-line no-param-reassign
  editor.insertData = data => {
    const slateFragment = data.getData('application/x-slate-fragment');
    if (slateFragment) {
      insertDataBase(data);
    } else {
      insertData(data);
    }
  };
  return editor;
};
