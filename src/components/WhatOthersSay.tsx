import type { ReactElement } from 'react'

interface WhatOthersSayProperties {
    source: string
    title: string
    text: string
    name: string
}

function WhatOthersSay (props: WhatOthersSayProperties): ReactElement {
    return (
        <div className='w-72 bg-gray-50 p-4 rounded-md border border-gray-400'>
            <div className='text-xs text-gray-400'>{props.source}</div>
            <div className='text-md font-bold mt-1'>{props.title}</div>
            <div className='my-4'>{props.text}</div>
            <div className='font-medium'>{props.name}</div>
        </div>
    )
}

export { WhatOthersSay }
