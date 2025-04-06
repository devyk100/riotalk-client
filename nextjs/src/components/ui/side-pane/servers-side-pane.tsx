"use client"
import { api } from "@/util/axios-setup";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import * as motion from "motion/react-client"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import clsx from "clsx";
import { useActiveServerStore } from "@/stores/use-active-server-store";
import { GetUserInfo } from "@/util/user-info";
import { useEffect } from "react";
import { useActiveUserInfoStore } from "@/stores/use-user-info-store";
import { cn } from "@/lib/utils";
import CreateServerDialog from "../create-server-dialog";


export interface Server_t {
    ServerID: number;
    Role: string;
    Banner: string;
    Img: string;
    Name: string;
    Description: string;
    Since: string;
}

export interface User_t {
    id: number;
    name: string;
    avatar: string;
}


async function fetchServers() {
    const res = await api.get("/servers/list");
    return res.data || [];
}

export default function SidebarLayout() {
    const router = useRouter();
    const { serverId: serverIdString, channelId: channelIdString } = useParams();
    const serverId = Number(serverIdString) || null;
    const channelId = Number(channelIdString) || null;
    const { activeUserInfo } = useActiveUserInfoStore()
    const pathname = usePathname();
    const { setActiveServer } = useActiveServerStore();
    const { data: servers, error, isLoading } = useQuery({
        queryKey: ["servers"],
        queryFn: fetchServers,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    useEffect(() => {
        if (!servers) return;
        console.log(activeUserInfo?.img, "is the image")
        // Extract server ID from pathname
        const match = pathname.match(/\/chat\/(\d+)/);
        const serverId = match ? Number(match[1]) : null;

        if (serverId) {
            const activeServer = servers.find((server: Server_t) => server.ServerID === serverId);
            if (activeServer) {
                setActiveServer(activeServer);
            }
        }
    }, [pathname, servers, setActiveServer]);


    return (
        <div className={cn("flex h-screen", (typeof channelId == "number" ? "hidden md:flex" : ""))}>
            <section className="w-[72px] flex flex-col bg-gray-900">
                <TooltipProvider>
                    <aside className="flex-1 overflow-y-auto flex flex-col items-center py-4 space-y-4">
                        <span>Servers</span>
                        {isLoading && <div>Loading servers...</div>}
                        {error && <div>Error loading servers</div>}
                        {servers?.length === 0 && <div>No servers available</div>}
                        {servers?.map((server: Server_t) => {
                            return <Tooltip key={server.ServerID}>
                                <TooltipContent className="text-xs bg-zinc-500">
                                    <span>{server.Name}</span>
                                </TooltipContent>
                                <TooltipTrigger>
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.6 }}
                                        onClick={() => {
                                            router.push(`/chat/${server.ServerID}`)
                                            setActiveServer(server)
                                        }}
                                        className="group cursor-pointer relative flex items-center justify-center w-12 h-12 rounded-full transition-all hover:bg-gray-700"
                                    >
                                        <div
                                            className={clsx(
                                                "absolute left-[-8px] h-2.5 w-2.5 rounded-full transition-all",
                                                pathname.includes(`/chat/${server.ServerID}`) ? "bg-zinc-300 scale-100" : "bg-transparent scale-0 group-hover:scale-100"
                                            )}
                                        />
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src={server.Img}
                                                alt={server.Name}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="text-white bg-gray-800">
                                                {server.Name.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </TooltipTrigger>
                            </Tooltip>
                        })}
                        <CreateServerDialog />
                    </aside>
                </TooltipProvider>
            </section>
            {/* 🔹 Self-User Panel (Fixed at Bottom) */}
            <div className="absolute bottom-0 left-0 md:w-[332px] w-screen cursor-pointer h-[80px] bg-slate-700 p-2 border-t border-gray-500 flex gap-2 px-5 rounded-lg items-center">
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
        </div>
    );
}
