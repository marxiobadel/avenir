import { ROLES, RoleType } from '@/data';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { register } from '@/routes';
import RoleSwitcher from '@/components/role-switcher';
import { Checkbox } from '@/components/ui/checkbox';
import { authInputClassNames } from '@/lib/utils';
import Logo from './components/logo';
import SubmitButton from './components/submit-button';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [role, setRole] = useState<RoleType>('buyer');
    const [showPassword, setShowPassword] = useState(false);
    const [isAnimatingText, setIsAnimatingText] = useState(false);

    const activeTheme = ROLES[role];

    // Gestion du changement de rôle avec animation du texte
    const handleRoleChange = (newRole: RoleType) => {
        if (role === newRole) return;
        setIsAnimatingText(true);
        setRole(newRole);

        // Petit délai pour l'effet de fade-in du texte dans le layout
        setTimeout(() => setIsAnimatingText(false), 300);
    };

    return (
        <AuthLayout role={role} isAnimatingText={isAnimatingText}>
            <Head title="Connexion" />

            <div className="mx-auto w-full max-w-90 sm:max-w-md animate-fade-in-up">

                {/* Logo */}
                <Logo role={role} />

                {/* Conteneur Principal (Card sur mobile, clean sur desktop) */}
                <div className="glass-card lg:border-none lg:bg-transparent rounded-2xl p-4 sm:p-6 md:p-8 lg:p-0 transition-all duration-300">

                    {/* Header */}
                    <div className="mb-6 lg:mb-8 text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Bon retour !</h2>
                        {canRegister && (
                            <p className="mt-2 text-sm text-slate-600">
                                Nouveau ici ?{' '}
                                <TextLink href={register()} className={`font-semibold transition-colors duration-300 underline decoration-2 decoration-transparent ${activeTheme.colors.text} ${activeTheme.colors.textHover} ${activeTheme.colors.decoration}`}>
                                    Créer un compte
                                </TextLink>
                            </p>)}
                    </div>

                    {/* Rôle Switcher */}
                    <RoleSwitcher
                        currentRole={role}
                        onRoleChange={handleRoleChange}
                    />

                    {/* Formulaire */}
                    <Form
                        {...store.form()}
                        transform={data => ({ ...data, role })}
                        resetOnSuccess={['password']}
                        options={{
                            preserveScroll: 'errors'
                        }}
                        className="space-y-5"
                    >
                        {({ processing, clearErrors, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                                            E-mail
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            tabIndex={1}
                                            required
                                            onFocus={() => clearErrors('email')}
                                            className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                            placeholder="nom@exemple.com"
                                        />
                                        <InputError className="mt-1" message={errors.email} />
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5 ml-1">
                                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                                Mot de passe
                                            </label>
                                            {canResetPassword && (
                                                <div className="text-sm">
                                                    <TextLink tabIndex={5} href={request()} className={`no-underline font-medium transition-colors duration-300 ${activeTheme.colors.text} ${activeTheme.colors.textHover}`}>
                                                        Oublié ?
                                                    </TextLink>
                                                </div>)}
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                required
                                                className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 p-2 cursor-pointer transition-colors"
                                            >
                                                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        <InputError className="mt-1" message={errors.password} />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="bg-white mt-px border shadow-none"
                                        />
                                        <label htmlFor="remember" className="block text-sm font-semibold text-slate-700">
                                            Se souvenir de moi
                                        </label>
                                    </div>
                                </div>

                                {/* Bouton de soumission */}
                                <div className="pt-2">
                                    <SubmitButton
                                        processingText="Connexion..."
                                        processing={processing}
                                        role={role}
                                        buttonLabel='Se connecter'
                                    />
                                </div>
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="my-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* Séparateur Social */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300/60"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-3 bg-white/50 backdrop-blur text-slate-500 rounded-full font-semibold tracking-wider">Via</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <SocialButton
                                icon={
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <path d="M12.0003 20.45c4.6667 0 8.45-3.8033 8.45-8.45 0-4.6467-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.8033-8.45 8.45 0 4.6467 3.7833 8.45 8.45 8.45Z" fill="#fff" />
                                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.162-1.908 4.162-1.162 1.162-2.908 2.408-5.932 2.408-4.717 0-8.526-3.809-8.526-8.526s3.809-8.526 8.526-8.526c2.553 0 4.453 1.01 5.823 2.321l2.308-2.308C18.66 1.34 15.91 0 12.48 0 5.865 0 .5 5.365.5 12s5.365 12 11.98 12c3.57 0 6.26-1.17 8.36-3.35 2.17-2.17 2.86-5.22 2.86-7.66 0-.73-.06-1.42-.18-2.07H12.48z" fill="#EA4335" />
                                    </svg>
                                }
                                label="Google"
                            />
                            <SocialButton
                                icon={
                                    <svg className="h-5 w-5 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                                    </svg>
                                }
                                label="Apple"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex justify-center items-center py-2.5 px-4 rounded-xl border border-slate-300 bg-white/60 hover:bg-white text-sm font-medium text-slate-700 transition-all hover:shadow-md hover:-translate-y-0.5 shadow-sm">
            {icon}
            {label}
        </button>
    );
}
