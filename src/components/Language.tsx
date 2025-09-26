import type { ReactElement } from 'react'
import 'flag-icons/css/flag-icons.min.css'

interface LanguageProperties {
    code: string
    name: string
    icons: string[]
}

function Language (props: LanguageProperties): ReactElement {
    return (
        <li 
            className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'
        >
            {props.icons.map((flag, index) => <span key={index} className={`fi fi-${flag} mr-1`}></span>)  }
            {props.name}</li>
    )
}

export { Language }
