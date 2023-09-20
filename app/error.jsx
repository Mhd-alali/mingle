'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ErrorPage({ error, reset }) {
    const router = useRouter();

    return <div className='flex flex-col gap-6 items-center justify-center h-screen'>
        <p className='text-3xl'>{".·´¯`(>▂<)´¯`·. "}</p>
        <p className='text-2xl max-w-2xl'>
            An unexpected error accrued: <span className='text-red-800 dark:text-red-600'> {error.message}</span>
        </p>
        <div className="space-x-6">
            <Button size='lg' onClick={reset}>Try again</Button>
            <Button size='lg' variant='outline' onClick={() => { router.push('/'); }}>go to Home</Button>
        </div>
    </div>;
}