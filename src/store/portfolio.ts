import { devtools } from "zustand/middleware";
import {create} from "zustand"
import request from "../server";
import PortfolioData from "../types/portfolio";

interface PortfolioState {
    portfolio:PortfolioData[];
    loading:boolean;
    total:number;
    getPortfolio:() => void
}

const usePortfolio = create<PortfolioState>()(devtools((set) => ({
    portfolio:[],
    loading:false,
    total:0,
    getPortfolio: async ()=> {
        try{
            set((state)=> ({...state,loading:true}))
            const {data :{pagination,data},} = await request.get("portfolios");
            set((state)=> ({...state,portfolio:data,total:pagination.total,loading:false}))
        }finally{
            set((state)=> ({...state,loading:false}))
        }
    }
    
}))
);

export default usePortfolio