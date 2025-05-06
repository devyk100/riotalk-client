'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // optional, use any input

type Message = {
    id: string;
    sender: string;
    content: string;
};

export default function ChatTrial() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [hasMore, setHasMore] = useState(true);

    // Simulate receiving a new message (e.g. from WebSocket)
    const receiveMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    // Simulate sending a message
    const sendMessage = () => {
        if (input.trim() === '') return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'You',
            content: input,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
    };

    // Simulate loading older messages
    const loadOlderMessages = () => {
        if (!hasMore) return;

        const older = Array.from({ length: 10 }).map((_, i) => ({
            id: `old-${Date.now() - i}`,
            sender: 'OldBot',
            content: `Older message ${i + 1}`,
        }));

        setMessages((prev) => [...older, ...prev]);
        if (messages.length > 50) setHasMore(false); // stop after a few
    };

    // Simulate incoming messages
    useEffect(() => {
        const interval = setInterval(() => {
            receiveMessage({
                id: Date.now().toString(),
                sender: 'Bot',
                content: 'Hello from the other side! 🎵',
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    const FIRST_INDEX = 100000;
    return (
        <div className="w-full max-w-md mx-auto h-[600px] border rounded flex flex-col">
            <div className="flex-1 overflow-hidden">
                <Virtuoso
                    data={messages}
                    firstItemIndex={FIRST_INDEX}
                    initialTopMostItemIndex={FIRST_INDEX + messages.length - 1}

                    startReached={loadOlderMessages}
                    itemContent={(index, message) => (
                        <div key={message.id} className="p-2 border-b text-sm">
                            <strong>{message.sender}:</strong> {message.content}
                        </div>
                    )}
                />
            </div>
            <div className="p-2 border-t flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    );
}
