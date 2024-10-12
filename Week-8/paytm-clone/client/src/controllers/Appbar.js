import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Appbar() {

  const navigate = useNavigate()

  return (
    <div className="max-w-[1260px] m-auto w-11/12 max-w-max h-14 flex justify-between">
        <button className="flex flex-col justify-center h-full ml-4" onClick={()=>navigate("/dashboard")}>
            PayTM App
        </button>

    </div>
  )
}

export default Appbar