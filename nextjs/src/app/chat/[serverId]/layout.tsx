import ChannelsSidePane from "@/components/ui/side-pane/channels-side-pane";

export default function ServerIdLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <ChannelsSidePane />
        {children}
    </>
}