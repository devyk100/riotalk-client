"use client"
import { Button } from "./button";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "./input";
import { Label } from "./label";
import { useRef, useState } from "react";
import { api } from "@/util/axios-setup";
import { Textarea } from "./textarea";
import { useParams, useRouter } from "next/navigation";
import { useActiveServerStore } from "@/stores/use-active-server-store";

export default function CreateChannelDialog() {
    const { serverId: serverIdString, channelId: channelIdString } = useParams();
    const { activeServer } = useActiveServerStore()
    const serverId = Number(serverIdString) || null;
    const [isWorking, setIsWorking] = useState(false)
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputImgRef = useRef<HTMLInputElement>(null)
    const inputBannerRef = useRef<HTMLInputElement>(null)
    const inputDescRef = useRef<HTMLTextAreaElement>(null)
    const [open, setOpen] = useState(false);
    const router = useRouter()
    return (<>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full border-t-2 border-gray-700">
                <span className="w-full flex gap-x-3 items-center justify-start p-2">
                    <PlusCircle />
                    <span>Create a Channel</span>
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Chanel</DialogTitle>
                    <DialogDescription>
                        Create a channel in the server: {activeServer?.Name}
                    </DialogDescription>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Channel Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="voice">Voice</SelectItem>
                        <SelectItem value="stage">Stage</SelectItem>
                        <SelectItem value="announcment">Announcement</SelectItem>
                    </SelectContent>
                </Select>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input ref={inputNameRef} id="name" placeholder="Joe's Gaming Server" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="img" className="text-right">
                            Icon
                        </Label>
                        <Input ref={inputImgRef} id="img" placeholder="some image link" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="banner" className="text-right">
                            Banner
                        </Label>
                        <Input ref={inputBannerRef} id="banner" placeholder="some image link" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Textarea ref={inputDescRef} id="desc" placeholder="This is Joe's Gaming server, where we hold discussions and announcements about gaming and studying" className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isWorking} onClick={() => {
                        setIsWorking(true);
                        (async () => {
                            const data = await api.post("/channels/create", {
                                name: inputNameRef.current?.value,
                                type: inputDescRef.current?.value,
                                img: inputImgRef.current?.value,
                                banner: inputBannerRef.current?.value
                            });
                            console.log(data)
                            setIsWorking(false)
                            router.push("/chat/" + data.data.id)
                            setOpen(false);
                        })()
                    }}>{isWorking ? "Creating..." : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}