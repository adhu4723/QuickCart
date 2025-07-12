import React from 'react'
import Loader from './Loader'

function Button({label,onClick,disabled,loading}) {
  return (
    <button  disabled={disabled} onClick={onClick} className='bg-[#0371a8] px-4 py-2 text-white'> {loading?<Loader/>:label} </button>
  )
}

export default Button
