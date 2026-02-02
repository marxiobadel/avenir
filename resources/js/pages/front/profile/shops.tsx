import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Category, PaginationMeta, Shop } from "@/types";
import ProfileLayout from "@/layouts/profile/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Box, Clock, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import StatusBadge from "@/components/ecommerce/status-badge";
import profile from "@/routes/profile";
import DataTablePagination from "@/components/datatable-pagination";
import { useState } from "react";
import ShopForm from "./components/shop-form";
import routeShops from "@/routes/shops";
import { toast } from "sonner";
import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import { useFlashNotifications } from "@/hooks/use-flash-notification";

// Interface pour la réponse paginée
interface ShopsProps {
    shops: {
        data: Shop[];
        meta: PaginationMeta;
        links: any[];
    };
    categories: Category[];
}

export default function Shops({ shops, categories }: ShopsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [creatingShop, setCreatingShop] = useState(false);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [deleteShop, setDeleteShop] = useState<Shop | null>(null);

    const onPageChange = (page: number) => {
        router.get(
            window.location.pathname,
            { page },
            { preserveScroll: true, preserveState: true, except: ['categories'] }
        );
    };

    const onPerPageChange = (perPage: number) => {
        router.get(
            window.location.pathname,
            { page: 1, per_page: perPage },
            { preserveScroll: true, preserveState: true, except: ['categories'] }
        );
    };

    const handleEdit = (shop: Shop) => setEditingShop(shop);

    const handleDelete = (shop: Shop) => {
        setDeleteShop(shop);
        setIsDialogOpen(true);
    };

    useFlashNotifications();

    return (
        <AppLayout layout="guest">
            <Head title="Mes boutiques" />

            <ProfileLayout>
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-stone-900">Mes boutiques</h2>
                            <p className="text-sm text-stone-500">
                                Consultez et suivez vos récentes boutiques.
                            </p>
                        </div>
                        <button
                            onClick={() => setCreatingShop(true)}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-stone-900 text-stone-50 hover:bg-stone-900/90 h-10 px-4 py-2">
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle boutique
                        </button>
                    </div>

                    <Card className="border-stone-200/60 shadow-none bg-white overflow-hidden">
                        {shops.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-stone-500 uppercase bg-stone-50/80 border-b border-stone-100">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold tracking-wider">Référence</th>
                                                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                                                <th className="px-6 py-4 font-semibold tracking-wider">Statut</th>
                                                <th className="px-6 py-4 font-semibold tracking-wider">Montant</th>
                                                <th className="px-6 py-4 text-right font-semibold tracking-wider">Détails</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-100">
                                            {shops.data.map((shop) => (
                                                <tr key={shop.id} className="group hover:bg-stone-50/60 transition-colors cursor-pointer">
                                                    <td className="px-6 py-4 font-medium text-stone-900">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                                <Box className="h-4 w-4" />
                                                            </div>
                                                            #{shop.id.toString().padStart(6, '0')}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-stone-500">
                                                        <div className="w-max flex items-center gap-2">
                                                            <Clock className="h-3.5 w-3.5 text-stone-400" />
                                                            {format(new Date(shop.created_at), "d MMM yyyy", { locale: fr })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={shop.settings.status} />
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-stone-900">
                                                        20 FCFA
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/5 rounded-full">
                                                            <Link href={profile.shops.show(shop.slug)}>
                                                                <ChevronRight className="h-5 w-5" />
                                                            </Link>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 border-t border-stone-100">
                                    <DataTablePagination
                                        meta={shops.meta}
                                        perPage={shops.meta.per_page}
                                        onPageChange={onPageChange}
                                        onPerPageChange={onPerPageChange}
                                        perPageOptions={[10, 20, 50]}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                                <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                                    <Package className="h-8 w-8 text-stone-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-900">Aucune boutique trouvée</h3>
                                <p className="text-stone-500 max-w-sm mt-2 mb-6">
                                    Vous n'avez encore créé aucune boutique. Commencez dès maintenant à vendre vos produits en créant une nouvelle boutique.
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
                <ShopForm
                    open={creatingShop || !!editingShop}
                    onClose={() => {
                        setCreatingShop(false);
                        setEditingShop(null);
                    }}
                    shop={editingShop}
                    categories={categories}
                    submitUrl={
                        editingShop
                            ? routeShops.update(editingShop.slug).url
                            : routeShops.store().url
                    }
                    method={editingShop ? "PUT" : "POST"}
                />
                <ConfirmDeleteDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="Confirmer la suppression"
                    message={`Voulez-vous vraiment supprimer ? Cette action est irréversible.`}
                    onConfirm={() => {
                        if (!deleteShop) {
                            toast.warning(
                                <div className="flex flex-col">
                                    <span className="font-semibold text-foreground">Avertissement</span>
                                    <span className="text-sm text-muted-foreground">
                                        La boutique ne peut être supprimée.
                                    </span>
                                </div>
                            );

                            return;
                        }

                        router.delete(
                            routeShops.destroy(deleteShop.slug).url,
                            {
                                preserveState: true,
                                onError: (errors: any) => {
                                    const messages: string[] = [];

                                    if (errors.error) {
                                        messages.push(errors.error);
                                    } else {
                                        messages.push("Une erreur est survenue lors de la suppression.");
                                    }

                                    toast.error(
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">Erreur</span>
                                            <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                                                {messages.map((msg, index) => (
                                                    <li key={index}>{msg}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                },
                            }
                        );

                        setDeleteShop(null);
                        setIsDialogOpen(false);
                    }}
                />
            </ProfileLayout>
        </AppLayout>
    );
}
