import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Appbar from '../controllers/Appbar';

function SendMoney() {
  const {id,firstName,lastName} = useParams();
  const [amount ,setAmount] = useState(0)

  const submitHandler = async() =>{
    console.log(amount)
    const response = await axios.post(("http://localhost:4000/api/v1/account/transfer"),{
      amount:amount,
      to:id
    },{
      headers:{
        authorization: "Bearer " +localStorage.getItem("token"),
      }
    }
  )}

  return (
    <div>
    <Appbar/>
    <div className='bg-[#eff1f3] flex justify-center  items-center h-[calc(100vh-10vh)]'>
        <div className=' bg-white flex flex-col w-[20rem] px-8 p-4 shadow-md rounded-md '>
          <div className='text-2xl font-bold mx-auto'>Send Money To</div>
          <div className='mt-10 flex gap-2 flex-row items-center'>
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span class="text-lg text-white">{firstName[0].toUpperCase()} {lastName[0].toUpperCase()}</span>
            </div>
            <div className='text-lg font-semibold'>{firstName}{" "} {lastName}</div>
          </div>
          <div className='mt-8 flex flex-col gap-4'>
            <label htmlFor='amount' className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (in Rs)</label>
            <input type='number' id="amount" onChange={(e)=>setAmount(e.target.value)}   class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder='Enter amount'></input>
            <button type='button' onClick={submitHandler} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" >Initiate Transfer</button>
          </div>
        </div>
    </div>
    </div>
        
  )
}

export default SendMoney