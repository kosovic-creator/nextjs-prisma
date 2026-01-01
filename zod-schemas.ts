import { z } from 'zod';

type TranslateFn = (key: string) => string;

export const korisnikSchema = (t: TranslateFn) => z.object({
    ime: z.string().min(4, { message: t('login.ime_error') }),
    email: z.string().email({ message: t('login.email_error') }),
    lozinka: z.string().min(6, { message: t('login.lozinka_error') }),
});

export const postSchema = (t: TranslateFn) => z.object({
    title: z.string().min(3, { message: t('title_error') }).max(200, { message: t('title_max_error') }),
    content: z.string().min(10, { message: t('content_error') }).max(5000, { message: t('content_max_error') }),
});


