import React from 'react';
import { useSlate } from 'slate-react';

interface IToolbarProps {
  buttons: Array<{
    title: string;
    icon: any;
    onClick?: () => void;
  }>;
}

const Toolbar = React.forwardRef((props: IToolbarProps, ref: any) => {
  const { buttons } = props;
  const editor = useSlate();
  return (
    <div className="rocket-slate__toolbar" ref={ref}>
      {buttons.map(({ title, icon, onClick }, index) => {
        return (
          <button
            className="rocket-slate__toolbar-button"
            key={index.toString()}
            title={title}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
});

export default Toolbar;
