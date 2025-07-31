"use client";


import { Button } from "@/components/ui/button"
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const AgentsListHeader = () => {

    const [ filters, setFilters ] = useAgentsFilters();     // very familiar api and very powerful feature
    const [ isDialogOpen, setIsDialogOpen ] = useState(false)

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search : "",
            page : DEFAULT_PAGE,
        })
    }

    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
            <div className="py-4 px-4 md:px-8 flex-col gap-y-4">
                <div className="flex items-center justify-between ">
                    <h5 className="font-md text-xl">My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon />
                        New Agent
                    </Button>
                </div>
                <ScrollArea>
                    <div className="flex items-center gap-x-2 p-1">
                        <AgentsSearchFilter />
                        {isAnyFilterModified && (
                            <Button className="shadow-gray-500 ml-2" variant="outline" size="sm" onClick={onClearFilters}>
                                <XCircleIcon className="text-red-600"/>
                                clear
                            </Button>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />                    
                </ScrollArea>
            </div>
        </>
    )
}