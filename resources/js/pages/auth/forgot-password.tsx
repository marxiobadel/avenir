import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { authInputClassNames } from '@/lib/utils';
import { ROLES } from '@/data';
import { useEffect, useState } from 'react';
import Logo from './components/logo';
import SubmitButton from './components/submit-button';

export default function ForgotPassword({ status }: { status?: string }) {
    const roles: ('buyer' | 'seller')[] = ['buyer', 'seller'];
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
            <Head title="Mot de passe oublié" />

            <div className="mx-auto w-full max-w-90 sm:max-w-md animate-fade-in-up">
                {/* Logo */}
                <Logo role={role} />

                {/* Conteneur Principal (Card sur mobile, clean sur desktop) */}
                <div className="glass-card lg:border-none lg:bg-transparent rounded-2xl p-4 sm:p-6 md:p-8 lg:p-0 transition-all duration-300">

                    {/* Header */}
                    <div className="mb-6 lg:mb-8 text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Mot de passe oublié
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            <TextLink href={login()} className={`font-semibold transition-colors duration-300 underline decoration-2 decoration-transparent ${activeTheme.colors.text} ${activeTheme.colors.textHover} ${activeTheme.colors.decoration}`}>
                                Connexion
                            </TextLink>
                        </p>
                    </div>

                    {/* Formulaire */}
                    <Form
                        {...email.form()}
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
                                            autoComplete="off"
                                            onFocus={() => clearErrors('email')}
                                            className={authInputClassNames(`${activeTheme.colors.ring} ${activeTheme.colors.border}`)}
                                            placeholder="nom@exemple.com"
                                        />
                                        <InputError className="mt-1" message={errors.email} />
                                    </div>
                                </div>

                                {/* Bouton de soumission */}
                                <div className="pt-2">
                                    <SubmitButton
                                        processingText="En cours..."
                                        processing={processing}
                                        role={role}
                                        buttonLabel='Envoyer le lien'
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
                </div>
            </div>
        </AuthLayout>
    );
}
