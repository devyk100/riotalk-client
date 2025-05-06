
import ChannelInfoSection from "@/components/ui/channel-info";
import ChatPane from "@/components/ui/side-pane/chat-pane";

export default function ChannelPage() {
    
    return (
        <div className="w-full flex flex-col items-center h-screen">
            <ChannelInfoSection />
            <ChatPane />
        </div>
    );
}
