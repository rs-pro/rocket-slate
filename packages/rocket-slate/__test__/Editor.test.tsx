import React from 'react';
import { shallow } from 'enzyme';
import { Slate } from 'slate-react';
import {RocketSlate, initialValue, IRocketSlatePlugin} from '../src';

describe('<RocketSlateEditor />', () => {
  it('render editor', () => {
    const wrapper = shallow(<RocketSlate value={initialValue} />);
    expect(wrapper.find('.RocketSlate')).toHaveLength(1);
    expect(wrapper.find(Slate)).toHaveLength(1);
  });
  it('render editor with before', () => {
    const wrapper = shallow(<RocketSlate value={initialValue} before={<div>before</div>} />);
    expect(wrapper.contains(<div>before</div>)).toBeTruthy();
  });
  it('render editor with after', () => {
    const wrapper = shallow(<RocketSlate value={initialValue} after={<div>after</div>} />);
    expect(wrapper.contains(<div>after</div>)).toBeTruthy();
  });
  it('editor call change', () => {
    const handlerChange = jest.fn();
    const wrapper = shallow(<RocketSlate value={initialValue} onChange={handlerChange} />);
    wrapper.find(Slate).simulate('change');
    expect(handlerChange).toHaveBeenCalled();
  });
  it('editor call createeditor', () => {
    const withPluginTest = jest.fn();
    const plugins: IRocketSlatePlugin[] = [
      {
        withPlugin: (editor) => {
          withPluginTest();
          return editor;
        },
      },
      {},
    ];
    const wrapper = shallow(<RocketSlate value={initialValue} plugins={plugins} />);
    expect(withPluginTest).toHaveBeenCalled();
    expect(withPluginTest).toHaveBeenCalledTimes(1);
  });
});
