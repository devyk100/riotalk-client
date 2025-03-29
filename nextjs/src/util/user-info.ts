import { api } from "./axios-setup";

type UserInfo_t = {
    name: string;
    email: string;
    img: string;
    user_id: number;
    username: string;
}

export async function SetUserInfo(): Promise<void> {
    const response = await api.get("/users/info")
    const data: UserInfo_t = response.data
    console.log(response, "FROM THE USER INFO")

    if (data.name && data.email) {
        sessionStorage.setItem("user_info", JSON.stringify(data));
        return;
    } else {
        throw Error();
        return
    }
}

export function GetUserInfo(): UserInfo_t {
    if(sessionStorage.getItem("user_info")) {
        return JSON.parse(sessionStorage.getItem('user_info')!)
    } else {
        throw Error();
    }
}