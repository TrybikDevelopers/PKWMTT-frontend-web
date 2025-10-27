"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import useModeratorAuth from "./hooks/use-moderator-auth";

export default function ModeratorAuthView() {
    const { form, onSubmit } = useModeratorAuth();
    const t = useTranslations("moderatorPanel.loginForm");

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("title")}</CardTitle>
                        <CardDescription>{t("description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="grid gap-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="login"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="login">
                                                {t("loginLabel")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="login"
                                                    type="text"
                                                    placeholder={t(
                                                        "loginPlaceholder",
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">
                                                {t("passwordLabel")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder={t(
                                                        "passwordPlaceholder",
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    {t("submitButton")}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
