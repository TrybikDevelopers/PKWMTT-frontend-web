import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNavSheet() {
    return (
        <Sheet>
            <SheetTrigger className="ml-auto flex h-fit w-fit cursor-pointer flex-col space-y-1 p-2">
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
                <div className="h-0.5 w-6 bg-current"></div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Nawigacja</SheetTitle>
                    <SheetDescription>tutaj będzie</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
