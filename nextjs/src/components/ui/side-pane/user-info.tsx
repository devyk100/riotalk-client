"use client"
import { useActiveUserInfoStore } from "@/stores/use-user-info-store";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UserInfoFragment() {
    const { serverId: serverIdString, channelId: channelIdString } = useParams();
    const serverId = Number(serverIdString) || null;
    const channelId = Number(channelIdString) || null;
    const { activeUserInfo } = useActiveUserInfoStore()
    return (<>
        <div className={cn("fixed bottom-0 left-0 md:w-[332px] w-screen cursor-pointer h-[80px] bg-slate-700 p-2 border-t border-gray-500 flex gap-2 px-5 rounded-lg items-center", (typeof channelId == "number" ? "hidden md:flex" : ""))}>
            <Avatar className="w-10 h-10">
                <AvatarImage src={activeUserInfo?.img} alt={activeUserInfo?.name} />
                <AvatarFallback>{activeUserInfo?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span>
                    {activeUserInfo?.name}
                </span>
                <span className="text-xs text-gray-300">
                    {activeUserInfo?.username}
                </span>
            </div>
        </div>
    </>)
}