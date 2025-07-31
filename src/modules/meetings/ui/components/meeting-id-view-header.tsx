import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

import { 
    ChevronRightIcon,
    TrashIcon,
    PencilIcon,
    MoreVerticalIcon
} from "lucide-react";

import Link from "next/link";

import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


interface Props {
    meetingid : string;
    meetingName : string;
    onEdit : () => void;
    onRemove : () => void;
}

export const MeetingIdViewHeader = ({
    meetingid,
    meetingName,
    onEdit,
    onRemove
} : Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                            <Link href="/meetings">
                                My Meetings
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-black">
                            <Link href={`/meetings/${meetingid}`}>
                                {meetingName}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* without modal={false}, the dialog this dropdown opens will cause the entire website to get unclickable */}
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreVerticalIcon />
                        <DropdownMenuContent align="end" className="gap-y-2">
                            
                            <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2 p-3">
                                <PencilIcon className="size-4 text-black"/>
                                Edit
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={onRemove} className="flex items-center gap-2 p-3">
                                <TrashIcon className="size-4 text-black"/>
                                Delete
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}