import { atom, selector } from "recoil";
import axios from "axios";


export const balanceAtom = atom({
  key: "balanceAtom",
  default: 0,        
});

export const balanceSelector = selector({
  key: "balanceSelector",
  get: async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/account/balance", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        return response.data.data; 
      } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
      }
    }
    return 0;
  },
});
