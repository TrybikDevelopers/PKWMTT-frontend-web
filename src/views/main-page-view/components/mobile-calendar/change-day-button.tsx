import { Button } from "@/components/ui/button";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
};

export default function ChangeDayButton({ onClick, children }: Props) {
    return (
        <Button
            type="button"
            className="bg-button hover:bg-button/70 xxs:px-6 flex cursor-pointer items-center gap-2 rounded-xl p-0 px-5 py-1.5 text-base font-semibold text-[#AFAFAF]"
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
