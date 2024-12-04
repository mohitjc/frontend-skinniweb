import { Fragment } from "react/jsx-runtime"

export default function Tabs({list=[],active='',setActive=()=>{}}){
    return <>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                {list.map((itm,i)=>{
                    return <Fragment key={i}>
                        <li className="me-2">
                            <span onClick={()=>{
                                setActive(itm.id)
                            }} className={`cursor-pointer inline-block p-4 border-b-2 ${active==itm.id?'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500':'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}>{itm.name}</span>
                        </li>
                    </Fragment>
                })}
            </ul>
        </div>
    </>
}