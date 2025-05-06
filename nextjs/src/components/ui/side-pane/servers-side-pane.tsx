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
import { Skeleton } from "../skeleton";
import { ScrollArea } from "../scroll-area";
import { useWebSocketStore } from "@/stores/use-websocket-store";


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


function LoadingSkeleton() {
    return (<div className="w-full h-full p-2 gap-3 flex flex-col items-center justify-start">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-12 h-12 rounded-full" />
    </div>)
}


async function fetchServers() {
    const res = await api.get("/servers/list");
    return res.data || [];
}

export default function SidebarLayout() {
    const router = useRouter();
    const {connect} = useWebSocketStore()
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

    useEffect(() => {
        connect()
    })

    return (
        <div className={cn("flex h-screen", (typeof channelId == "number" ? "hidden md:flex" : ""))}>
            <section className="w-[72px] h-[calc(100vh-80px)] flex flex-col bg-gray-900">
                <TooltipProvider>
                    <aside className="flex-1 relative overflow-x-hidden flex flex-col items-center py-1 space-y-4 p-0">
                        {isLoading && <LoadingSkeleton />}
                        {error && <div>Error loading servers</div>}
                        {servers?.length === 0 && <div>No servers available</div>}
                        <ScrollArea className="flex-1 w-full">
                            <div className="flex flex-col items-center space-y-4 py-4 px-2 pb-24">
                                <div className="w-full h-full pb-2 border-b-2 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.6 }}
                                        className="group cursor-pointer relative flex items-center justify-center w-12 h-12 rounded-full transition-all hover:bg-gray-700 border-b-[0.5px]"
                                    >                           <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src={""}
                                                alt={"User Direct Messages"}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="text-white bg-green-800">
                                                DM
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </div>

                                <span>Servers</span>
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
                            </div>
                        </ScrollArea>
                        <CreateServerDialog />
                    </aside>
                </TooltipProvider>
            </section>
        </div>
    );
}
