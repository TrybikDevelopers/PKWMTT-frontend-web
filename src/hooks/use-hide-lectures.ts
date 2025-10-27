import {
    getHideLecturesOnClient,
    setHideLecturesOnClient,
} from "@/server/cookies-on-client";
import { useState } from "react";

export default function useHideLectures() {
    const [hideLectures, setHideLectures] = useState(getHideLecturesOnClient);

    const toggleHideLectures = () => {
        const newState = !hideLectures;

        setHideLectures(newState);
        setHideLecturesOnClient(newState);
    };

    return {
        hideLectures,
        setHideLectures,
        toggleHideLectures,
    };
}
