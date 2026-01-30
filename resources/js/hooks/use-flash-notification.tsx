import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner'; // or 'react-hot-toast' / 'react-toastify'

// Define the shape of your flash data
interface FlashMessages {
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
}

export const useFlashNotifications = () => {
    const { flash } = usePage<{ flash: FlashMessages }>().props;

    useEffect(() => {
        const types: Array<keyof FlashMessages> = ['success', 'warning', 'error', 'info'];

        types.forEach((type) => {
            if (flash[type]) {
                const title = {
                    success: 'Succès !',
                    warning: 'Avertissement !',
                    error: 'Erreur !',
                    info: 'Info !',
                }[type];

                toast[type](
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{title}</span>
                        <span className="text-sm text-muted-foreground">
                            {flash[type]}
                        </span>
                    </div>
                );
            }
        });
    }, [flash]);
};
