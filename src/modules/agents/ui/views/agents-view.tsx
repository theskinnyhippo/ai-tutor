"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { AgentGetOne } from "../../types";

export const Agentsview = () => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable columns={columns} data={data}/>
            {data.length === 0 && (
                <EmptyState title="Create an Agent" description="To start a meeting you need to create an agent. Each will follow your instructions and can interact with participants during a call."/>)}
        </div>
    )
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading agents" description="Wait up..." />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState title="Seems like we failed" description="Please try again" />
    )
}