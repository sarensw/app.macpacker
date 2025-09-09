import type { ReactElement } from 'react'

interface ArchiveFormatProperties {
    name: String
}

function ArchiveFormat (props: ArchiveFormatProperties): ReactElement {
    return (
        <li 
            className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'
        >{props.name}</li>
    )
}

export { ArchiveFormat }
