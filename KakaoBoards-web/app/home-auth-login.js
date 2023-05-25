'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomeAuthLogin() {
    const router = useRouter();

    return (
    <div
        id='authLogin'
        className='flex flex-col w-full h-full justify-end'
    >
        <button
            onClick={() => {router.push('/signin')}}
            className="mb-2 w-full rounded-sm border-0 py-4 px-8 text-lg tracking-widest font-bold
            bg-[#FFD701] hover:bg-[#efcb00] focus:bg-[#caab00]"
        >로그인</button>
        <div
            className='flex flex-row mx-3 justify-between mb-[11px]'
        >
            <span
                className="text-sm"
            >계정이 없으신가요?</span>
            <a
                href='/signup'
                className="text-sm hover:underline focus:opacity-70"
            >회원가입</a>
        </div>
    </div>
    )
}