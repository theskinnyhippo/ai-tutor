"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useRouter } from "next/navigation";
import { useConfirm } from "../../hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props{
    meetingid : string;
}

export const MeetingIdView = ({ meetingid } : Props ) => {
    
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id : meetingid }))
    const queryClient = useQueryClient()
    const router = useRouter()



    const [ RemoveConfirmation, confirmRemove ] = useConfirm(
        "Are you sure?",
        `The following action will remove this meeting`,
    )

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess : () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                // invalidate free tier usage

                router.push("/meetings")
            },
            // didnt make error condition here
        })
    )

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";


    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok) return;

        await removeMeeting.mutateAsync({ id: meetingid })
    }


    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog 
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader 
                    meetingid={meetingid}
                    meetingName={data.name} 
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <CompletedState data={data}/> } 
                {isActive && (<ActiveState 
                    meetingid={meetingid}
                    onCancelMeeting={() => {}}
                    isCancelling={false}
                />)}
                {isUpcoming && (<UpcomingState 
                    meetingid={meetingid}
                    onCancelMeeting={() => {}}
                    isCancelling={false}
                />)}
            </div>
        </>
    )
}

export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="Wait up..." />
    )
}

export const MeetingsViewError = () => {
    return (
        <ErrorState title="Seems like we failed" description="Please try again" />
    )
}