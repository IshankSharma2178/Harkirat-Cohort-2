import React from "react";
import { useRecoilValue } from "recoil";
import { balanceSelector } from "../atom/balanceAtom"; 

function Balance() {
  const balance = useRecoilValue(balanceSelector); 

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
    </div>
  );
}

export default Balance;
