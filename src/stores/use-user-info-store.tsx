import { RefreshToken } from "@/util/refresh-token";
import { GetUserInfo, SetUserInfo, UserInfo_t } from "@/util/user-info";
import { create } from "zustand";

interface UserInfoStore {
    activeUserInfo: UserInfo_t | null;
    fetchUserInfo: () => Promise<void>;
}

export const useActiveUserInfoStore = create<UserInfoStore>((set) => ({
    activeUserInfo: null,
    fetchUserInfo: async () => {
        try {
            let user = GetUserInfo();
            set({ activeUserInfo: (user) });

        } catch {
            await RefreshToken();
            await SetUserInfo();
            let user = GetUserInfo();
            set({ activeUserInfo: user });
        }
    },
}));

useActiveUserInfoStore.getState().fetchUserInfo();
