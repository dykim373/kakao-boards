'use client'
import React from 'react';

export default function Header() {
    return (
    <header
        className="body-font min-w-[416px]">
        <div className="container flex flex-row  mx-auto  p-6">
            <a
                href='/'
                className="flex title-font font-medium items-center my-0 text-[#3C1E1E] hover:opacity-70"
            >
                <img src='/charactor_01.png' className='w-[60px]'></img>
                <span className="ml-2 text-3xl text-inherit tracking-widest">kakao</span>
                <span className="ml-2 font-bold text-3xl text-inherit tracking-widest">Boards</span>
            </a>
        </div>
    </header>
    )
}