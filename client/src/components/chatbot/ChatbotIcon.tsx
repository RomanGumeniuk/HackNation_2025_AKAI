"use state"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MouseEventHandler} from "react";

export default function ChatbotIcon(props:{isClosed:boolean,openChatWindow: MouseEventHandler<HTMLDivElement>}) {

    return (
        <>
            {!props.isClosed &&
                <div onClick={props.openChatWindow} className={"cursor-pointer border-black border-[1px] max-w-max rounded-full fixed bottom-4 right-4 z-50"}>
                    <Avatar>
                        <AvatarImage src={"./bot_gemini_cropped.png"} />
                        <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                </div>
            }
        </>
    )
}

