
import Link from "next/link";
import Markdown from "react-markdown";

import { Tabs, TabsTrigger } from "@/components/ui/tabs"
import { MeetingGetOne } from "../../types"
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area"
import { TabsContent, TabsList } from "@radix-ui/react-tabs"
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, Heading1, SparklesIcon } from "lucide-react"

import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
    data : MeetingGetOne
}
export const CompletedState = ({data} : Props ) => {
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue="summary">
                <div className="bg-white rounded-2xl border p-3 ">
                    <ScrollArea>
                        <TabsList className="m-1 bg-background justify-start rounded-lg px-2 h-13">
                            <TabsTrigger 
                                value="summary"
                                className="text-muted-foreground bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"                            
                                >
                                <BookOpenTextIcon className="size-6"/>
                                Summary
                            </TabsTrigger>
                            
                            <TabsTrigger 
                                value="transcript"
                                className="text-muted-foreground bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"                            
                                >
                                <FileTextIcon className="size-6"/>
                                Transcript
                            </TabsTrigger>
                            
                            <TabsTrigger 
                                value="recording"
                                className="text-muted-foreground bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"                            
                                >
                                <FileVideoIcon className="size-6"/>
                                Recording
                            </TabsTrigger>
                            
                            <TabsTrigger 
                                value="chat"
                                className="text-muted-foreground bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"                            
                                >
                                <SparklesIcon className="size-6"/>
                                Ask AI
                            </TabsTrigger>
                            
                        </TabsList>
                        <Scrollbar orientation="horizontal"/>
                    </ScrollArea>
                    <TabsContent value="recording">
                        <div className="bg-white rounded-2xl border px-4 py-5 m-5">
                            <div className="flex justify-center">
                                <div className="w-1/2 m-6 rounded-lg border-gray-200 border-3">
                                <video
                                    src={data.recordingUrl!}
                                    className="w-full rounded-lg"
                                    controls
                                    />
                                </div>
                            </div>

                            <div className="flex text-gray-500 justify-center p-4">
                                this recording will stay here for 2 weeks, if it's important Download it
                            </div>
                        
                        </div>
                    </TabsContent>
                    <TabsContent value="summary">
                        <div className="bg-white rounded-2xl border px-4 py-5 m-5">
                            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                                <h2 className="text-2xl font-medium capitalize">
                                    {data.name}
                                </h2>
                                <div className="flex gap-x-2  items-center">
                                    <Link
                                        href={`/agents/${data.agent.id}`}
                                        className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                                    >
                                        <GeneratedAvatar 
                                            seed={data.agent.name}
                                            variant="botttsNeutral"
                                            className="sise-5"
                                        />
                                        {data.agent.name}
                                    </Link>{" "}
                                    <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                                </div>
                                <Badge 
                                    variant="outline"
                                    className="flex items-center gap-x-2 [&>svg]:size-4"
                                >
                                    <ClockFadingIcon className="text-blue-700" />
                                    {data.duration ? formatDuration(data.duration) : "No duration" }
                                </Badge>
                                <div>
                                    <Markdown
                                        components={{
                                            h1 : (props) => (
                                                <h1 className="text-2xl font-medium mb-6" {...props} />
                                            ),
                                            h2 : (props) => (
                                                <h2 className="text-xl font-medium mb-6" {...props} />
                                            ),
                                            h3 : (props) => (
                                                <h3 className="text-lg font-medium mb-6" {...props} />
                                            ),
                                            h4 : (props) => (
                                                <h4 className="text-base font-medium mb-6" {...props} />
                                            ),
                                            p : (props) => (
                                                <p className="leading-relaxed mb-6" {...props} />
                                            ),
                                            ul : (props) => (
                                                <ul className="list-disc list-inside mb-6" {...props} />
                                            ),
                                            ol : (props) => (
                                                <ol className="list-decimal list-inside mb-6" {...props} />
                                            ),
                                            strong : (props) => (
                                                <strong className="font-bold" {...props} />
                                            ),
                                            code : (props) => (
                                                <code className="bg-gray-200 px-1 py-0.5 rounded" {...props} />
                                            ),
                                            blockquote : (props) => (
                                                <blockquote className="border-l-4 pl-4 italic my-4" {...props} />
                                            ),
                                        }}
                                    >
                                        {data.summary}
                                    </Markdown>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="chat">

                            <div className="flex text-gray-500 justify-center p-4">
                                this feature is not yet available
                            </div>
                        
                    </TabsContent>
                    <TabsContent value="transcript">
                    {data.transcriptUrl ? (
                        <a
                        href={data.transcriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 m-6"
                        >
                        Open Transcript
                        </a>
                    ) : (
                        <span className="text-sm text-slate-500 p-6">No transcript available</span>
                    )}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}