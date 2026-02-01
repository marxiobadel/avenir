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
    name: string;
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

export interface AttributeOption {
    id: number;
    name: string;
}

export interface Attribute {
    id: number;
    name: string;
    type: string;
    options: AttributeOption[];
}

export interface VariantOption {
    attribute_id: number;
    attribute_option_id: number;
    attribute: string;
    option: string;
}

export interface Variant {
    id: number;
    sku: string;
    price: number;
    quantity: number;
    is_default: boolean;
    image: string | null;
    options: VariantOption[];
}

export interface ProductImage {
    id: number;
    url: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;

    origin: string;

    // Prices
    base_price: number;
    quantity: number;

    weight: number;
    height: number;
    width: number;
    length: number;

    // Content
    description: string | null;

    // SEO
    short_description?: string;
    tags?: string;

    // Status
    status: 'published' | 'draft' | string;

    is_favorited?: boolean;

    // Images
    default_image_id: number | string;
    default_image: string | null;
    images: ProductImage[];

    // Relations
    categories: Category[];
    attributes: Attribute[];
    variants: Variant[];

    created_at: string;
    updated_at: string;
}

export interface StockMovement {
    id: number;
    quantity: number;
    type: string;
    stock_before: number;
    stock_after: number;
    note?: string;
    created_at: string;
    user?: User;
    product: Product;
    variant?: {
        id: number;
        name: string;
        sku: string;
    };
    reference?: {
        type: string;
        id: number;
        label: string;
        route_name?: string;
    };
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    variant_id: number | null;
    name: string | null;
    variant: VariantOption[] | null;
    product: Product | null;
    price: number;
    quantity: number;
    total: number;
    image: string | null;
}

export interface Cart {
    id: number;
    user_id: number | null;
    items: CartItem[];
    total_qty: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    variant_id: number | null;
    product: Product;
    variant: VariantOption[] | null;
    price: number;
    quantity: number;
    total: number;
    image: string | null;
}

export interface Order {
    id: number;
    user_id: number | null;
    user: User;
    carrier_id: number | null;
    carrier: Carrier | null;
    status: string;
    total: number;

    items: OrderItem[];
    payments: Payment[];

    shipping_address: Address | Record<string, any> | null;
    invoice_address: Address | Record<string, any> | null;

    created_at: string;
    updated_at: string;
}

export interface Payment {
    id: number;

    // Relations
    order_id: number;
    user_id?: number | null;

    // Identifiers
    reference?: string | null;
    transaction_id?: string | null;

    // Payment details
    method: string;       // e.g. "credit_card", "om", "momo"
    provider?: string | null;

    // Financial
    amount: number;
    currency: string;     // e.g. "XAF"

    // Status
    status: "pending" | "completed" | "failed" | "refunded" | "cancelled";

    // Gateway raw data
    details?: any;

    // Dates
    paid_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
