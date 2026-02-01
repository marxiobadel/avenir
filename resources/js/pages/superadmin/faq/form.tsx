import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit } from "lucide-react";
import type { Faq } from "@/types";
import { useForm } from "@inertiajs/react";
import { cn, inputClassNames } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

type FormProps = {
    open: boolean;
    onClose: () => void;
    faq: Faq | null;
    submitUrl: string;
    method: "POST" | "PUT";
};

export type FaqFormData = {
    question: string;
    answer: string;
    status: boolean;
    _method?: string;
};

export default function FaqForm({ open, onClose, faq, submitUrl, method }: FormProps) {
    const form = useForm<FaqFormData>({
        question: "",
        answer: "",
        status: true
    });

    useEffect(() => {
        if (faq) {
            form.setData({
                question: faq.question || '',
                answer: faq.answer || '',
                status: faq.status,
            });
        } else {
            form.reset();
        }

        form.clearErrors();
    }, [faq]);

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
                const { _method, ...rest } = data as FaqFormData & { _method?: string };
                return rest;
            });
        }

        form.post(submitUrl, {
            preserveScroll: 'errors',
            preserveState: true,
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
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" aria-describedby="address-dialog-description">
                <DialogHeader className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        {faq ? <Edit className="h-5 w-5 text-primary" /> : <PlusCircle className="h-5 w-5 text-primary" />}
                        <DialogTitle className="text-lg font-semibold">
                            {faq ? "Modifier une FAQ" : "Ajouter une FAQ"}
                        </DialogTitle>
                    </div>
                    <DialogDescription id="address-dialog-description" className="text-sm text-muted-foreground">
                        {faq
                            ? "Modifiez les informations de la FAQ existante."
                            : "Remplissez le formulaire pour créer un nouvelle FAQ."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* User Select (Combobox) */}

                    <div>
                        <Label htmlFor="question" className="font-medium text-sm">Question</Label>
                        <Input
                            id="question"
                            value={form.data.question}
                            onChange={(e) => form.setData("question", e.target.value)}
                            onFocus={() => form.clearErrors('question')}
                            placeholder="Entrez la question"
                            className={cn("mt-1", inputClassNames())}
                        />
                        {form.errors.question && (
                            <p className="mt-1 text-xs text-red-600">{form.errors.question}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="answer" className="font-medium text-sm">Réponse</Label>
                        <Textarea
                            id="answer"
                            value={form.data.answer}
                            onChange={(e) => form.setData("answer", e.target.value)}
                            className={cn("mt-1", inputClassNames())}
                            onFocus={() => form.clearErrors('answer')}></Textarea>
                        {form.errors.answer && (
                            <p className="mt-1 text-xs text-red-600">{form.errors.answer}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="status"
                            checked={form.data.status}
                            onCheckedChange={(checked) => form.setData("status", checked)}
                        />
                        <Label htmlFor="status">Statut</Label>
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
                            {faq ? "Mettre à jour" : "Créer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
