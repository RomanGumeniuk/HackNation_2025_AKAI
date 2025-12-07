"use client";
import { io } from "socket.io-client";

export type TTask = "title" | "summarize" | "answer" | "form" | "load" | "rate";

export interface IAskBody {
  userId: string;
  data: {
    task: TTask;
    content?: string;
    prompt?: string;
  };
  clearMemory: boolean;
}

// Fallback for crypto.randomUUID in older browsers
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const composeMessage = (
  task: TTask,
  content?: string,
  prompt?: string,
  clearMemory?: boolean
): IAskBody => {
  return {
    userId: generateUUID(),
    data: {
      task,
      content,
      prompt,
    },
    clearMemory: clearMemory || false,
  };
};

// Use environment variable or fallback to localhost
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

export default socket;
