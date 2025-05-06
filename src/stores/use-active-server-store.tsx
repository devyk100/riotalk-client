import { Server_t } from "@/components/ui/side-pane/servers-side-pane";
import { create } from "zustand";


interface ServerStore {
//   servers: Server[];
  activeServer: Server_t | null;
//   setServers: (servers: Server[]) => void;
  setActiveServer: (server: Server_t) => void;
}

export const useActiveServerStore = create<ServerStore>((set, get) => ({
//   servers: [],
  activeServer: null,
//   setServers: (servers) => set({ servers }),
  setActiveServer: (server:Server_t) => {
    // const { servers } = get();
    // const foundServer = servers.find((server) => server.ServerID === id);
    set({ activeServer: server || null });
  },
}));
