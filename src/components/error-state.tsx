import { Loader2Icon } from "lucide-react";
import { AlertCircleIcon } from "lucide-react";


interface Props {
    title : string;
    description : string;
}

export const ErrorState = ({
    title, description
} : Props) => {
    return (
        <div className="py-4 p-x-8 flex flex-1 items-center justify-center h-screen hidden-overflow pb-30">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-white rounded-lg p-10 shadow-md">
                <AlertCircleIcon className="size-6 text-red-600" />
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm  ">{description}</p>
                </div>
            </div>
        </div>
    )
}