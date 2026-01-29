import { ROLES, RoleType } from "@/data";
import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
    processingText: string;
    processing: boolean;
    role: RoleType; // Tu peux typer plus précisément selon tes ROLES
    buttonLabel: string;
}

const SubmitButton = ({ processingText, processing, role, buttonLabel }: SubmitButtonProps) => {
    const activeTheme = ROLES[role];

    return (
        <button
            type="submit"
            disabled={processing}
            className={`
                    group w-full flex justify-center items-center py-3.5 px-4 border border-transparent
                    rounded-xl shadow-md text-sm font-bold text-white focus:outline-none focus:ring-2
                    focus:ring-offset-2 transition-all duration-300 active:scale-[0.98]
                    ${activeTheme.colors.bg}
                    ${activeTheme.colors.bgHover}
                    ${activeTheme.colors.shadow}
                    ${activeTheme.colors.shadowHover}
                    ${activeTheme.colors.ring}
                    ${processing ? 'opacity-80 cursor-not-allowed' : ''}
                `}
        >
            {processing ? (
                <>
                    <span className="mr-2">{processingText}</span>
                    <Loader2 className="animate-spin h-5 w-5" />
                </>
            ) : (
                <>
                    <span>{buttonLabel}</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
            )}
        </button>
    );
};

export default SubmitButton
