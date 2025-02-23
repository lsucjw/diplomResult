import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "@/interfaces/user/user.interface";

interface UserStoreState {
    currentUser?: User;
    getCurrentUser: () => User;
}

// const userStore = create<UserStoreState>(
//     (get) => ({
//         currentUser: undefined,
//         getCurrentUser: () => (User) => {
            
//             return { User };
//         },
//     })
// );