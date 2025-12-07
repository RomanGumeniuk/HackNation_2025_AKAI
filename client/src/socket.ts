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

export const composeMessage = (
  task: TTask,
  content?: string,
  prompt?: string,
  clearMemory?: boolean
): IAskBody => {
  return {
    userId: crypto.randomUUID(),
    data: {
      task,
      content,
      prompt,
    },
    clearMemory: clearMemory || false,
  };
};

const socket = io("http://127.0.0.1:3000/");

export default socket;
