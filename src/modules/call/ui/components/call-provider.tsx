"use client";

import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { GenerateAvatarUri } from "@/lib/avatar";
import { CallConnect } from "./call-connect";

interface Props {
    meetingid : string;
    meetingName : string;
};

export const CallProvider = ({
    meetingid,
    meetingName
} : Props ) => {

    const { data, isPending } = authClient.useSession();

    if(!data || isPending){
        return (
            <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
                <Loader2Icon className="size-10 animate-spin text-green-200"/>
            </div>
        );
    }

    return (
        <CallConnect 
            meetingid={meetingid} 
            meetingName={meetingName} 
            userId={data.user.id}
            userName={data.user.name}
            userImage={data.user.image ?? GenerateAvatarUri({ seed : data.user.name, variant : "initials" })}
            />
    )
}