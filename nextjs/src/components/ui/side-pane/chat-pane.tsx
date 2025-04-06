"use client"
import useWebSocket from "@/hooks/use-websocket";
import { useChannelStore } from "@/stores/use-channel-store";
import { CreateChannelChatEvent, CreateUserChatEvent } from "@/util/create-chat-event";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ChatFragment from "../chat-fragment";
import { Button } from "../button";
import { GetUserInfo } from "@/util/user-info";

export default function ChatPane(){
    const { serverId, channelId } = useParams();
    const chatInputRef = useRef<HTMLInputElement>(null)
    const ws = useWebSocket()
    const router = useRouter()
    const {activeChannel} = useChannelStore()
    useEffect(() => {
        ws.current!.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Message from server:", data);
        }
    })
    return (<>
        This is the chat side pane
             <div className="md:w-[80%] bottom-0 flex flex-col justify-end h-full">
                <div className="">
                    <ChatFragment message={{ from_id: 1, from_name: "yash", from_username: "yashkumjnvpalghar", content: "Hello moshi moshi, how ya doing?", from_img: "something", message_type: "text", reply_of: 2, time_at: 1743844548368 }} />
                    <ChatFragment message={{ from_id: 1, from_name: "yash", from_username: "yashkumjnvpalghar", content: "Hello moshi moshi, how ya doing?", from_img: "something", message_type: "text", reply_of: 2, time_at: 1743844548368 }} />
                </div>
                <div className="border-t items-center gap-2 flex border-gray-700 px-4 py-3">
                    <input
                        ref={chatInputRef}
                        type="text"
                        placeholder="Message #general"
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <Button onClick={() => {
                        console.log(chatInputRef.current?.value)
                        ws.current?.send(JSON.stringify(CreateChannelChatEvent({
                            to: Number(serverId),
                            content: chatInputRef.current?.value!,
                            from_id: GetUserInfo()?.user_id,
                            from_img: GetUserInfo()?.img,
                            from_name: GetUserInfo()?.name,
                            from_username: GetUserInfo()?.username,
                            message_type: "text",
                            time_at: Date.now(),
                            reply_of: -1,
                            channel_id: Number(channelId)
                        })))
                    }}>Send</Button>
                </div>
            </div>
    </>)
}