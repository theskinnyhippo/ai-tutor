import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

// interface Props {
//     meetingid : string;
//     onCancelMeeting : () => void;
//     isCancelling : boolean;
// }


export const CancelledState = () => {
//     {
//     meetingid,
//     onCancelMeeting,
//     isCancelling
// } : Props 

    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center pb-50">
            <EmptyState 
                image="/cancelled.svg"
                title="Meeting cancelled"
                description="Wooohoooo!"
            />
            {/* <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
                <Button
                variant="secondary"
                className="w-full lg:w-auto"
                onClick={onCancelMeeting}
                disabled={isCancelling}
                >
                    <BanIcon />
                    Cancel meeting
                </Button>
                <Button asChild className="w-full lg:w-auto"
                    disabled={isCancelling}
                >
                    <Link href={`/call/${meetingid}`}>
                        <VideoIcon />
                        Start meeting
                    </Link>
                </Button>
            </div> */}
        </div>
    )
}