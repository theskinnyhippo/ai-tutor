import { 
    AgentIdView, 
    AgentsViewError, 
    AgentsViewLoading 
} from "@/modules/agents/ui/views/agents-id-view";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params : Promise<{ agentid : string }>
}

//localhost:3000/agents/123

const Page = async ({ params } : Props ) => {
    const { agentid } = await params;

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id : agentid })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary fallback={<AgentsViewError />}>
                    <AgentIdView agentid={agentid} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page;