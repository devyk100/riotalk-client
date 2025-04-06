import ServersSidePane from "@/components/ui/side-pane/servers-side-pane";

export default function ServerIdLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <div className="flex">
        <ServersSidePane />
        {children}
    </div>
    </>
}