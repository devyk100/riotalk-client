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
    SelectGroup,
    SelectItem,
    SelectLabel,
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
import { useQueryClient } from "@tanstack/react-query";

export default function CreateChannelDialog() {
    const { serverId: serverIdString, channelId: channelIdString } = useParams();
    const { activeServer } = useActiveServerStore()
    const serverId = Number(serverIdString) || null;
    const [isWorking, setIsWorking] = useState(false)
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputDescRef = useRef<HTMLTextAreaElement>(null)
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const [channelType, setChannelType] = useState("text")
    const [permissions, setPermissions] = useState("member");
    const queryClient = useQueryClient();
    return (<>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full border-t-2 border-gray-700">
                {/* <Button variant={"ghost"} className="w-full flex gap-x-3 items-center justify-start p-2"> */}
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
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input ref={inputNameRef} id="name" placeholder="Chatting Channel" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="img" className="text-right">
                            Permissions
                        </Label>
                        <Select defaultValue={channelType} onValueChange={(val) => setChannelType(val)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Must Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Channel Type</SelectLabel>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="voice">Voice</SelectItem>
                                    <SelectItem value="stage">Stage</SelectItem>
                                    <SelectItem value="announcment">Announcement</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="banner" className="text-right">
                            Channel Type
                        </Label>
                        <Select defaultValue={permissions} onValueChange={(val) => setPermissions(val)}>
                            <SelectTrigger className="w-[180px]" >
                                <SelectValue placeholder="Must Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Permissions</SelectLabel>
                                <SelectItem value="admin">Allow only Admins</SelectItem>
                                <SelectItem value="moderator">Allow Moderators and Admins</SelectItem>
                                <SelectItem value="member">Allow Everyone</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Textarea ref={inputDescRef} id="desc" placeholder={"eg.,This is a text chatting channel in the " + activeServer?.Name} className="col-span-3" />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isWorking} onClick={() => {
                        setIsWorking(true);
                        (async () => {
                            const data = await api.post("/channels/create", {
                                name: inputNameRef.current?.value,
                                type: channelType,
                                allowed_roles: permissions,
                                server_id: activeServer?.ServerID,
                                description: inputDescRef.current?.value,
                            });
                            console.log(data)
                            setIsWorking(false)
                            
                            if(data.data.id) {
                                await queryClient.invalidateQueries({
                                    queryKey: ["channels", activeServer?.ServerID]
                                })
                                router.push(`/chat/${activeServer?.ServerID}/${data.data.id}`)
                            }
                            setOpen(false);
                        })()
                        console.log({
                            name: inputNameRef.current?.value,
                            type: channelType,
                            allowed_roles: permissions,
                            server_id: activeServer?.ServerID,
                            description: inputDescRef.current?.value,
                        })
                    }}>{isWorking ? "Creating..." : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}