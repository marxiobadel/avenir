import { cgv, legal, privacy } from "@/routes";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export const Footer = () => {
    const { name } = usePage<SharedData>().props;

    return (
        <footer className="bg-stone-950 py-5 text-stone-400 border-t border-stone-900">
            <div className="container max-w-7xl mx-auto px-6 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© {new Date().getFullYear()} {name}. Tous droits réservés.</p>
                <div className="flex gap-6">
                    <Link href={legal()} className="hover:text-white">Mentions légales</Link>
                    <Link href={cgv()} className="hover:text-white">CGV</Link>
                    <Link href={privacy()} className="hover:text-white">Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
};
