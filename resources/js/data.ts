import { StatusValue } from "./types";


export interface StatusOption {
    label: string;
    value: StatusValue;
    color: string;
}

export const languageOptions = [
    { iso: "EN", name: "Anglais" },
    { iso: "FR", name: "Français" },
];

export const productStatus: StatusOption[] = [
    { label: "Brouillon", value: 'draft', color: 'bg-gray-500' },
    { label: "Publié", value: 'published', color: 'bg-emerald-500' },
];

export const shopStatus: StatusOption[] = [...productStatus];

export const fonts = ["Arial", "Georgia", "Times New Roman", "Courier New"];

export const pricingTypes = [
    { label: "Prix fixe", value: "fixed" },
    { label: "Par poids", value: "weight" },
    { label: "Par prix de commande", value: "price" },
    { label: "Par volume", value: "volume" },
];

export const colorMap: Record<string, string> = {
    pending: "bg-gray-200 text-gray-800",
    processing: "bg-blue-100 text-blue-800",
    packing: "bg-blue-200 text-blue-900",
    awaiting_pickup: "bg-orange-100 text-orange-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    in_transit: "bg-purple-100 text-purple-800",
    at_hub: "bg-violet-100 text-violet-800",
    out_for_delivery: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",

    delivery_issue: "bg-red-100 text-red-800",
    wrong_address: "bg-red-200 text-red-900",
    recipient_absent: "bg-orange-200 text-orange-900",
    returned: "bg-pink-200 text-pink-900",

    completed: "bg-green-200 text-green-900",
    cancelled: "bg-red-300 text-red-900",
};

export const orderDeliveryStatus = [
    { label: "En attente de paiement", value: "pending" },
    { label: "En traitement", value: "processing" }, // Le paiement est validé. L'entrepôt reçoit l'ordre de commande.
    { label: "En préparation", value: "packing" }, // L'équipe logistique est en train d'emballer les produits (mise en carton).
    { label: "En attente de ramassage", value: "awaiting_pickup" }, // Le colis est prêt, étiqueté et attend que le transporteur (ex: DHL, La Poste) vienne le chercher à l'entrepôt.
    { label: "Pris en charge par le transporteur", value: "picked_up" }, // Le transporteur a scanné le colis et l'a récupéré.
    { label: "En transit", value: "in_transit" }, // Le colis voyage entre deux centres ou vers la ville de destination.
    { label: "Arrivé au centre de distribution", value: "at_hub" }, // Le colis est arrivé dans un centre de tri régional ou local.
    { label: "En cours de livraison", value: "out_for_delivery" }, // Le colis est dans le camion du livreur final ("Dernier kilomètre").
    { label: "Livré", value: "delivered" }, // Le client a reçu le colis.

    // Problèmes potentiels
    { label: "Problème de livraison", value: "delivery_issue" }, // Retard global, accident, ou problème non spécifié.
    { label: "Adresse incorrecte", value: "wrong_address" }, // Le livreur ne trouve pas le lieu.
    { label: "Destinataire absent", value: "recipient_absent" }, // Tentative de livraison échouée.
    { label: "Retourné à l'expéditeur", value: "returned" }, // Après plusieurs échecs ou refus, le colis revient chez vous.

    // Finaux
    { label: "Terminée", value: "completed" }, // La commande est close (délai de rétractation passé ou satisfaction confirmée). Souvent utilisé pour déclencher les points de fidélité.
    { label: "Annulée", value: "cancelled" }, // La commande a été stoppée avant expédition.
];

export const paymentStatus = [
    { label: "En attente", value: "pending", color: "text-amber-700 bg-amber-100" },
    { label: "Payé", value: "completed", color: "text-emerald-700 bg-emerald-100" },
    { label: "Echoué", value: "failed", color: "text-rose-700 bg-rose-100" },
    { label: "Annulé", value: "cancelled", color: "text-slate-600 bg-slate-100" },
    { label: "Retourné", value: "refunded", color: "text-violet-700 bg-violet-100" },
];

export const paymentMethods = [
    { label: "Cash (à la livraison)", value: "cash" },
    { label: "Orange Money", value: "orange_money" },
    { label: "MTN Money", value: "mtn_money" },
];

// --- Styles Helpers ---
export const movementTypeStyles: Record<string, string> = {
    sale: "bg-blue-100 text-blue-700 border-blue-200",
    restock: "bg-green-100 text-green-700 border-green-200",
    correction: "bg-orange-100 text-orange-700 border-orange-200",
    adjustment: "bg-orange-100 text-orange-700 border-orange-200",
    return: "bg-purple-100 text-purple-700 border-purple-200",
    destruction: "bg-red-100 text-red-700 border-red-200",
    initial: "bg-gray-100 text-gray-700 border-gray-200",
};

export const movementTypeLabels: Record<string, string> = {
    sale: "Vente",
    restock: "Réappro.",
    correction: "Correction",
    adjustment: "Ajustement",
    return: "Retour",
    destruction: "Destruction",
    initial: "Initial",
};
