"use client"
import React from 'react'
import '../Styles/styles.css'
const Square = ({value,index}) => {
  return (
    <div className='text-center button border border-blue-950 cursor-pointer' onClick={(index)=>squareClickHandler(index)}>
      {value}
    </div>
  )
}

export default Square
