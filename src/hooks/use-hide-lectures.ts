import { useLocalStorage } from "usehooks-ts";

const HIDE_LECTURES_KEY = "hide-lectures-setting";

export default function useHideLectures() {
    const [hideLectures, setHideLectures] = useLocalStorage<boolean>(
        HIDE_LECTURES_KEY,
        false,
    );

    const toggleHideLectures = () => {
        setHideLectures((prev) => !prev);
    };

    return {
        hideLectures,
        setHideLectures,
        toggleHideLectures,
    };
}
