import Image from "next/image";

interface Props {
    title: string;
    description: string;
    image?: string;
}

export const EmptyState = ({
    title,
    description,
    image = "/empty.svg"
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-6 text-center lg:pt-[165px]">
            <Image src={image} alt="Empty" width={240} height={240} />
            <div className="max-w-md pb-5">
                <h6 className="text-xl font-medium mb-3">{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};
