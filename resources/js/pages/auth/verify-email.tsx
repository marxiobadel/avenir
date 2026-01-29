// Components
import TextLink from '@/components/text-link';
import { ROLES } from '@/data';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
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
            <Head title="Vérification de l'email" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Un nouveau lien de vérification a été envoyé à l'adresse email
                    que vous avez fournie lors de l'inscription.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
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
                                    <span className="mr-2">En cours...</span>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                </>
                            ) : (
                                <>
                                    <span>Renvoyer le lien de vérification</span>
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Se déconnecter
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
