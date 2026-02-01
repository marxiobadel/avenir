import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Accordion } from "@/components/ui/accordion";
import { PlusCircle } from "lucide-react";
import { Country } from "@/types";
import { userRoles } from "@/data";
import AddressForm from "./address-form";

// Shared Types
export interface AddressInput {
    id?: number;
    alias: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country_id: number | string | null;
    is_default: boolean;
}

export interface UserInput {
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    role_name: string;
    is_active: boolean;
    email: string;
    password?: string;
    password_confirmation?: string;
    addresses: AddressInput[];
}

interface UserFormProps {
    form: UseFormReturn<Partial<UserInput>>;
    inertiaErrors: Partial<Record<keyof UserInput | string, string>>;
    inertiaProcessing: boolean;
    inertiaSetData: (field: keyof UserInput | string, value: any) => void;
    inertiaData: Partial<UserInput>; // Added to pass data to AddressForm
    onSubmit: () => void;
    countries: Country[];
    mode: "create" | "edit";
}

export function UserForm({
    form,
    inertiaErrors,
    inertiaProcessing,
    inertiaSetData,
    inertiaData,
    onSubmit,
    countries,
    mode
}: UserFormProps) {
    const { control, handleSubmit, clearErrors, formState: { errors: formErrors } } = form;

    // We use the hook here, using the control passed from the parent
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    // Merge errors (Prioritize Inertia server errors over client validation if needed)
    const errors = { ...formErrors, ...inertiaErrors } as any;

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-4 md:space-x-4 space-y-4"
            >
                <div className="md:col-span-2 lg:col-span-3 space-y-4">
                    <Card className="p-4 space-y-0 shadow-none">
                        <h2 className="text-xl font-semibold mb-2">Informations générales</h2>
                        <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
                            <FormFieldWrapper
                                control={control}
                                name="lastname"
                                label="Nom"
                                placeholder="Votre nom"
                                onValueChange={(value) => inertiaSetData("lastname", value)}
                                onFocus={() => clearErrors('lastname')}
                                error={errors.lastname}
                            />
                            <FormFieldWrapper
                                control={control}
                                name="firstname"
                                label="Prénom"
                                placeholder="Votre prénom"
                                onValueChange={(value) => inertiaSetData("firstname", value)}
                                onFocus={() => clearErrors('firstname')}
                                error={errors.firstname}
                            />
                        </div>
                        <FormFieldWrapper
                            control={control}
                            name="address"
                            label="Adresse"
                            placeholder="Rue Wiertz 60, B-1047 Bruxelles, Belgique"
                            onValueChange={(value) => inertiaSetData("address", value)}
                            onFocus={() => clearErrors('address')}
                            error={errors.address}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormFieldWrapper
                                control={control}
                                name="phone"
                                label="Téléphone"
                                placeholder="+237..."
                                onValueChange={(value) => inertiaSetData("phone", value)}
                                onFocus={() => clearErrors('phone')}
                                error={errors.phone}
                            />
                            <FormFieldWrapper
                                control={control}
                                name="email"
                                label="E-mail"
                                placeholder="exemple@mail.com"
                                onValueChange={(value) => inertiaSetData("email", value)}
                                onFocus={() => clearErrors('email')}
                                error={errors.email}
                            />
                        </div>

                        {/* Password fields only show in Create mode */}
                        {mode === 'create' && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormFieldWrapper
                                    control={control}
                                    type="password"
                                    name="password"
                                    label="Mot de passe"
                                    placeholder="**********"
                                    onValueChange={(value) => inertiaSetData("password", value)}
                                    onFocus={() => clearErrors('password')}
                                    error={errors.password}
                                />
                                <FormFieldWrapper
                                    control={control}
                                    type="password"
                                    name="password_confirmation"
                                    label="Confirmation du mot de passe"
                                    placeholder="**********"
                                    onValueChange={(value) => inertiaSetData("password_confirmation", value)}
                                    onFocus={() => clearErrors('password_confirmation')}
                                    error={errors.password_confirmation}
                                />
                            </div>
                        )}
                    </Card>

                    <Card className="p-4 space-y-4 shadow-none">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">Adresses</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Ces informations serviront à la livraison ou à la facturation
                            </p>
                            <Accordion type="multiple" className="space-y-2 w-full">
                                {fields.map((field, index) => (
                                    <AddressForm
                                        key={field.id}
                                        control={control}
                                        index={index}
                                        remove={remove}
                                        errors={errors}
                                        postData={inertiaData}
                                        countries={countries}
                                        setData={inertiaSetData}
                                    />
                                ))}
                            </Accordion>
                            {errors.addresses && (
                                <p className="text-red-500 text-sm mt-2">{errors.addresses}</p>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4 flex items-center gap-2"
                                onClick={() => append({
                                    alias: '',
                                    name: '',
                                    phone: '',
                                    address: '',
                                    city: '',
                                    country_id: '',
                                    state: '',
                                    is_default: false
                                })}
                            >
                                <PlusCircle className="h-4 w-4" /> Ajouter une adresse
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <Card className="p-4 shadow-none">
                        <h2 className="text-xl font-semibold mb-2">Annexe</h2>
                        <FormFieldWrapper
                            control={control}
                            name="role_name"
                            label="Rôle"
                            type="select"
                            placeholder="Choisir le rôle"
                            options={userRoles}
                            onOpenChange={() => clearErrors('role_name')}
                            onValueChange={(value) => inertiaSetData("role_name", value)}
                            error={errors.role_name}
                        />
                        <FormFieldWrapper
                            control={control}
                            name={`is_active`}
                            label="Statut actif"
                            type="switch"
                            onCheckedChange={(checked) => inertiaSetData("is_active", !!checked)}
                        />
                    </Card>
                </div>

                <Button type="submit" disabled={inertiaProcessing} className="mt-6 w-full">
                    {inertiaProcessing
                        ? (mode === 'create' ? "Enregistrement..." : "Mise à jour...")
                        : (mode === 'create' ? "Créer l'utilisateur" : "Modifier l'utilisateur")
                    }
                </Button>
            </form>
        </Form>
    );
}
