import { create } from "zustand";
import { User } from "@/interfaces/user/user.interface";
import useAuthStore from "@/stores/auth.store";
import { UserService } from "@/services/user/user.service";

console.log("run");

interface UserStoreState {
  currentUser: User | null;
  getUser: () => User | null;
  fillCurrentUser: () => Promise<void>;
  resetCurrentUser: () => void;
}

const useUserStore = create<UserStoreState>((set, get) => {
  const fillCurrentUser = async () => {
    const user = await UserService.getCurrentUser();
    console.log(user);
    set(() => ({ currentUser: user }));
  };

  return {
    currentUser: null,
    getUser: () => {
      return get().currentUser;
    },
    fillCurrentUser,
    resetCurrentUser: () => {
      console.log("Лариса выходим");
      return set(() => ({ currentUser: null }));
    },
  };
});

useAuthStore.subscribe(async (state, prevState) => {
  const isExistTokenWasChange = state.token !== prevState.token;

  if (isExistTokenWasChange) {
    const { fillCurrentUser, resetCurrentUser } = useUserStore.getState();
    if (state.isExistToken()) {
      await fillCurrentUser();
    } else {
      resetCurrentUser();
    }
  }
});

export default useUserStore;
