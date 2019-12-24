import React, { useCallback } from 'react'

const renderElement = useCallback(props => <Element {...props} />, [])

export default renderElement
