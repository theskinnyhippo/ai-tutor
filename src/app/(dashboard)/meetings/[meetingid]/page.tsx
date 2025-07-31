import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { 
    MeetingIdView, 
    MeetingsViewError, 
    MeetingsViewLoading 
} from "@/modules/meetings/ui/views/meeting-id-views";

interface Props {
    params : Promise<{
        meetingid : string;
    }>
}

const Page = async ({ params } : Props ) => {

    const { meetingid } = await params;

    const session = await auth.api.getSession({
        headers : await headers()
    })

    if(!session){
        redirect("/sign-in")
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id : meetingid })
    )

    //meeting transcript

    return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingsViewLoading />}>
                    <ErrorBoundary fallback={<MeetingsViewError />}>
                        <MeetingIdView meetingid={meetingid} />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
    )
}

export default Page;