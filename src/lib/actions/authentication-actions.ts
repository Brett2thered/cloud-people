'use server';
import { redirect } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { User } from '@supabase/supabase-js';

import { createClient } from '@lib/supabase/server';
import { CONFIG } from '@config/constants';

const { API: { ENDPOINTS } } = CONFIG;

export const isLoggedIn = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect(ENDPOINTS.Login);
    }
};

export const loginOrSignUp = async (formData: FormData) => {
    const emailRedirectTo = (await headers()).get('origin') ?? '/';
    const supabase = await createClient();
    const email = DOMPurify.sanitize(formData.get('email') as string);
    // const agreement = DOMPurify.sanitize(formData.get('agreement') as string);

    // TODO: uncomment when agreement policy is in place
    // if (!agreement) {
    //     return redirect('/login?message=You need to agree to our terms and conditions');
    // }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo
        }
    });

    if (error) {
        redirect(`${ENDPOINTS.Login}?message=Could not authenticate user`);
    }

    redirect(`${ENDPOINTS.Login}?message=Check your email to continue logging in`);
};

export const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: 'local' });
    revalidatePath(ENDPOINTS.Home, 'layout');
    redirect(ENDPOINTS.Login);
};

export const authCheck = async (): Promise<User> => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    return user;
};

export const refreshSession = async () => {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        throw new Error('Session refresh failed');
    }

    return session;
};
