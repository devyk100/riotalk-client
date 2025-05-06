import { Message_t } from "@/util/create-chat-event";

export default function ChatFragment({message}: {message: Message_t}) {
    const format = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    
    const ts = typeof message.time_at === "bigint" ? Number(message.time_at) : message.time_at;
    const millis = ts > 1e12 ? ts : ts * 1000; // handle seconds vs millis
    //@ts-ignore
    const localTime = new Date(millis).toLocaleString(undefined, format);
    return (
        <>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                        {message.from_name[0]}
                    </div>
                    <div>
                        <div className="text-sm text-gray-300 font-semibold">
                            {message.from_username} <span className="text-xs text-gray-500 ml-2">{localTime}</span>
                        </div>
                        <div className="text-gray-200">
                            {message.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}