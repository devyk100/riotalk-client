"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const servers_data: Server[] = [
  { id: 1, name: "Home", img: "https://github.com/shadcn.png", unread: true },
  { id: 2, name: "Gaming", img: "", unread: false },
  // ... more servers
];

type Server = {
    id: number;
    name: string;
    img: string;
    unread: boolean;
}

export default function ServerSideBar() {
  const [servers, setServers] = useState(servers_data)
  const [active, setActive] = useState(1)
    // Call the function here, and populate the servers const here\
  return (
    <div className="w-[72px] h-full dark:bg-slate-700 bg-slate-300 flex flex-col items-center py-3 space-y-2 overflow-y-auto">
      {servers.map((server: Server) => (
        <div key={server.id} className="relative group" onClick={() => {
            setActive(server.id)
        }}>
          {/* Active Bar */}
          {active == server.id && (
            <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-md" />
          )}

          {/* Tooltip for the server name after hover */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {/* Server Icon */}
                <Avatar className={
                  `h-12 w-12 transition-all cursor-pointer
                  ${active == server.id 
                    ? "rounded-[16px]" 
                    : "rounded-[24px] group-hover:rounded-[16px]"
                  }
                  group-hover:bg-indigo-500/20`
                }>
                  <AvatarImage src={server.img} />
                  <AvatarFallback>{server.name[0]}</AvatarFallback>
                </Avatar>

              </TooltipTrigger>
              <TooltipContent>
                <p>{server.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          {/* Unread Dot */}
          {server.unread && (
            <div className="absolute -right-1 -top-1 h-3 w-3 bg-white rounded-full border-2 border-[#1e1f22]" />
          )}
        </div>
      ))}
    </div>
  );
}