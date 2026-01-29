import { ROLES, RoleType } from '@/data';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    role: RoleType;
    isAnimatingText?: boolean;
    children: ReactNode;
}

export default function AuthSimpleLayout({ role, isAnimatingText, children }: AuthLayoutProps) {
    const activeTheme = ROLES[role];

    return (
        <div className="h-full min-h-screen font-sans antialiased text-slate-900 bg-slate-50 relative selection:bg-indigo-100 selection:text-indigo-700">
            {/* --- BACKGROUND MOBILE (Visible uniquement sur mobile/tablette) --- */}
            <div className="fixed inset-0 z-0 lg:hidden overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 bg-slate-900">
                    {/* Image Buyer */}
                    <img
                        src={ROLES.buyer.images.mobile}
                        alt="Background Buyer"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${role === 'buyer' ? 'opacity-100 animate-ken-burns' : 'opacity-0'}`}
                    />
                    {/* Image Seller */}
                    <img
                        src={ROLES.seller.images.mobile}
                        alt="Background Seller"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${role === 'seller' ? 'opacity-100 animate-ken-burns' : 'opacity-0'}`}
                    />
                </div>
                <div className="absolute inset-0 mobile-bg-overlay backdrop-blur-[2px]"></div>
            </div>

            <div className="min-h-full flex flex-col lg:flex-row relative z-10">

                {/* --- SECTION GAUCHE (Contenu Enfant: Formulaire) --- */}
                <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-20 xl:px-24 relative w-full lg:max-w-150 lg:bg-white/80 lg:backdrop-blur-sm min-h-dvh">
                    {children}
                </div>

                {/* --- SECTION DROITE (Image Desktop & Branding) --- */}
                <div className="hidden lg:block w-0 flex-1 overflow-hidden h-screen sticky top-0">
                    <div className="absolute inset-0 bg-slate-900">
                        {/* Note: Using 'key' to force re-render and restart Ken Burns animation on role change */}
                        <img
                            key={`desktop-${role}`}
                            src={activeTheme.images.desktop}
                            alt="Background Desktop"
                            className="absolute inset-0 h-full w-full object-cover animate-ken-burns origin-center"
                        />

                        {/* Préchargement de l'autre image pour une transition fluide */}
                        <img
                            src={ROLES[role === 'buyer' ? 'seller' : 'buyer'].images.desktop}
                            className="hidden"
                            alt="Preload"
                        />
                    </div>

                    <div className={`absolute inset-0 mix-blend-multiply transition-colors duration-700 ${activeTheme.colors.overlay}`}></div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Testimonial & Branding */}
                    <div className="absolute bottom-0 left-0 right-0 p-16 text-white animate-fade-in-up">
                        <div className="bg-white/10 border-white/20 rounded-2xl p-8 backdrop-blur-xl shadow-2xl max-w-lg mb-8 transform transition-all duration-500 hover:scale-[1.02]">
                            <div className="flex gap-1 text-yellow-400 mb-4 text-lg">★★★★★</div>

                            <p className={`text-xl font-medium leading-relaxed mb-6 font-serif italic text-white/90 transition-opacity duration-300 ${isAnimatingText ? 'opacity-0' : 'opacity-100'}`}>
                                {activeTheme.content.testimonial}
                            </p>

                            <div className={`flex items-center gap-4 border-t border-white/10 pt-4 transition-opacity duration-300 ${isAnimatingText ? 'opacity-0' : 'opacity-100'}`}>
                                <img
                                    src={activeTheme.content.personImg}
                                    alt="Avatar"
                                    className="h-12 w-12 rounded-full border-2 border-white/50 object-cover"
                                />
                                <div>
                                    <div className="font-bold text-white">{activeTheme.content.personName}</div>
                                    <div className="text-sm text-white/80">{activeTheme.content.personRole}</div>
                                </div>
                            </div>
                        </div>

                        <h1 className={`text-5xl font-extrabold tracking-tight drop-shadow-lg transition-opacity duration-300 ${isAnimatingText ? 'opacity-0' : 'opacity-100'}`}>
                            {activeTheme.content.title}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
