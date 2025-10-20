import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const t = useTranslations("moderatorPanel.loginForm");

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="login">
                                    {t("loginLabel")}
                                </FieldLabel>
                                <Input
                                    id="login"
                                    type="text"
                                    placeholder={t("loginPlaceholder")}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        {t("passwordLabel")}
                                    </FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">
                                    {t("submitButton")}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
