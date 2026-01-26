import { Head, Link, usePage } from '@inertiajs/react';
import {
    Search, ShoppingBag, Store, ArrowRight, Star,
    ShieldCheck, Truck, Zap, Heart, Globe, TrendingUp,
    Smartphone, MapPin, Award, CheckCircle2, Users,
    ArrowUpRight, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface WelcomeProps {
    canRegister?: boolean;
    featuredProducts: any[];
    featuredStores: any[];
    categories: any[];
}

// Animations fluides pour le contenu au défilement
const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export default function Welcome({
    canRegister = true,
    featuredProducts = [],
    featuredStores = [],
    categories = []
}: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="AVENIR | La Révolution du Commerce Africain" />

            <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#080808] text-[#1b1b18] dark:text-[#EDEDEC] selection:bg-[#f53003] selection:text-white">

                {/* 1. TOP ANNOUNCEMENT BAR */}
                <div className="bg-[#1b1b18] text-white py-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4">
                    🚀 Livraison gratuite dès 50 000 FCFA d'achat sur tout le site !
                </div>

                {/* 2. NAVIGATION PREMIUM */}
                <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl dark:bg-[#080808]/70 dark:border-[#1e1e1e]">
                    <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-10">
                        <div className="flex items-center gap-12">
                            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
                                <div className="w-8 h-8 bg-[#f53003] rounded-lg flex items-center justify-center text-white text-xl italic">A</div>
                                AVENIR
                            </Link>
                            <nav className="hidden xl:flex gap-8 text-[13px] font-bold uppercase tracking-wider text-muted-foreground">
                                <Link href="/shop" className="hover:text-[#f53003] transition-colors">Boutique</Link>
                                <Link href="/artisans" className="hover:text-[#f53003] transition-colors">Nos Artisans</Link>
                                <Link href="/terroir" className="hover:text-[#f53003] transition-colors">Terroir</Link>
                                <Link href="/aide" className="hover:text-[#f53003] transition-colors">Support</Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6">
                            <div className="hidden lg:flex relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input placeholder="Rechercher un trésor..." className="w-64 pl-10 h-11 rounded-xl bg-slate-100/50 border-none focus:ring-2 focus:ring-[#f53003]/20" />
                            </div>

                            <div className="flex items-center gap-2">
                                {auth.user ? (
                                    <Link href={""}>
                                        <Button className="rounded-full font-bold bg-[#1b1b18] text-white px-6">Mon Espace</Button>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-1 md:gap-3">
                                        <Link href={""}>
                                            <Button variant="ghost" className="text-sm font-bold hidden sm:flex">Connexion</Button>
                                        </Link>
                                        {canRegister && (
                                            <Link href={"route('register')"}>
                                                <Button className="bg-[#f53003] hover:bg-[#d42902] rounded-full px-4 md:px-8 h-11 text-xs md:text-sm font-black shadow-xl shadow-[#f53003]/20 uppercase">
                                                    Vendre
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                                <Button variant="outline" size="icon" className="rounded-full h-11 w-11 border-2 relative">
                                    <ShoppingBag className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 bg-[#1b1b18] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white">2</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    {/* 3. HERO SECTION : L'EMPIRE DU SENS */}
                    <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-40 overflow-hidden">
                        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="h-[2px] w-12 bg-[#f53003]"></span>
                                    <span className="text-[#f53003] font-black uppercase tracking-[0.3em] text-xs">Innovation & Tradition</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-8">
                                    Le meilleur de <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f53003] via-[#ff750f] to-[#f53003] bg-size-200 animate-gradient">
                                        l'Afrique créative
                                    </span> <br />
                                    chez vous.
                                </h1>
                                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 max-w-xl">
                                    La première plateforme qui digitalise le génie de nos artisans. Des produits authentiques, certifiés et livrés avec amour.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-[#1b1b18] text-lg font-black group shadow-2xl shadow-black/10">
                                        Acheter maintenant
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    <button className="flex items-center gap-3 font-bold hover:text-[#f53003] transition-colors group">
                                        <PlayCircle className="h-12 w-12 group-hover:scale-110 transition-transform" />
                                        Voir le concept
                                    </button>
                                </div>
                                <div className="mt-12 flex items-center gap-6 border-t pt-8 dark:border-[#1e1e1e]">
                                    <div>
                                        <p className="text-2xl font-black">2.5k+</p>
                                        <p className="text-xs text-muted-foreground uppercase font-bold">Artisans</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-slate-200 dark:bg-[#1e1e1e]"></div>
                                    <div>
                                        <p className="text-2xl font-black">15</p>
                                        <p className="text-xs text-muted-foreground uppercase font-bold">Pays</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-slate-200 dark:bg-[#1e1e1e]"></div>
                                    <div className="flex -space-x-3">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative hidden lg:block"
                            >
                                <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl rotate-2">
                                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop" alt="Hero" className="w-full h-[600px] object-cover" />
                                </div>
                                {/* Floating Cards */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-10 -right-10 bg-white dark:bg-[#161615] p-6 rounded-3xl shadow-2xl z-20 border dark:border-[#1e1e1e]"
                                >
                                    <p className="text-xs font-black uppercase text-[#f53003] mb-1">Top Vendeur</p>
                                    <p className="font-bold">Maison du Bogolan</p>
                                    <div className="flex gap-1 mt-2">
                                        {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    {/* 4. TRUST SECTION : LES GARANTIES AVENIR */}
                    <section className="py-20 bg-white dark:bg-[#0a0a0a] border-y dark:border-[#1e1e1e]">
                        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { icon: Smartphone, title: "Mobile Money", desc: "Payez via Orange, MTN ou Wave" },
                                { icon: ShieldCheck, title: "Paiement Sécurisé", desc: "Transactions cryptées SSL" },
                                { icon: Truck, title: "Livraison Locale", desc: "Partenaires logistiques pro" },
                                { icon: Globe, title: "Exportation", desc: "Livraison mondiale disponible" },
                            ].map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-14 h-14 bg-[#f53003]/10 rounded-2xl flex items-center justify-center text-[#f53003]">
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <h4 className="font-black text-sm uppercase">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. VENTES FLASH : ANIMÉES */}
                    <section className="py-24 overflow-hidden">
                        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                            <div>
                                <Badge className="mb-4 bg-yellow-400 text-black border-none font-black px-4 py-1">Ventes Flash ⚡</Badge>
                                <h2 className="text-4xl font-black italic">Offres du moment</h2>
                            </div>
                            <div className="flex gap-4 mb-2">
                                <div className="bg-slate-100 dark:bg-[#1e1e1e] p-4 rounded-xl text-center min-w-[70px]">
                                    <p className="text-xl font-black uppercase">02</p>
                                    <p className="text-[10px] font-bold text-muted-foreground">Jours</p>
                                </div>
                                <div className="bg-slate-100 dark:bg-[#1e1e1e] p-4 rounded-xl text-center min-w-[70px]">
                                    <p className="text-xl font-black uppercase">14</p>
                                    <p className="text-[10px] font-bold text-muted-foreground">Heures</p>
                                </div>
                            </div>
                        </div>

                        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { name: "Tunique Wax Slim", price: "15 500", old: "25 000", img: "10" },
                                { name: "Masque Dan Authentique", price: "85 000", old: "120 000", img: "11" },
                                { name: "Beurre de Karité (500g)", price: "4 500", old: "7 000", img: "12" },
                                { name: "Panier Raphia 'Océan'", price: "12 000", old: "18 500", img: "13" },
                            ].map((item, i) => (
                                <motion.div key={i} whileHover={{ y: -10 }} className="group">
                                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                        <img src={`https://picsum.photos/seed/shop${i}/600/750`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <Badge className="bg-[#f53003] text-white border-none font-bold">-{Math.round((1 - parseInt(item.price.replace(' ', ''))/parseInt(item.old.replace(' ', '')))*100)}%</Badge>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <Button className="w-full bg-white text-black hover:bg-white/90 h-14 rounded-2xl font-black shadow-xl">
                                                Ajouter au panier
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                                        <div className="flex items-center gap-3">
                                            <p className="text-2xl font-black text-[#f53003]">{item.price} <span className="text-xs">FCFA</span></p>
                                            <p className="text-sm text-muted-foreground line-through">{item.old} FCFA</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* 6. COMMENT ÇA MARCHE ? */}
                    <section className="py-24 bg-[#1b1b18] text-white rounded-[60px] mx-4 lg:mx-10 my-24 overflow-hidden relative">
                        <div className="container mx-auto px-10 relative z-10">
                            <div className="text-center max-w-2xl mx-auto mb-20">
                                <h2 className="text-4xl lg:text-5xl font-black mb-6 italic">Comment commander ?</h2>
                                <p className="text-white/50">Une expérience fluide de la découverte à la livraison.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-16">
                                {[
                                    { step: "01", title: "Découvrez", desc: "Parcourez des milliers de produits artisanaux uniques." },
                                    { step: "02", title: "Commandez", desc: "Payez en toute sécurité via votre Mobile Money préféré." },
                                    { step: "03", title: "Réceptionnez", desc: "Suivez votre colis en temps réel jusqu'à votre porte." },
                                ].map((step, i) => (
                                    <div key={i} className="text-center group">
                                        <div className="text-7xl font-black text-white/5 mb-8 group-hover:text-[#f53003]/20 transition-colors leading-none">{step.step}</div>
                                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{step.title}</h3>
                                        <p className="text-white/40 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 7. CTA VENDEUR : IMPACT SOCIAL */}
                    <section className="py-24">
                        <div className="container mx-auto px-6">
                            <div className="bg-gradient-to-br from-[#f53003] to-[#ff750f] rounded-[50px] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-[#f53003]/20">
                                <div className="flex-1 text-white">
                                    <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">Votre talent mérite <br /> le monde entier.</h2>
                                    <p className="text-white/80 text-lg lg:text-xl mb-10 leading-relaxed">
                                        Artisans, créateurs, agriculteurs : ouvrez votre boutique gratuitement et bénéficiez de nos outils de marketing et de logistique intégrés.
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4 mb-12">
                                        {['0% Frais d\'inscription', 'Paiements hebdomadaires', 'Support marketing', 'Gestion de stock pro'].map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 font-bold"><CheckCircle2 className="h-5 w-5" /> {f}</li>
                                        ))}
                                    </ul>
                                    <Button size="lg" className="bg-white text-[#f53003] hover:bg-white/90 h-18 px-12 rounded-2xl text-xl font-black">
                                        Ouvrir ma boutique maintenant
                                    </Button>
                                </div>
                                <div className="flex-1 relative hidden lg:block">
                                    <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[40px] border border-white/20">
                                        <Users className="h-16 w-16 text-white mb-6" />
                                        <p className="text-2xl font-black text-white italic mb-4">"Avenir a triplé mon chiffre d'affaires en 3 mois. La plateforme est intuitive et les paiements sont rapides."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                            <div>
                                                <p className="font-bold text-white">Moussa Diakité</p>
                                                <p className="text-xs text-white/60 uppercase">Artisan Ebéniste</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* 8. FOOTER PANAFRICAIN */}
                <footer className="bg-white dark:bg-[#080808] border-t py-24 dark:border-[#1e1e1e]">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
                        <div className="lg:col-span-2 space-y-8">
                            <h3 className="text-3xl font-black tracking-tighter">AVENIR<span className="text-[#f53003]">.</span></h3>
                            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed font-medium">
                                Nous bâtissons l'infrastructure du commerce de demain en Afrique. Un commerce plus équitable, plus technologique et profondément humain.
                            </p>
                            <div className="flex gap-4">
                                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(s => (
                                    <div key={s} className="w-12 h-12 bg-slate-100 dark:bg-[#161615] rounded-2xl flex items-center justify-center hover:bg-[#f53003] hover:text-white transition-all cursor-pointer shadow-sm">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className="font-black uppercase text-[10px] tracking-[0.2em] text-[#f53003] mb-8">Plateforme</h5>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Notre Manifeste</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Devenir Vendeur</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Nos Tarifs</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Carrières</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-black uppercase text-[10px] tracking-[0.2em] text-[#f53003] mb-8">Support</h5>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Centre d'aide</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Retours produits</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Suivi colis</Link></li>
                                <li><Link href="#" className="hover:text-[#f53003] transition-colors">Confidentialité</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-black uppercase text-[10px] tracking-[0.2em] text-[#f53003] mb-8">Paiements</h5>
                            <div className="grid grid-cols-2 gap-2 opacity-50 grayscale">
                                <div className="h-10 bg-slate-100 rounded-lg"></div>
                                <div className="h-10 bg-slate-100 rounded-lg"></div>
                                <div className="h-10 bg-slate-100 rounded-lg"></div>
                                <div className="h-10 bg-slate-100 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 mt-24 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <p>© 2026 AVENIR Marketplace - Propulsé par le talent africain</p>
                        <div className="flex gap-8">
                            <Link href="#">CGV</Link>
                            <Link href="#">Mentions Légales</Link>
                            <Link href="#">Cookies</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
