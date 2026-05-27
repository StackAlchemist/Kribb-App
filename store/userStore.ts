import { create } from 'zustand'

interface Userstore {
    isAdmin: boolean;
    setIsAdmin: (value:boolean)=>void
}

export const useUserStore = create<Userstore>(set=>({
    isAdmin: false,
    setIsAdmin: (value) => set({ isAdmin: value})
}))