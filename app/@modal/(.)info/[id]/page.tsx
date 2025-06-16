import Modal from './Modal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: PageProps) {
    const mongoId = (await params).id
    const session = await getServerSession(authOptions)

    return (<Modal mongoId={mongoId} session={session ?? undefined} origin="home" />);
}