import { useActiveServerStore } from "@/stores/use-active-server-store"
import { Settings2 } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


export default function ServerSettingsSheet() {
    const { activeServer } = useActiveServerStore()
    return (<>
        <Sheet>
            <SheetTrigger>
                <Settings2 />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Settings: for {activeServer?.Name} </SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    </>)
}