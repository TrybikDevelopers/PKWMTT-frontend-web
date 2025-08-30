import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    mockedInfo: string[];
};

export default function DayDetailsDialog({ open, setOpen, mockedInfo }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {mockedInfo.map((info) => (
                        <div key={info}>{info}</div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
