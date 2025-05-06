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
import { Input } from "./input";
import { Label } from "./label";
import { useRef, useState } from "react";
import { api } from "@/util/axios-setup";
import { Textarea } from "./textarea";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateServerDialog() {
    const [isWorking, setIsWorking] = useState(false)
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputImgRef = useRef<HTMLInputElement>(null)
    const inputBannerRef = useRef<HTMLInputElement>(null)
    const inputDescRef = useRef<HTMLTextAreaElement>(null)
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const queryClient = useQueryClient()
    return (<>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="border-gray-600 border-t-[0.5px] p-2 ">
                <PlusCircle />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Server</DialogTitle>
                    <DialogDescription>
                        Create an organized server to chat, discuss and hangout with people!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 border-t-2">
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
                            const data = await api.post("/servers/create", {
                                name: inputNameRef.current?.value,
                                desc: inputDescRef.current?.value,
                                img: inputImgRef.current?.value,
                                banner: inputBannerRef.current?.value
                            });
                            console.log(data)
                            setIsWorking(false)
                            if(data.data.id) {
                                queryClient.invalidateQueries({
                                    queryKey: ["servers"]
                                })
                                router.push("/chat/"+data.data.id)
                            }
                            setOpen(false); 
                        })()
                    }}>{isWorking ? "Creating..." : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}