import { Button } from "@/components/ui/button";

type Props = {
    children: React.ReactNode;
};

export default function ChangeDayButton({ children }: Props) {
    return (
        <Button
            type="button"
            className="bg-button hover:bg-button/70 xxs:px-6 flex cursor-pointer items-center gap-2 rounded-xl p-0 px-5 py-1.5 text-base font-semibold text-[#AFAFAF]"
        >
            {children}
        </Button>
    );
}
