import * as React from 'react'

const ButtonsContainer = ( { children }: {children?: JSX.Element}) => (
    <div className='buttons-list'>{children}</div>
)

export default ButtonsContainer