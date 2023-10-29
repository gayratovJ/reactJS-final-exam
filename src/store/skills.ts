import {create} from "zustand"
import { devtools } from "zustand/middleware";
import request from "../server";

interface SkillState {
    skill:SkillState[];
    loading:boolean;
    total:number;
    getSkills:() => void
}

const useSkill = create<SkillState>()(devtools((set) => ({
    skill:[],
    loading:false,
    total:0,
    getSkills: async ()=> {
        try{
            set((state)=> ({...state,loading:true}))
            const {data :{pagination,data},} = await request.get("skills");
            set((state)=> ({...state,skill:data,total:pagination.total,loading:false}))
        }finally{
            set((state)=> ({...state,loading:false}))
        }
    }
    
}))
);

export default useSkill