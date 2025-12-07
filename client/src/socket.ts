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

// Fallback UUID generator for environments where crypto.randomUUID is not available
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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

const socket = io("http://146.59.16.213:8080/");

export default socket;
