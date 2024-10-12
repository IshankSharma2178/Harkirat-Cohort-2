import React from 'react'
import Balance from "../controllers/Balance"
import Appbar from "../controllers/Appbar"
import Users from "../controllers/Users"

function Dashboard() {
  return (
    <div className=' '>
    <div className='shadow'>
      <Appbar />
    </div>
      <div className=" max-w-[1260px] mt-8 flex flex-col gap-6 justify-center m-auto w-11/12 ">
          <Balance value={"10,000"} />
          <Users />
      </div>
    </div>
  )
}

export default Dashboard