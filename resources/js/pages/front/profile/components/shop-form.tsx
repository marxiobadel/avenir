import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit } from "lucide-react";
import { Category, SharedData, Shop } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { cn, inputClassNames } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productTypes, shopStatus } from "@/data";

type FormProps = {
    open: boolean;
    onClose: () => void;
    shop: Shop | null;
    categories: Category[];
    submitUrl: string;
    method: "POST" | "PUT";
};

type FormData = {
    name: string;
    category_id: number | string | null;
    description: string;
    status: string;
    product_type: string;
    _method?: string;
};

export default function ShopForm({ open, onClose, shop, categories, submitUrl, method }: FormProps) {
    const props = usePage<SharedData>().props;

    const form = useForm<FormData>({
        name: '',
        category_id: null,
        description: '',
        status: shopStatus[0].value,
        product_type: productTypes[0].value,
    });

    useEffect(() => {
        if (shop) {
            form.setData({
                name: shop.name || '',
                category_id: shop.category_id || null,
                description: shop.description || '',
                status: shop.settings.status || shopStatus[0].value,
                product_type: shop.settings.product_type || productTypes[0].value,
            });
        } else {
            form.reset();
        }

        form.clearErrors
    }, [shop]);


    useEffect(() => {
        if (!open) {
            form.clearErrors();
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (method === "PUT") {
            form.transform((data) => ({ ...data, _method: "PUT" }));
        } else {
            form.transform((data) => {
                const { _method, ...rest } = data as FormData & { _method?: string };
                return rest;
            });
        }

        form.post(submitUrl, {
            preserveScroll: 'errors',
            preserveState: true,
            except: ['categories'],
            onSuccess: () => {
                onClose();
                form.reset();
            },
            onError: (errors) => {
                if (errors.error) {
                    toast.error(
                        <div className="flex flex-col">
                            <span className="font-semibold">Erreur !</span>
                            <span className="text-sm">{errors.error}</span>
                        </div>
                    );
                }
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto" aria-describedby="address-dialog-description">
                <DialogHeader className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        {shop ? <Edit className="h-5 w-5 text-primary" /> : <PlusCircle className="h-5 w-5 text-primary" />}
                        <DialogTitle className="text-lg font-semibold">
                            {shop ? "Modifier une boutique" : "Ajouter une boutique"}
                        </DialogTitle>
                    </div>
                    <DialogDescription id="address-dialog-description" className="text-sm text-muted-foreground">
                        {shop
                            ? "Modifiez les informations de la boutique existante."
                            : "Remplissez le formulaire pour créer une nouvelle boutique."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="font-medium text-sm">Nom</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData("name", e.target.value)}
                                placeholder="Ex: ZelkaGroup"
                                className={cn("mt-1", inputClassNames())}
                            />
                            {form.errors.name && <p className="mt-1 text-xs text-red-600">
                                {form.errors.name}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="category_id" className="font-medium text-sm">Catégorie</Label>
                            <Select
                                value={String(form.data.category_id ?? '')}
                                onValueChange={(value) => form.setData("category_id", value)}
                            >
                                <SelectTrigger className={cn("mt-1", inputClassNames())}>
                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.category_id && <p className="mt-1 text-xs text-red-600">
                                {form.errors.category_id}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="product_type" className="font-medium text-sm">Type de produit</Label>
                            <Select
                                value={String(form.data.product_type ?? '')}
                                onValueChange={(value) => form.setData("product_type", value)}
                            >
                                <SelectTrigger className={cn("mt-1", inputClassNames())}>
                                    <SelectValue placeholder="Sélectionnez un type de produit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.product_type && <p className="mt-1 text-xs text-red-600">
                                {form.errors.product_type}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="status" className="font-medium text-sm">Statut</Label>
                            <Select
                                value={String(form.data.status ?? '')}
                                onValueChange={(value) => form.setData("status", value)}
                            >
                                <SelectTrigger className={cn("mt-1", inputClassNames())}>
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shopStatus.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.status && <p className="mt-1 text-xs text-red-600">
                                {form.errors.status}
                            </p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description" className="font-medium text-sm">Description</Label>
                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) => form.setData("description", e.target.value)}
                            placeholder="Décrivez votre boutique"
                            className={cn("mt-1", inputClassNames())}
                        />
                        {form.errors.description && <p className="mt-1 text-xs text-red-600">
                            {form.errors.description}
                        </p>}
                    </div>


                    {/* Actions */}
                    <DialogFooter className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="px-6 py-2"
                            onClick={() => {
                                onClose();
                                form.reset();
                            }}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" className="px-6 py-2" disabled={form.processing}>
                            {shop ? "Mettre à jour" : "Créer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
