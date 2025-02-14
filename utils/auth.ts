import { Register, Login } from "@/types/auth";
import cookies from "@/utils/cookies";

interface ResponseRegisterFormat {
    result: string;
    msg: string;
    data: {
        user_name: string;
        user_email: string;
        created_at: Date;
    }
}
interface ResponseLoginFormat {
    result: string;
    msg: string;
    data: {
        name: string;
        email: string;
        token: string;
    }
};

const auth = {
    register: async (data: Register): Promise<ResponseRegisterFormat> => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataRes: ResponseRegisterFormat = await res.json();

            if (dataRes.result === "FAILED") {
                throw new Error(dataRes.msg || "Error in register");
            }

            return dataRes;
        } catch (error) {
            console.error("Register error: ", error);
            throw error
        }
    },
    login: async (data: Login): Promise<ResponseLoginFormat> => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataRes: ResponseLoginFormat = await res.json();

            if (dataRes.result === "FAILED") {
                throw new Error(dataRes.msg || "Error in login");
            }

            cookies.set("token", dataRes.data.token, 7);

            return dataRes;
        } catch (error) {
            console.error("Login error: ", error);
            throw error
        }
    }
}

export default auth;