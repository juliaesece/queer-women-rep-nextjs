import Modal from './Modal';
import { ModalSkeleton } from './ModalSkeleton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import { Suspense } from 'react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: PageProps) {
    const mongoId = (await params).id
    const session = await getServerSession(authOptions)

    return (
        <Suspense fallback={<ModalSkeleton />}>
            <Modal mongoId={mongoId} session={session ?? undefined} origin="home" />
        </Suspense>);
}