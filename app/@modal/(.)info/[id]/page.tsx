import Modal from './Modal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

export default async function ModalPage({ params }) {
    const mongoId = params.id
    const session = await getServerSession(authOptions)

    return (<Modal mongoId={mongoId} session={session} origin="home" />);
}