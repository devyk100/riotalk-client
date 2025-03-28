import axios from "axios";
import { api } from "./axios-setup";

export async function RefreshToken(): Promise<void> {
    const response = await api.get("/auth/refresh-token/google")
    console.log(response)
    const data: {
        accessToken: string;
    } = response.data
    if(data.accessToken) {
        sessionStorage.setItem("access_token", data.accessToken);
        return;
    } else {
        throw Error();
        return
    }
}