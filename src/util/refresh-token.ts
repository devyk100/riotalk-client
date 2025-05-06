import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api, BACKEND_URL } from "./axios-setup";

export async function RefreshToken(): Promise<void> {
    const response = await axios.get(BACKEND_URL+"/auth/refresh-token", {
        withCredentials: true
    })
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
