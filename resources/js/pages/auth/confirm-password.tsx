import InputError from '@/components/input-error';
import { ROLES } from '@/data';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Logo from './components/logo';
import SubmitButton from './components/submit-button';
import { authInputClassNames } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export default function ConfirmPassword() {
    const roles: ('buyer' | 'seller')[] = ['buyer', 'seller'];
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

    useEffect(() => {
        setRole((prevRole) => {
            const otherRoles = roles.filter(r => r !== prevRole);
            const randomIndex = Math.floor(Math.random() * otherRoles.length);
            return otherRoles[randomIndex];
        });
    }, []);

    const activeTheme = ROLES[role];

    return (
        <AuthLayout role={role} isAnimatingText={false}>
            <Head title="Confirmer le mot de passe" />
            <div className="mx-auto w-full max-w-90 sm:max-w-md animate-fade-in-up">
                {/* Logo */}
                <Logo role={role} />

                {/* Conteneur Principal (Card sur mobile, clean sur desktop) */}
                <div className="glass-card lg:border-none lg:bg-transparent rounded-2xl p-4 sm:p-6 md:p-8 lg:p-0 transition-all duration-300">

                    {/* Header */}
                    <div className="mb-6 lg:mb-8 text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Confirmer le mot de passe
                        </h2>

                    </div>

                    {/* Formulaire */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        options={{
                            preserveScroll: 'errors'
                        }}
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Mot de passe</label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                autoComplete="current-password"
                                                autoFocus
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
                                </div>

                                {/* Bouton de soumission */}
                                <div className="pt-2">
                                    <SubmitButton
                                        processingText="En cours..."
                                        processing={processing}
                                        role={role}
                                        buttonLabel='Confirmer'
                                    />
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AuthLayout>
    );
}
