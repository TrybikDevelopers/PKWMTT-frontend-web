interface LessonButtonProps {
    children: React.ReactNode;
}

export default function LessonButton({ children }: LessonButtonProps) {
    return (
        <button className="bg-button hover:bg-button/70 flex cursor-pointer items-center gap-2 rounded-xl px-6 py-1.5 text-base font-semibold text-[#AFAFAF] shadow transition *:size-6">
            {children}
        </button>
    );
}
