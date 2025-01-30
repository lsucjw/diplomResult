import { BaseService } from "../base.service";

export class AuthService extends BaseService {
    static async login(email: string) {
        await fetch(`${this.apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            }),
        });
    }

    static async getCode(code: string): Promise<string> {
        const result = await fetch(`${this.apiUrl}/auth/token/${code}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { token }  = await result.json() as {token: string};
        return token;
    }

}

