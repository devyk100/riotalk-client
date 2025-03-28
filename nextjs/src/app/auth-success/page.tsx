"use client"

import { RefreshToken } from "@/util/refresh-token"
import { useEffect } from "react"

export default function AuthSuccess() {
    useEffect(() => {
        async function run() {
            await RefreshToken();
        }
        run()
    })
    return (
        <>
        Loading...
        </>
    )
}