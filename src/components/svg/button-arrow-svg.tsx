import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function ButtonArrowSVG({ className }: Props) {
    return (
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
        >
            <g>
                <line
                    x1="11"
                    y1="16"
                    x2="20"
                    y2="7"
                    className="stroke-current"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <line
                    x1="20"
                    y1="25"
                    x2="11"
                    y2="16"
                    className="stroke-current"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}
