"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { EctsEntrySchema } from "@/schema/forms/ects-form-schema";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

type Props = {
    form: UseFormReturn<EctsEntrySchema>;
    onSubmit: (values: EctsEntrySchema) => void;
};

export default function EctsForm({ form, onSubmit }: Props) {
    const t = useTranslations("ectsCalculator.form");

    return (
        <div className="rounded-2xl border p-4">
            <div className="mb-4 text-lg font-semibold">{t("dialogTitle")}</div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("nameLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("namePlaceholder") || ""}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ects"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("ectsLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("ectsPlaceholder") || ""}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("gradeLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={
                                            t("gradePlaceholder") || ""
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" className="cursor-pointer">
                            {t("confirmButton")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
