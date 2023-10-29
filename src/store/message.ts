import { devtools } from "zustand/middleware";
import {create} from "zustand"
import request from "../server";

interface MessageState {
    message:MessageState[];
    loading:boolean;
    total:number;
    getMessage:() => void
}

const useMessage = create<MessageState>()(devtools((set) => ({
    message:[],
    loading:false,
    total:0,
    getMessage: async ()=> {
        try{
            set((state)=> ({...state,loading:true}))
            const {data :{pagination,data},} = await request.get("messages");
            set((state)=> ({...state,message:data,total:pagination.total,loading:false}))
        }finally{
            set((state)=> ({...state,loading:false}))
        }
    }
    
}))
);

export default useMessage