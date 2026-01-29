import { RoleType } from '@/data';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export interface AuthLayoutProps {
    role: RoleType;
    isAnimatingText?: boolean;
    children: ReactNode;
}

export default function AuthLayout({
    children,
    role,
    isAnimatingText = false,
    ...props
}: AuthLayoutProps) {
    return (
        <AuthLayoutTemplate role={role} isAnimatingText={isAnimatingText} {...props}>
            {children}
            <Toaster position="top-right" duration={5000} expand={true} />
        </AuthLayoutTemplate>
    );
}
