import type { Messages, useTranslations } from "next-intl";
import type { getTranslations } from "next-intl/server";

type ObjectKeysInObject<T> = T extends object
    ? {
          [K in string & keyof T]: T[K] extends object
              ? K | `${K & string}.${ObjectKeysInObject<T[K]>}`
              : never;
      }[string & keyof T]
    : never;

export type Namespaces = ObjectKeysInObject<Messages>;

export type TFunction<Namespace extends Namespaces = never> =
    | ReturnType<typeof useTranslations<Namespace>>
    | Awaited<ReturnType<typeof getTranslations<Namespace>>>;
