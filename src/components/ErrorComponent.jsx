import React from 'react'

function ErrorComponent({textColor='text-red-600',  text="", error}) {
  return (
    <label className={`${textColor} p-1`} style={{ display: error ? "" : "none", }}>{text}</label>
  )
}

export default ErrorComponent