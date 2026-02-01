import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginationMeta, Faq } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2, Plus, Search, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { FaTimesCircle } from 'react-icons/fa';
import { dateTimeFormatOptions } from '@/lib/utils';
import admin from '@/routes/admin';
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog';
import DataTablePagination from '@/components/datatable-pagination';
import DataTable from '@/components/datatable';
import FaqForm from './form';
import { useFlashNotifications } from '@/hooks/use-flash-notification';

interface PageProps {
    faqs: {
        data: Faq[];
        meta: PaginationMeta;
    };
    filters: {
        search?: string;
        status?: string;
        sort?: string;
        per_page?: number;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: admin.dashboard().url },
    { title: "Questions fréquemment posées", href: '#' },
];

export default function Index({ faqs, filters }: PageProps) {
    const isMobile = useIsMobile();

    const [search, setSearch] = useState(filters.search ?? "");
    const [sort, setSort] = useState("");
    const [perPage, setPerPage] = useState<number>(filters.per_page ?? 10);
    const [deleteFaq, setDeleteFaq] = useState<Faq | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const [creatingFaq, setCreatingFaq] = useState(false);
    const [editingFaq, setEditingFaq] = useState<Faq | null>(null);

    const toggleSort = (column: keyof Faq) => {
        let dir: "asc" | "desc" | "" = "asc";
        if (sort === column) dir = "desc";
        else if (sort === "-" + column) dir = "";
        const newSort = dir === "" ? "" : dir === "desc" ? "-" + column : String(column);
        setSort(newSort);
        applyFilters({ sort: newSort });
    }

    const applyFilters = (newFilters: Partial<PageProps["filters"]> & { page?: number }) => {
        router.get(admin.faqs.index().url, {
            search,
            sort,
            per_page: perPage,
            page: faqs.meta.current_page,
            ...newFilters,
        }, { preserveState: true, replace: true });
    }

    const handleEdit = (faq: Faq) => setEditingFaq(faq);

    const handleDelete = (faq: Faq) => {
        setDeleteFaq(faq);
        setIsDialogOpen(true);
    };

    const handleBulkDelete = () => {
        if (Object.keys(rowSelection).length > 0) {
            setDeleteFaq(null);
            setIsDialogOpen(true);
        }
    };

    const columns = useMemo<ColumnDef<Faq>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                                ? "indeterminate"
                                : false
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                />),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "question",
            header: () => (
                <Button variant="ghost" onClick={() => toggleSort("question")}>
                    Question <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div
                    style={{
                        width: 400,
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                    }}
                >{row.original.question}</div>
            ),
        },
        {
            accessorKey: "answer",
            header: 'Réponse',
            cell: ({ row }) => {
                if (!row.original.answer)
                    return <span className="text-muted-foreground italic">Aucune réponse</span>
                return (
                    <div
                        style={{
                            maxWidth: 400,
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                        }}
                    >
                        {row.original.answer}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: "Statut",
            cell: ({ row }) => {
                if (row.original.status)
                    return <CheckCircle size={18} className={`text-green-600`} />
                else
                    return <FaTimesCircle size={18} className={`text-red-600`} />
            }
        },
        {
            accessorKey: "created_at",
            header: () => (
                <Button variant="ghost" onClick={() => toggleSort("created_at")}>
                    Créé le <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.original.created_at);
                return date.toLocaleString("fr-FR", dateTimeFormatOptions);
            }
        },
        {
            accessorKey: "updated_at",
            header: () => (
                <Button variant="ghost" onClick={() => toggleSort("updated_at")}>
                    Modifié le <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.original.updated_at);
                return date.toLocaleString("fr-FR", dateTimeFormatOptions);
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTimeout(() => handleEdit(row.original), 100)}>
                            <Edit className="mr-1 h-4 w-4" /> Éditer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeout(() => handleDelete(row.original), 100)}>
                            <Trash2 className="mr-1 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }
    ], [sort]);

    const table = useReactTable({
        data: faqs.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { rowSelection },
        onRowSelectionChange: setRowSelection,
    });

    const handleRowSelectionChange = (updaterOrValue: Record<string, boolean> | ((old: Record<string, boolean>) => Record<string, boolean>)) => {
        const newValue = typeof updaterOrValue === "function" ? updaterOrValue(rowSelection) : updaterOrValue;
        setRowSelection(newValue);
    };

    useFlashNotifications();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQs" />
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex justify-end flex-wrap">
                    <Button
                        className="ml-2"
                        onClick={() => setCreatingFaq(true)}
                    >
                        <Plus className="h-4 w-4" /> Ajouter une faq
                    </Button>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">FAQs</h1>
                        <p className="text-sm text-muted-foreground">Gérez les préoccupations des clients.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className='relative'>
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={isMobile ? "Rechercher..." : "Rechercher une faq..."}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && applyFilters({ page: 1 })}
                                className="px-8 flex-1 md:w-[260px] text-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-transparent"
                            />
                        </div>
                        {Object.keys(rowSelection).length > 0 && (
                            <Button variant="destructive" onClick={handleBulkDelete}>
                                <Trash2 className="mr-1 h-4 w-4" /> Supprimer {Object.keys(rowSelection).length}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <DataTable<Faq>
                    data={faqs.data}
                    columns={columns}
                    rowSelection={rowSelection}
                    onRowSelectionChange={handleRowSelectionChange}
                    emptyMessage="Aucune faq trouvée."
                />

                {/* Pagination */}
                <DataTablePagination
                    meta={faqs.meta}
                    perPage={perPage}
                    onPageChange={(page) => applyFilters({ page })}
                    onPerPageChange={(val) => {
                        setPerPage(val);
                        applyFilters({ per_page: val, page: 1 });
                    }}
                />
            </div>
            <FaqForm
                open={creatingFaq || !!editingFaq}
                onClose={() => {
                    setCreatingFaq(false);
                    setEditingFaq(null);
                }}
                faq={editingFaq}
                submitUrl={
                    editingFaq
                        ? admin.faqs.update(editingFaq.id).url
                        : admin.faqs.store().url
                }
                method={editingFaq ? "PUT" : "POST"}
            />
            {/* AlertDialog */}
            <ConfirmDeleteDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Confirmer la suppression"
                message={deleteFaq
                    ? `Voulez-vous vraiment supprimer ${deleteFaq.question} ? Cette action est irréversible.`
                    : `Voulez-vous vraiment supprimer ${Object.keys(rowSelection).length} FAQ(s) ? Cette action est irréversible.`}
                onConfirm={() => {
                    const ids = deleteFaq ? [deleteFaq.id]
                        : Object.keys(rowSelection).map(k => {
                            const row = table.getRowModel().rows[Number(k)];
                            return row.original.id;
                        });

                    if (ids.length === 0) return;

                    router.post(
                        admin.faqs.destroy().url, { ids },
                        {
                            preserveState: true,
                            onError: (errors) => {
                                toast.error(
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground">Erreur</span>
                                        <span className="text-sm text-muted-foreground">
                                            {errors.error ?? errors.message ?? "Une erreur est survenue lors de la suppression."}
                                        </span>
                                    </div>
                                );
                            },
                        }
                    );
                    setRowSelection({});
                    setDeleteFaq(null);
                    setIsDialogOpen(false);
                }}
            />
        </AppLayout >
    );
}
