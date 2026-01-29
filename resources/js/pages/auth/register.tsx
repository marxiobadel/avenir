import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react'; // Added usePage for URL detection
import { useState } from 'react';
import { ROLES, RoleType } from '@/data';
import { authInputClassNames } from '@/lib/utils';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import Logo from './components/logo';
import RoleSwitcher from '@/components/role-switcher';
import SubmitButton from './components/submit-button';
import { toast } from 'sonner';

export default function Register() {
    // 1. URL State Management
    const queryParams = new URLSearchParams(window.location.search);
    const initialStep = queryParams.get('step') === 'security' ? 2 : 1;

    const [step, setStep] = useState(initialStep);
    const [role, setRole] = useState<RoleType>('buyer');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [isAnimatingText, setIsAnimatingText] = useState(false);

    // Sync step with URL
    const updateStep = (newStep: number) => {
        setStep(newStep);
        const stepName = newStep === 1 ? 'info' : 'security';
        const newUrl = `${window.location.pathname}?step=${stepName}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const activeTheme = ROLES[role];

    const handleRoleChange = (newRole: RoleType) => {
        if (role === newRole) return;
        setIsAnimatingText(true);
        setRole(newRole);
        setTimeout(() => setIsAnimatingText(false), 300);
    };

    return (
        <AuthLayout role={role} isAnimatingText={isAnimatingText}>
            <Head title={`Inscription - Étape ${step}`} />
            <div className="mx-auto w-full max-w-90 sm:max-w-md animate-fade-in-up">
                <Logo role={role} />

                <div className="glass-card lg:border-none lg:bg-transparent rounded-2xl p-4 sm:p-6 md:p-8 lg:p-0 transition-all duration-300">

                    {/* Header */}
                    <div className="mb-6 lg:mb-8 text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {step === 1 ? 'Vos informations' : 'Sécurisez votre compte'}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Étape {step} sur 2 • <TextLink href={login()} className={`font-semibold ${activeTheme.colors.text}`}>Connexion</TextLink>
                        </p>
                    </div>

                    <RoleSwitcher currentRole={role} onRoleChange={handleRoleChange} />

                    <Form
                        {...store.form()}
                        transform={data => ({ ...data, role })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        onError={() => toast.error('Veuillez vérifier les erreurs dans le formulaire.')}
                        className="space-y-5"
                    >
                        {({ processing, clearErrors, errors }) => (
                            <>
                                <div className="space-y-4">
                                    {/* --- STEP 1: PERSONAL INFO --- */}
                                    <div className={`space-y-4 ${step === 1 ? 'block' : 'hidden'}`}>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Nom de famille</label>
                                            <input
                                                id="lastname"
                                                type="text"
                                                name="lastname"
                                                autoComplete="family-name"
                                                tabIndex={1}
                                                onFocus={() => clearErrors('lastname')}
                                                className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                placeholder="Ex: Doungmo"
                                            />
                                            <InputError message={errors.lastname} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Prénom</label>
                                            <input
                                                id="firstname"
                                                type="text"
                                                name="firstname"
                                                autoComplete="given-name"
                                                tabIndex={2}
                                                onFocus={() => clearErrors('firstname')}
                                                className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                placeholder="Ex: Samuel"
                                            />
                                            <InputError message={errors.firstname} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Téléphone</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                autoComplete="mobile tel-area-code"
                                                tabIndex={3}
                                                onFocus={() => clearErrors('phone')}
                                                className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                placeholder="Ex: +237 699727665"
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                type="button"
                                                onClick={() => updateStep(2)}
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
                                                <span>Continuer</span>
                                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* --- STEP 2: SECURITY --- */}
                                    <div className={`space-y-4 ${step === 2 ? 'block' : 'hidden'}`}>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">E-mail</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                tabIndex={4}
                                                onFocus={() => clearErrors('email')}
                                                className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                placeholder="nom@exemple.com"

                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Mot de passe</label>
                                            <div className="relative">
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    tabIndex={5}
                                                    autoComplete="new-password"
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
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirmation</label>
                                            <div className="relative">
                                                <input
                                                    id="password_confirmation"
                                                    type={showConfPassword ? "text" : "password"}
                                                    name="password_confirmation"
                                                    tabIndex={6}
                                                    autoComplete="new-password"
                                                    required
                                                    className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                                    placeholder="••••••••"
                                                />
                                                <button type="button" onClick={() => setShowConfPassword(!showConfPassword)} className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                                                    {showConfPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2 flex-col sm:flex-row">
                                            <button
                                                type="button"
                                                onClick={() => updateStep(1)}
                                                className="group flex-1 py-3 px-4 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ArrowLeft className="ml-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                                <span>Retour</span>
                                            </button>
                                            <div className="flex-2">
                                                <SubmitButton
                                                    processingText="Création..."
                                                    processing={processing}
                                                    role={role}
                                                    buttonLabel='Créer mon compte'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AuthLayout>
    );
}
