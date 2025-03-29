"use client"

import { Button } from "@/components/ui/button";
import { RefreshToken } from "@/util/refresh-token"
import { GetUserInfo, SetUserInfo } from "@/util/user-info";

import { useEffect } from "react"

export default function AuthSuccess() {
    useEffect(() => {
        async function run() {
            await RefreshToken();
            await SetUserInfo();
        }
        run()
    })
    return (
        <>
        Loading...
        <Button onClick={() => {
            console.log(GetUserInfo())
        }}>
            Get user info
        </Button>
        <Button onClick={() => {
            console.log(sessionStorage.getItem("access_token"))
        }}>
            Access token
        </Button>
        </>
    )
}