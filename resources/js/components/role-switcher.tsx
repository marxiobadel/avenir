import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { RoleType } from '@/data';

interface RoleSwitcherProps extends HTMLAttributes<HTMLDivElement> {
    currentRole: RoleType;
    onRoleChange: (role: RoleType) => void;
}

export default function RoleSwitcher({
    currentRole,
    onRoleChange,
    className
}: RoleSwitcherProps) {

    const isBuyer = currentRole === 'buyer';

    return (
        <div className={cn("mb-6", className)}>
            <div className="relative grid grid-cols-2 p-1 bg-slate-100/80 backdrop-blur-md rounded-xl border border-slate-200/60">

                {/* The Sliding White Pill (Background Animation) */}
                <div
                    className={cn(
                        "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white ring-1 ring-black/5 transition-all duration-300 ease-out",
                        isBuyer ? "translate-x-0 left-1" : "translate-x-full ml-1 left-0" // ml-1 accounts for the gap
                    )}
                />

                {/* Option 1: Buyer */}
                <button
                    onClick={() => onRoleChange('buyer')}
                    className="relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none"
                >
                    {/* Buyer Icon */}
                    <svg
                        className={cn("h-4 w-4 transition-colors duration-300", isBuyer ? "text-orange-600" : "text-slate-500")}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className={cn("transition-colors duration-300", isBuyer ? "text-slate-900" : "text-slate-500")}>
                        Acheteur
                    </span>
                </button>

                {/* Option 2: Seller */}
                <button
                    onClick={() => onRoleChange('seller')}
                    className="relative z-10 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none"
                >
                    {/* Seller Icon */}
                    <svg
                        className={cn("h-4 w-4 transition-colors duration-300", !isBuyer ? "text-emerald-600" : "text-slate-500")}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className={cn("transition-colors duration-300", !isBuyer ? "text-slate-900" : "text-slate-500")}>
                        Vendeur
                    </span>
                </button>
            </div>
        </div>
    );
}
