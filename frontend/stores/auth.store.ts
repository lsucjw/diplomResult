import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStoreState {
    token: string,
    setToken: (token: string) => void
}

const useAuthStore = create(persist<AuthStoreState>(
    (set) => ({
        token: "",
        setToken: (token: string) => set((state) => {
            console.log(token);
            return { token };
        }),
    }),
    {
        name: 'auth-storage',
        storage: createJSONStorage(() => AsyncStorage),  // Ис
    }
));

export default useAuthStore;