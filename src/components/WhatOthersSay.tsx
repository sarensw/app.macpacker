import type { ReactElement } from 'react'

interface WhatOthersSayProperties {
    source: string
    title: string
    text: string
    name: string
}

function WhatOthersSay (props: WhatOthersSayProperties): ReactElement {
    return (
        <div className='bg-gray-50 p-5 rounded-lg ring-1 ring-gray-500 ring-inset flex flex-col'>
            <div className='text-xs text-gray-400'>{props.source}</div>
            <div className='text-sm font-semibold mt-1 text-gray-950'>{props.title}</div>
            <div className='my-3 text-sm text-gray-600 flex-grow'>{props.text}</div>
            <div className='text-sm font-medium text-gray-700'>{props.name}</div>
        </div>
    )
}

export { WhatOthersSay }
export type { WhatOthersSayProperties }
