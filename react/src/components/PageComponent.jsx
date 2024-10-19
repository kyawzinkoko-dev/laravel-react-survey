import React from 'react'

export default function PageComponent({title,button='',children}) {
  return (
    <>
    <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
           <div className='flex justify-between'>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
            </h1>
            {button}
           </div>
        </div>
    </header>
    <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
           {children}
        </div>
    </main>
</>
  )
}
