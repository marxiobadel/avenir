import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    isAdminSection: boolean;
    flash: {
        info: string | null;
        success: string | null;
        error: string | null;
        warning: string | null;
    };
    defaultCurrency: string;
    [key: string]: unknown;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    phone: string;
    address: string;
    roles: string[];
    email: string;
    avatar_url?: string;
    email_verified_at: string | null;
    is_active: boolean;
    two_factor_enabled?: boolean;
    country: Country | null;
    addresses: Address[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Country {
    id: number;
    name: string;
    iso: string;
    iso3: string;
    phonecode: string;
    capital: string;
    region: string;
    subregion: string;
    latitude: string;
    longitude: string;
    emojiU: string;
    [key: string]: unknown;
}

export interface Address {
    id: number;
    alias: string;
    address: string;
    firstname: string;
    lastname: string;
    phone: string;
    city: string;
    street: string;
    state: string;
    postal_code: string;
    country: Country;
    country_id: string | number | null;
    user: User;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Category {
    id: number;
    slug: string;
    name: string;
    type: string;
    cover_url: string;
    status: boolean;
    shops: Product[];
    products: Product[];
    events: Product[];
    parent_id: number | null;
    parent: Category; // For nested categories
    created_at: string;
    updated_at: string;
}

export interface SocialLinks {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    [key: string]: string;
}

export interface OpeningHours {
    [key: string]: {
        open: string;  // ex: "08:00"
        close: string; // ex: "18:00"
        closed: boolean;
    };
}

export type StatusValue = 'draft' | 'published' | string;

export interface Shop {
    id: number;
    name: string;
    slug: string;
    slogan: string | null;
    description: string | null;

    // Relation (Optionnelle selon le chargement API)
    created_by?: User;

    contact: {
        email: string | null;
        phone: string | null;
        website: string | null;
        social_links: SocialLinks | null;
    };

    location: {
        address: string | null;
        city: string | null;
        postal_code: string | null;
        coordinates: {
            latitude: string | null;
            longitude: string | null;
        };
    };

    settings: {
        is_featured: boolean;
        is_active: boolean;
        status: StatusValue;
        rating: number;
    };

    opening_hours: OpeningHours | null;

    created_at: string;
    updated_at: string;
}
