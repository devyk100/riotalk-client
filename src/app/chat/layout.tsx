import ServersSidePane from "@/components/ui/side-pane/servers-side-pane";
import UserInfoFragment from "@/components/ui/side-pane/user-info";

export default function ServerIdLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
    <div className="flex">
        <ServersSidePane />
        <UserInfoFragment />
        {children}
    </div>
    </>
}