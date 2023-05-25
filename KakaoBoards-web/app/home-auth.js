'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeAuthLogin from './home-auth-login';
import HomeAuthWelcome from './home-auth-welcome';

export default function HomeAuth() {
    const router = useRouter();

    const [login, setLoginForm] = useState('hidden');
    const [welcomeUser, setWelcomeUser] = useState('hidden');
    useEffect(() => { //매 번 로그인 상태 확인 후, 적절한 요소를 띄워줌
        const loginState = localStorage.getItem("loginState");
        if(loginState) {
            setWelcomeUser('');
        } else {
            setLoginForm('');
        }
    },[]);

    return (
    <div
        id='homeAuth'
        className='lg:w-[350px] md:w-[300px] md:min-w-[300px] md:m-0
        min-w-[400px] w-full mx-2 mb-2 text-[#3C1E1E]
        h-[180px] px-8 py-6 bg-white border border-[#CCD0D4] ring-[1px] ring-[#ccd0d453]'
    >
        <div className={`${login} h-full`}>
            <HomeAuthLogin/>
        </div>
        <div className={`${welcomeUser} h-full`}>
            <HomeAuthWelcome/>
        </div>
    </div>
    )
}