import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GenerateAvatarUri } from "@/lib/avatar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Highlighter from "react-highlight-words";



interface Props {
    meetingid : string;
}

export const Transcript = ({meetingid} : Props ) => {
    const trpc = useTRPC();

    const {data} = useQuery(trpc.meetings.getTranscript.queryOptions({ id : meetingid }));

    const [ searchQuery, setSearchQuery ] = useState("")
    
    const filteredData = (data ?? []).filter(
        (item) => item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
            <p className="text-sm font-medium">Transcript</p>
                <div className="relative">
                    <Input
                    placeholder="Search Transcript"
                    className="pl-7 h-9 w-[240px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
                <ScrollArea className="h-96">
                    <div className="flex flex-col gap-y-4">
                        {filteredData.map((item) => {
                            return (
                                <div 
                                key={item.start_ts}
                                className="flex flex-col  gap-y-2 hover:bg-muted p-4 rounded-md border">
                                    <div className="flex gap-x-2 items-center">
                                        <Avatar className="size-6">
                                            <AvatarImage 
                                                src={item.user.image ?? GenerateAvatarUri({ seed : item.user.name , variant : "initials"})}
                                            />
                                        </Avatar>
                                        <p className="text-sm font-md">{item.user.name}</p>
                                        <p className="text-sm font-md text-blue-400">
                                            {format(
                                                new Date(1000 * item.start_ts),
                                                "mm:ss"
                                            )}
                                        </p>
                                    </div>
                                        <Highlighter
                                        className="text-sm text-neutral-700"
                                        highlightClassName="bg-yellow-200"
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={item.text}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
        </div>
    )
}