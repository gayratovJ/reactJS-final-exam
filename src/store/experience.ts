import {create} from "zustand"
import { devtools } from "zustand/middleware";
import request from "../server";
import Experience from "../types/experience";
import User from "../types/user";

interface ExperienceState {
    user:null | User;
    experience:Experience[];
    loading:boolean;
    total:number;
    getExperience:() => void
}

const useExperience = create<ExperienceState>()(devtools((set) => ({
    user:null,
    experience:[],
    loading:false,
    total:0,
     getExperience: async ()=> {
        try{
            set((state)=> ({...state,loading:true}))
            const {data :{pagination,data},} = await request.get("experiences");
            set((state)=> ({...state,experience:data,total:pagination.total,loading:false}))
        }finally{
            set((state)=> ({...state,loading:false}))
        }
    }
    
}))
);

export default useExperience

// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import Experience from "../types/experience";
// import request from "../server";

// interface ExperienceState {
//     experience: Experience[];
//   loading: boolean;
//   total: number;
//   page: number;
//   isModalOpen: boolean;
//   getSkills: () => void;
//   setPage: (page: number) => void;
//   controlModal: (data: boolean) => void;
//   showModal: () => void;
// }

// const useExperience = create<ExperienceState>()(
//   devtools((set, get) => ({
//     experience: [],
//     loading: false,
//     isModalOpen: false,
//     total: 0,
//     page: 1,
//     getSkills: async () => {
//       try {
//         set((state) => ({ ...state, loading: true }));

//         const {
//           data: { pagination, data },
//         } = await request.get("experiences", {
//           params: {
//             page: get().page,
//             user: "6537b00efd51940018b21314",
//           },
//         });
//         set((state) => ({
//           ...state,
//           experience: data,
//           total: pagination.total,
//           loading: false,
//         }));
//       } finally {
//         set((state) => ({ ...state, loading: false }));
//       }
//     },
//     setPage: (page) => {
//       set((state) => ({ ...state, page }));
//       get().getSkills();
//     },
//     controlModal: (data) => {
//       set((state) => ({ ...state, isModalOpen: data }));
//     },
//     showModal: () => {
//       get().controlModal(true);
//     },
//   }))
// );

// export default useExperience;
