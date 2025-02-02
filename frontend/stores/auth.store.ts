import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStoreState {
    token: string,
    isExistToken: () => boolean,
    setToken: (token: string) => void,
    removeToken: () => void,
}

const useAuthStore = create(persist<AuthStoreState>(
    (set, get) => ({
        token: "",
        isExistToken: () => {
            return get().token !== "";
        },
        setToken: (token: string) => set((state) => {
            console.log(token);
            return { token };
        }),
        getToken: () => () => {
            if(!get().isExistToken()) {
                throw new Error("Токен не определен");
            }

            return get().token;
        },
        removeToken: () => {
            set(() => ({ token: "" }))
        }
    }),
    {
        name: 'auth-storage',
        storage: createJSONStorage(() => AsyncStorage),
    }
));

export default useAuthStore;