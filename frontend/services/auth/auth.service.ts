import { BaseService } from "../base.service";

export class AuthService extends BaseService {
  static async login(email: string) {
    const result = await fetch(`${this.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    console.log(result.url);
    return result.status;
  }

  static async sendCode(code: string): Promise<string> {
    const result = await fetch(`${this.apiUrl}/auth/token/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Unable to send code");
    }

    const { token } = (await result.json()) as { token: string };
    return token;
  }
}
