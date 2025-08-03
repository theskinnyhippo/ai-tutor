"use client";

import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/loading-state";

import ChatUI from "./chat-ui";
import { GenerateAvatarUri } from "@/lib/avatar";

interface Props {
    meetingid : string;
    meetingName : string;
}

export const ChatProvider = ({
    meetingid,
    meetingName
} : Props ) => {

    const { data, isPending } = authClient.useSession();

    if(!data || isPending){
        return (
            <LoadingState 
                title="Loading..."
                description="Please wait while we load the chat"
            />
        );
    }

    return(
        <ChatUI
            meetingid={meetingid}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={data.user.image ?? ""}
        />
    )
}