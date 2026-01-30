import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ProfileLayout from "@/layouts/profile/layout";
import { FormEventHandler, useRef, useState, useMemo } from "react";
import userPassword from "@/routes/user-password";
import { toast } from "sonner";
import { cn, inputClassNames } from "@/lib/utils";
import { Eye, EyeOff, LoaderCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const isMobile = useIsMobile();

    // Consolidated visibility state
    const [visibility, setVisibility] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const toggleVisibility = (field: keyof typeof visibility) => {
        setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const { data, setData, errors, put, reset, processing, isDirty } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Simple strength calculation for UI feedback
    const passwordStrength = useMemo(() => {
        if (!data.password) return 0;
        let score = 0;
        if (data.password.length > 8) score++;
        if (/[A-Z]/.test(data.password)) score++;
        if (/[0-9]/.test(data.password)) score++;
        if (/[^A-Za-z0-9]/.test(data.password)) score++;
        return score;
    }, [data.password]);

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        put(userPassword.update().url, {
            preserveScroll: 'errors',
            onSuccess: () => {
                reset();
                toast.success("Sécurité mise à jour", {
                    description: "Votre mot de passe a été modifié avec succès.",
                });
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout layout="guest">
            <Head title="Sécurité - Mot de passe" />
            <ProfileLayout>
                <div className="mx-auto max-w-4xl">
                    <form onSubmit={updatePassword} className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {/* Header Section */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 pb-8 md:grid-cols-3">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    Mot de passe
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester en sécurité.
                                </p>
                            </div>

                            <div className="md:col-span-2 flex flex-col gap-4">
                                {/* Current Password */}
                                <PasswordField
                                    label="Mot de passe actuel"
                                    id="current_password"
                                    value={data.current_password}
                                    error={errors.current_password}
                                    show={visibility.current}
                                    onToggle={() => toggleVisibility('current')}
                                    onChange={(val) => setData('current_password', val)}
                                    ref={currentPasswordInput}
                                    autoComplete="current-password"
                                />

                                <hr className="border-gray-100 dark:border-zinc-800" />

                                {/* New Password */}
                                <div className="space-y-4">
                                    <PasswordField
                                        label="Nouveau mot de passe"
                                        id="password"
                                        value={data.password}
                                        error={errors.password}
                                        show={visibility.new}
                                        onToggle={() => toggleVisibility('new')}
                                        onChange={(val) => setData('password', val)}
                                        ref={passwordInput}
                                        autoComplete="new-password"
                                    />

                                    {/* Strength Meter */}
                                    {data.password && (
                                        <div className="mt-2 space-y-2">
                                            <div className="flex gap-1 h-1">
                                                {[1, 2, 3, 4].map((step) => (
                                                    <div
                                                        key={step}
                                                        className={cn(
                                                            "h-full w-full rounded-full transition-colors",
                                                            passwordStrength >= step ? "bg-primary" : "bg-gray-200 dark:bg-zinc-700"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                                                Force du mot de passe
                                            </p>
                                        </div>
                                    )}

                                    <PasswordField
                                        label="Confirmer le nouveau mot de passe"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        error={errors.password_confirmation}
                                        show={visibility.confirm}
                                        onToggle={() => toggleVisibility('confirm')}
                                        onChange={(val) => setData('password_confirmation', val)}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="flex items-center justify-end gap-x-4 pt-8">
                            {isDirty && !processing && !isMobile && (
                                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mr-2">
                                    Modifications non enregistrées
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className={cn(
                                    "relative inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-95",
                                    "bg-primary text-primary-foreground hover:opacity-90",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            >
                                {processing ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ShieldCheck className="h-4 w-4" />
                                )}
                                <span>Mettre à jour</span>
                            </button>
                        </div>
                    </form>
                </div>
            </ProfileLayout>
        </AppLayout>
    );
}

/**
 * Reusable Field Component for consistent styling
 */
interface PasswordFieldProps {
    label: string;
    id: string;
    value: string;
    error?: string;
    show: boolean;
    onToggle: () => void;
    onChange: (val: string) => void;
    autoComplete?: string;
    ref?: React.RefObject<HTMLInputElement | null>;
}

const PasswordField = ({
    label,
    id,
    value,
    error,
    show,
    onToggle,
    onChange,
    ref,
    autoComplete
}: PasswordFieldProps) => (
    <div className="w-full">
        <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 mb-2">
            {label}
        </label>
        <InputGroup>
            <InputGroupInput
                ref={ref}
                id={id}
                type={show ? "text" : "password"}
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className={cn(inputClassNames(), "rounded-r-none border", error && "border-red-500 focus-visible:ring-red-500")}
            />
            <InputGroupAddon align="inline-end">
                <button
                    type="button"
                    onClick={onToggle}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    {show ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </InputGroupAddon>
        </InputGroup>
        {error && (
            <div className="mt-2 flex items-center gap-1 text-red-500">
                <ShieldAlert size={14} />
                <p className="text-xs font-medium">{error}</p>
            </div>
        )}
    </div>
);
