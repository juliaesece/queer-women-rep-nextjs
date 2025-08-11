'use server';

import { revalidateTag } from 'next/cache';

// Revalidate the entire 'couples' collection
export async function revalidateAllCouplesAction() {
    try {
        revalidateTag('couples');
        console.log('✅ Successfully revalidated tag: couples');
    } catch (error) {
        console.error('Error revalidating all couples:', error);
    }
}

// Revalidate a single couple by its ID
export async function revalidateCoupleByIdAction(formData: FormData) {
    const coupleId = formData.get('coupleId') as string;

    if (!coupleId) {
        return { success: false, message: 'Couple ID is required.' };
    }

    const tag = `couple:${coupleId}`;
    try {
        revalidateTag(tag);
        console.log(`✅ Successfully revalidated tag: ${tag}`);
        return
    } catch (error) {
        console.error(`Error revalidating tag ${tag}:`, error);
        return
    }
}