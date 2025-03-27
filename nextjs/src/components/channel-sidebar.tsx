"use client";

import { ChevronDown, Hash, Mic, Video, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type Channel = {
  id: string;
  name: string;
  type: "text" | "voice" | "video" | "private";
  unread?: boolean;
};

type Category = {
  id: string;
  name: string;
  channels: Channel[];
  collapsed?: boolean;
};

export function ChannelSidebar() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "TEXT CHANNELS",
      collapsed: false,
      channels: [
        { id: "1-1", name: "general", type: "text", unread: true },
        { id: "1-2", name: "welcome", type: "text" },
        { id: "1-3", name: "rules", type: "text" },
      ],
    },
    {
      id: "2",
      name: "VOICE CHANNELS",
      collapsed: true,
      channels: [
        { id: "2-1", name: "General", type: "voice" },
        { id: "2-2", name: "Gaming", type: "voice" },
        { id: "2-3", name: "Private", type: "private" },
      ],
    },
  ]);

  const [selectedChannel, setSelectedChannel] = useState("1-1");

  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, collapsed: !cat.collapsed } : cat
    ));
  };

  const getChannelIcon = (type: Channel["type"]) => {
    switch (type) {
      case "text": return <Hash className="h-4 w-4 mr-1" />;
      case "voice": return <Mic className="h-4 w-4 mr-1" />;
      case "video": return <Video className="h-4 w-4 mr-1" />;
      case "private": return <Lock className="h-4 w-4 mr-1" />;
      default: return <Hash className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="w-60 h-full bg-slate-200 dark:bg-slate-800 flex flex-col">
      {/* Server header */}
      <div className="h-12 border-b border-slate-300 dark:border-slate-700 flex items-center px-4 shadow-sm">
        <h2 className="font-semibold text-slate-900 dark:text-white truncate">
          Discord Server
        </h2>
      </div>

      {/* Channels list */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-0.5">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between px-2 font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
                onClick={() => toggleCategory(category.id)}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  category.collapsed ? "-rotate-90" : ""
                }`} />
                <span className="flex-1 text-left ml-2 text-xs uppercase">
                  {category.name}
                </span>
              </Button>

              {!category.collapsed && (
                <div className="ml-2 space-y-0.5">
                  {category.channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                      size="sm"
                      className={`w-full justify-start px-2 ${
                        channel.unread ? "font-semibold" : "font-normal"
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      {getChannelIcon(channel.type)}
                      <span className="truncate">{channel.name}</span>
                      {channel.unread && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User profile footer */}
      <div className="p-2 border-t border-slate-300 dark:border-slate-700">
        <div className="flex items-center gap-2 p-1 rounded hover:bg-slate-300/50 dark:hover:bg-slate-700/50">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            <span>U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-sm">Username</p>
            <p className="truncate text-xs text-slate-500">#1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}