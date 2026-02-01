import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { BreadcrumbItem, Country, User } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import admin from "@/routes/admin";
import { UserForm, UserInput } from "./components/user-form";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Tableau de bord", href: admin.dashboard().url },
    { title: "Liste des utilisateurs", href: admin.users.index().url },
    { title: "Modifier un utilisateur", href: '#' },
];

interface EditProps {
    user: User;
    countries: Country[];
}

export default function Edit({ user, countries }: EditProps) {
    const isMobile = useIsMobile();

    const initialInputs: Partial<UserInput> = {
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        phone: user.phone || '',
        address: user.address || '',
        role_name: user.roles[0] || '',
        is_active: user.is_active || true,
        email: user.email || '',
        addresses: user.addresses?.map((address) => ({
            id: address.id,
            alias: address.alias ?? '',
            name: address.name ?? '',
            phone: address.phone ?? '',
            address: address.address ?? '',
            city: address.city ?? '',
            state: address.state ?? '',
            postal_code: address.postal_code ?? '',
            country_id: address.country_id != null ? String(address.country_id) : "",
            is_default: address.is_default
        })) ?? [],
    };

    const form = useForm<Partial<UserInput>>({ defaultValues: { ...initialInputs } });

    const {
        put,
        data,
        processing,
        errors,
        setData,
    } = useInertiaForm<Partial<UserInput>>({ ...initialInputs });

    const onSubmit = () => {
        put(admin.users.update(user.id).url, {
            preserveState: true,
            preserveScroll: 'errors',
            onError: (errors) => {
                const msg = errors.error ? errors.error : `Une erreur est survenue, vérifiez le formulaire.`;
                toast.error('Erreur !', { description: msg });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={isMobile ? [] : breadcrumbs}>
            <Head title="Modifier un utilisateur" />
            <div className="p-4 sm:p-6 lg:p-8 ">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Modifier un utilisateur
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Revoir les informations générales suivantes
                    </p>
                </div>

                <UserForm
                    mode="edit"
                    form={form}
                    countries={countries}
                    onSubmit={onSubmit}
                    inertiaData={data}
                    inertiaErrors={errors}
                    inertiaProcessing={processing}
                    inertiaSetData={setData}
                />
            </div>
        </AppLayout>
    );
}
