type User = {
    email: string,
}

class RecipeAPI {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(
        path: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body: BodyInit | null = null
    ): Promise<Response> {
        return await fetch(
            path,
            {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                },
                body,
            },
        )
    }

    async me(): Promise<User> {
        const response = await this.request("/api/user/me/");
        const data = await response.json()
        return {
            email: data['email'],
        };
    }

    static async token(email: string, password: string): Promise<string> {
        const response = await fetch(
            "/api/user/tokens/",
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const tokenData = await response.json();
        return tokenData['token'];
    }
}

export default RecipeAPI;
