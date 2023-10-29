import {create} from "zustand"
import { devtools } from "zustand/middleware";
import request from "../server";
import Experience from "../types/experience";

interface EducationState {
    education:Experience[];
    loading:boolean;
    total:number;
    getEducation:() => void
}

const useEducation = create<EducationState>()(devtools((set) => ({
    education:[],
    loading:false,
    total:0,
     getEducation: async ()=> {
        try{
            set((state)=> ({...state,loading:true}))
            const {data :{pagination,data},} = await request.get("education");
            set((state)=> ({...state,education:data,total:pagination.total,loading:false}))
        }finally{
            set((state)=> ({...state,loading:false}))
        }
    }
    
}))
);

export default useEducation