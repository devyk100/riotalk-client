"use client"
import useWebSocket from "@/hooks/use-websocket";
import { useChannelStore } from "@/stores/use-channel-store";
import { CreateChannelChatEvent, CreateUserChatEvent, Message_t } from "@/util/create-chat-event";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import ChatFragment from "../chat-fragment";
import { Button } from "../button";
import { GetUserInfo } from "@/util/user-info";
import { api } from "@/util/axios-setup";
import { useQuery } from "@tanstack/react-query";
import { useWebSocketStore } from "@/stores/use-websocket-store";
import { ScrollArea } from "../scroll-area";
import { useToast } from "@/hooks/use-toast";

export default function ChatPane() {
    const { serverId, channelId } = useParams();
    const chatInputRef = useRef<HTMLInputElement>(null)
    const { socket: ws, connect, setOnMessage } = useWebSocketStore()
    const router = useRouter()
    const { activeChannel } = useChannelStore()
    
    function handleChatSend(event: FormEvent) {
        event.preventDefault()
        try {

            console.log(chatInputRef.current?.value)
            const message = chatInputRef.current?.value;
            ws?.send(JSON.stringify(CreateChannelChatEvent({
                to: Number(serverId),
                content: message!,
                from_id: GetUserInfo()?.user_id,
                from_img: GetUserInfo()?.img,
                from_name: GetUserInfo()?.name,
                from_username: GetUserInfo()?.username,
                message_type: "text",
                time_at: Date.now(),
                reply_of: -1,
                channel_id: Number(channelId)
            })))
            if (message) {
                console.log("Sending message:", message);
                chatInputRef.current!.value = ""; // Reset the input
            }
        } catch (err) {
            toast({
                title: "Error in sending message",
                description: "Try after some time",
              })
        }
    }

    const fetchChats = async ({before = null}: {
        before: null | Number
    }) => {
        const res = await api.get(`/channels/chats?channel_id=${channelId}${before ? `&before=${before}` : ""}`);
        return res.data
    }

    const { data: chats, isLoading, error } = useQuery({
        queryKey: ['chats', serverId, channelId],
        queryFn: async () => {
            const response = await api.get(`/channels/chats`, {
                params: { server_id: serverId, channel_id: channelId },
            })
            return response.data
        },
        enabled: !!serverId && !!channelId,
    })

    const { toast } = useToast()
    useEffect(() => {
        connect();
        (async () => {
            const response = await api.get(`/channels/chats`, {
                params: { server_id: serverId, channel_id: channelId, before: 1746513353624 },
            })
            console.log(response)
        })()
        setOnMessage((event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log("Message from server:", data);
        });
    })

    
    return (<>
        <div className="md:w-[80%] bottom-0 flex flex-col justify-between overflow-hidden h-full">
            <ScrollArea className="">
                {chats?.map((val: Message_t) => {
                    // console.log(val)
                    return <ChatFragment key={val.time_at} message={{ from_id: val.from_id, from_name: val.from_name, from_username: val.from_username, content: val.content, from_img: val.from_img, message_type: val.message_type, reply_of: val.reply_of, time_at: val.time_at }} />
                })}
            </ScrollArea>
            <form className="border-t h-[100px] items-center gap-2 flex border-gray-700 px-4 py-3" onSubmit={handleChatSend}>
                <input
                    ref={chatInputRef}
                    type="text"
                    placeholder={"Message #" + activeChannel?.Name}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    </>)
}