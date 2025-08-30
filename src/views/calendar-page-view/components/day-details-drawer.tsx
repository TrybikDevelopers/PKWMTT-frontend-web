import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    mockedInfo: string[];
};

export default function DayDetailsDrawer({ open, setOpen, mockedInfo }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                        Are you absolutely sure?
                    </DrawerDescription>
                </DrawerHeader>
                <div>
                    {mockedInfo.map((info) => (
                        <div key={info}>{info}</div>
                    ))}
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
