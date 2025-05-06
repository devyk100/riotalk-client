"use client"
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { useChannelStore } from "@/stores/use-channel-store";
import { useParams, useRouter } from "next/navigation";

export default function ChannelInfoSection() {
    const { activeChannel } = useChannelStore()
    const router = useRouter()
    const { serverId, channelId } = useParams();
    return (<>
        <div className="px-4 py-3 border-b gap-2 items-center justify-center border-gray-700 w-full text-white font-semibold text-lg">
            <Button variant="outline" className="rounded-full md:hidden " onClick={() => router.push("/chat/"+serverId)}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <span>
                # {activeChannel?.Name}
            </span>
        </div>
    </>)
}