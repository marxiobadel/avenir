import { Head, useForm as useInertiaForm } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { BreadcrumbItem, Country } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { userRoles } from "@/data";
import admin from "@/routes/admin";
import { UserForm, UserInput } from "./components/user-form"; // Import new component

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Tableau de bord", href: admin.dashboard().url },
    { title: "Liste des utilisateurs", href: admin.users.index().url },
    { title: "Ajouter un utilisateur", href: '#' },
];

interface PageProps {
    countries: Country[];
}

export default function Create({ countries }: PageProps) {
    const isMobile = useIsMobile();

    const initialInputs: UserInput = {
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        role_name: userRoles[0].value,
        is_active: true,
        email: '',
        password: '',
        password_confirmation: '',
        addresses: []
    };

    // React Hook Form
    const form = useForm<Partial<UserInput>>({ defaultValues: { ...initialInputs } });

    // Inertia Form
    const {
        post,
        data,
        processing,
        errors,
        setData,
    } = useInertiaForm<UserInput>({ ...initialInputs });

    const onSubmit = () => {
        post(admin.users.store().url, {
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
            <Head title="Ajouter un utilisateur" />
            <div className="p-4 sm:p-6 lg:p-8 ">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Créer un nouveau utilisateur
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Remplissez les informations générales suivantes
                    </p>
                </div>

                <UserForm
                    mode="create"
                    form={form}
                    countries={countries}
                    onSubmit={onSubmit}
                    inertiaData={data}
                    inertiaErrors={errors}
                    inertiaProcessing={processing}
                    inertiaSetData={setData}
                />
            </div>
        </AppLayout >
    );
}
