import React from 'react'

const Button = ({text, action}) => {
  return (
    <div onClick={action} className="bg-blue-300 p-2 rounded-md cursor-pointer w-fit">
      {text}
    </div>
  )
}

export default Button
