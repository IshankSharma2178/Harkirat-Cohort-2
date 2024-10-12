import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { balance } from '../atom/balanceAtom';

function Users() {


  const [data,setData] = useState([])
  const [filter,setFilter] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (filter) {
        const response = await axios.post(`http://localhost:4000/api/v1/user/bulk?filter=${filter}`,{},{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setData(response.data.data);
        console.log(response.data.data);
      }else{
        setData([])
      }
    }, 1000); 

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [filter]);

  const transactionHandler = (id,firstName,lastName) => {
    navigate(`/send/${id}/${firstName}/${lastName}`); 
  };
  

  return (
    <div>
      <div className='relative'>
        <label htmlFor='searchUser ' className='font-bold ' >User</label>
        <input type='text' onChange={(e)=>setFilter(e.target.value)} id="searchUser" placeholder='Search User...' className='shadow w-full border text-2 border-zinc-300 h-12 p-2 focus:outline outline-slate-300 rounded-md pr-[6.5rem]' ></input>
        <button type='submit'  className="absolute right-2 bottom-0 -translate-y-[16%] text-white bg-[#050708] hover:bg-slate-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center ">
          Search</button>
      </div>
      <div>
      <div className='mt-2'>
      {data.length > 0 ? (
          data.map((user, key) => (
            <div key={key} className='mt-4 flex flex-row gap-2 items-center justify-between'>
              <div className=' text-xl flex flex-row gap-2 items-center'>
                <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} className='rounded-full w-10' alt="avatar" />
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
              </div>
              <div>
                <button onClick={()=>transactionHandler(user._id,user.firstName,user.lastName)} className="text-white bg-[#050708] hover:bg-slate-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">Send Money</button>
              </div>
            </div>
          ))
        ) : (
          <div>Search For Users To transact Money</div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Users