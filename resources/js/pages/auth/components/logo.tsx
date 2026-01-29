import { ShoppingBag } from 'lucide-react';
import { ROLES, RoleType } from '@/data';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function Logo({ role }: { role: RoleType }) {
    const { name } = usePage<SharedData>().props;
    const activeTheme = ROLES[role];

    return (
        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
            <div className={`h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center text-white transition-all duration-500 transform hover:scale-105 shadow-lg lg:shadow-xl ${activeTheme.colors.logoBg} ${activeTheme.colors.logoShadow}`}>
                <ShoppingBag className="h-6 w-6 lg:h-7 lg:w-7" />
            </div>
            <div>
                <span className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 block leading-none">{name}</span>
                <span className="text-[10px] lg:text-xs font-bold text-slate-500 tracking-widest uppercase">Africa Marketplace</span>
            </div>
        </div>
    );
}
