import { BaseService } from "@/services/base.service";
import useAuthStore from "@/stores/auth.store";
import { User } from "@/interfaces/user/user.interface";

export class UserService extends BaseService {
  static async getCurrentUser() {
    if (!useAuthStore.getState().isExistToken()) {
      throw new Error("User does not exist");
    }

    const response = await fetch(`${this.apiUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
        "Content-Type": "application/json",
      },
    });

    return (await response.json()) as User;
  }
}
