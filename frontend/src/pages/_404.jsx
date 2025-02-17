import React from 'react'
import { Link } from 'react-router-dom'

const _404 = () => {
  return (
    <div className='box h-screen flex items-center'>
      <div className="">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-sm text-gray-500 mt-2 flex-col">
          <p>Page not found</p>
          <Link to='/' className='underline'>back to home.</Link>
        </p>
      </div>
    </div>
  )
}

export default _404