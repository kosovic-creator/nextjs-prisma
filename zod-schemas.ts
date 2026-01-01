import { z } from 'zod';

type TranslateFn = (key: string) => string;

export const korisnikSchema = (t: TranslateFn) => z.object({
    ime: z.string().min(4, { message: t('login.ime_error') }),
    email: z.string().email({ message: t('login.email_error') }),
    lozinka: z.string().min(6, { message: t('login.lozinka_error') }),
});


