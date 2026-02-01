import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Box, Boxes, FileQuestion, LayoutGrid, User2 } from 'lucide-react';
import AppLogo from './app-logo';
import admin from '@/routes/admin';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: admin.dashboard().url,
        icon: LayoutGrid,
    },
];

const manageNavItems: NavItem[] = [
    {
        title: 'Utilisateurs',
        href: admin.users.index().url,
        icon: User2,
    },
];

const otherNavItems: NavItem[] = [
    {
        title: 'FAQs',
        href: admin.faqs.index().url,
        icon: FileQuestion,
    },
];

const menuItems = { mainNavItems, manageNavItems, otherNavItems };

const shopMainNavItems = (slug: string): NavItem[] => [
    {
        title: 'Tableau de bord',
        href: admin.shop.dashboard(slug).url,
        icon: LayoutGrid,
    },
];

const shopCatalogueNavItems = (slug: string): NavItem[] => [
    {
        title: 'Produits',
        href: admin.shop.products.index(slug).url,
        icon: Boxes,
    },
    {
        title: 'Stocks',
        href: admin.shop.inventory.index(slug).url,
        icon: Box,
    },
];

const shopManageNavItems = (slug: string): NavItem[] => [
    {
        title: 'Utilisateurs',
        href: admin.shop.users.index(slug).url,
        icon: User2,
    },
];

const shopMenuItems = { shopMainNavItems, shopCatalogueNavItems, shopManageNavItems };

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    menuItems={menuItems}
                    shopMenuItems={shopMenuItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
