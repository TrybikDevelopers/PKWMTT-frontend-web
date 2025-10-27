import {
    HIDE_LECTURES_COOKIE_KEY,
    hideLecturesCookieOptions,
} from "@/constants/cookies";
import { getCookie, setCookie } from "cookies-next";

export const getHideLecturesOnClient = () => {
    const value = getCookie(HIDE_LECTURES_COOKIE_KEY);
    if (!value) return false;

    return value === "true";
};

export const setHideLecturesOnClient = (value: boolean) => {
    setCookie(
        HIDE_LECTURES_COOKIE_KEY,
        value.toString(),
        hideLecturesCookieOptions,
    );
};
