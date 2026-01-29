import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export default function InputError({
    message,
    className,
    ...props
}: InputErrorProps) {
    if (!message) return null;

    return (
        <p
            role="alert"
            className={cn(
                "text-sm font-medium text-red-600 dark:text-red-400",
                "animate-in fade-in slide-in-from-top-1 duration-200", // Subtle entry animation
                className
            )}
            {...props}
        >
            {message}
        </p>
    );
}
