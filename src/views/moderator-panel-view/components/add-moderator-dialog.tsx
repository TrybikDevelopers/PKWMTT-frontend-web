"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AddModeratorDialog() {
    const [open, setOpen] = useState(false);
    const [group, setGroup] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Adding moderator:", { group, email });
        setOpen(false);
        setGroup("");
        setEmail("");
    };

    const handleCancel = () => {
        setOpen(false);
        setGroup("");
        setEmail("");
    };

    const t = useTranslations("moderatorPanel.addModeratorDialog");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    <Plus className="mr-2 h-4 w-4" />
                    {t("title")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle className="text-lg font-semibold">
                        {t("title")}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                        {t("description")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="group"
                                className="text-sm font-medium"
                            >
                                {t("groupLabel")}
                            </Label>
                            <Select
                                value={group}
                                onValueChange={setGroup}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={t("groupPlaceholder")}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="12K">12K</SelectItem>
                                    <SelectItem value="13K">13K</SelectItem>
                                    <SelectItem value="14K">14K</SelectItem>
                                    <SelectItem value="15K">15K</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                {t("emailLabel")}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                {t("cancelButton")}
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
                            >
                                {t("confirmButton")}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
