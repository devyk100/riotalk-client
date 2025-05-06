export type Event = {
    event: string            // chat, auth, history
    type: string              // server, user
    is_token_expired?: boolean  // if the server wants to return something like this to render a refresh accept token
    to: number       // server_id, user_id
    of?: number    // In case for requesting the history
    channel_id?: number     // channel_id, if Type is server
    token?: string       // in auth
    from_id: number          //
    from_name: string        //
    from_username: string    //
    from_img: string         //
    content: string          //
    time_at: number          //
    message_type: string     //
    reply_of?: number         // references another chat id in same list
}

export type Message_t = {
    from_id: number;
    from_img: string;
    from_name: string;
    from_username: string;
    time_at: number;
    reply_of?: number;
    content: string;
    message_type: string;
}

export function CreateUserChatEvent({ to, from_id, from_name, from_username, from_img, content, time_at, message_type, reply_of }: { to: number, from_id: number, from_name: string, from_username: string, from_img: string, content: string, time_at: number, message_type: string, reply_of: number }) {
    if (reply_of == -1) {
        return {
            to, from_id, from_img, from_name, from_username, content, time_at, message_type,
            event: "chat", type: "user"
        }
    } else {
        return {
            to, from_id, from_img, from_name, from_username, content, time_at, message_type, reply_of,
            event: "chat", type: "user"
        }
    }
}



export function CreateChannelChatEvent({ to, channel_id, from_id, from_name, from_username, from_img, content, time_at, message_type, reply_of }: { to: number, channel_id: number, from_id: number, from_name: string, from_username: string, from_img: string, content: string, time_at: number, message_type: string, reply_of: number }) {
    return {
        to, from_id, from_img, from_name, channel_id, from_username, content, time_at, message_type, reply_of,
        event: "chat", type: "server"
    }
}