"use client"

import {useState} from "react";
import ChatbotIcon from "@/components/chatbot/ChatbotIcon";
import ChatbotWindow from "@/components/chatbot/ChatbotWindow";

export default function Chatbot() {

    const [windowClosed, setWindowsClosed] = useState<boolean>(true);

    const openChatWindow = () => {
        setWindowsClosed(true);
    }

    const closeChatWindow = () => {
        setWindowsClosed(false);
    }

    return (
        <>
            <ChatbotIcon isClosed={windowClosed} openChatWindow={openChatWindow} />
            <ChatbotWindow isClosed={windowClosed} closeChatWindow={closeChatWindow} />
        </>
    )
}