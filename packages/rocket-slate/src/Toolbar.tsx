import React from 'react'
import { useSlate } from 'slate-react'

const Toolbar = React.forwardRef((props:any, ref:any) => {
    const { buttons } = props;
    const editor = useSlate()
    return (
        <div
            className="rocket-slate__toolbar"
            ref={ref}
        >
            {buttons.map((button) => {
                return (
                    <a className="rocket-slate__toolbar-button"></a>
                )
            })}
        </div>
    )
})

export default Toolbar