import { Channel_t } from "@/components/ui/side-pane/channels-side-pane";
import { create } from "zustand";


export interface Channel {
  ID: number;
  Name: string;
  Type: string;
  ServerID: string;
  AllowedRoles: string;
  Description: string;
}


interface ChannelStore {
//   Channels: Channel[];
  activeChannel: Channel_t | null;
//   setChannels_tChannel_t: (Channels: Channel[]) => void;
  setActiveChannel: (Channel: Channel_t) => void;
}

export const useChannelStore = create<ChannelStore>((set, get) => ({
//   Channels: [],
  activeChannel: null,
//   setChannels: (Channels) => set({ Channels }),
  setActiveChannel: (channel:Channel_t) => {
    // const { Channels } = get();
    // const foundChannel = Channels.find((Channel) => Channel.ChannelID === id);
    set({ activeChannel: channel || null });
  },
}));
