"use client";

import { api } from "@/util/axios-setup";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useActiveServerStore } from "@/stores/use-active-server-store";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useChannelStore } from "@/stores/use-channel-store";
import CreateChannelDialog from "../create-channel-dialog";

export interface Channel_t {
    Name: string;
    ID: number;
    Type: string;
    ServerID: number;
    AllowedRoles: string;
    Description: string;
}

async function fetchChannels(serverId: number) {
    const res = await api.get(`/channels/list?server_id=${serverId}`);
    return res.data || [];
}

export default function ChannelsSidePane() {
    const { serverId: serverIdString, channelId: channelIdString } = useParams();
    const serverId = Number(serverIdString) || null;
    const channelId = Number(channelIdString) || null;
    const { activeServer } = useActiveServerStore()
    const router = useRouter();
    const pathname = usePathname();
    const {setActiveChannel} = useChannelStore()
    
    
    if (serverId == null) return <></>;
    
    const { data: channels, error, isLoading } = useQuery({
        queryKey: ["channels", serverId],
        queryFn: () => fetchChannels(serverId),
    })
    useEffect(() => {
        const active = channels?.find((channel: Channel_t) =>
            pathname.includes(`/chat/${serverId}/${channel.ID}`)
        );
        if (active) setActiveChannel(active);
    }, [channels, pathname, serverId]);

    if (error) return <div className="p-4 text-red-500">Error loading channels</div>;
    if (isLoading) return (
        <aside className="w-[260px] bg-gray-800 h-screen flex flex-col py-4 px-2"> Loading... </aside>)
    
    return (
        <aside className={cn("md:w-[260px] bg-gray-800 h-screen w-screen flex flex-col py-4 px-2", (typeof channelId == "number" ? "hidden md:flex": ""))}>
            <div className="text-lg font-semibold p-3 border-b-2 border-gray-600">
                {activeServer?.Name}
            </div>
            {channels?.length == 0 ? <>Nothing here yet..</> :
                channels?.map((channel: Channel_t) => {
                    const isActive = pathname.includes(`/chat/${serverId}/${channel.ID}`);
                    return (
                        <div
                            key={channel.ID}
                            onClick={() => {
                                router.push(`/chat/${serverId}/${channel.ID}`)
                                setActiveChannel(channel)
                            }}
                            className={clsx(
                                "cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
                                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700/50 text-gray-300"
                            )}
                        >
                            {/* Active Indicator */}
                            <div
                                className={clsx(
                                    "h-2 w-2 rounded-full transition-all",
                                    isActive ? "bg-green-500" : "bg-transparent"
                                )}
                            />
                            <span className="truncate">{channel.Name}</span>
                        </div>
                    );
                })} 
                <CreateChannelDialog/>
        </aside>
    );
}
