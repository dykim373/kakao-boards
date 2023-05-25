'use client'
import React, { useState, useEffect } from 'react';

export default function HomeAuthWelcome() {
    const [username, setUsername] = useState('');
    const [iconNum, seticonNum] = useState('1');
    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        seticonNum(localStorage.getItem("iconNum"));
    },[]);

    const getLogout = () => { //로그아웃
        localStorage.clear();
        location.reload();
    }

    return (
    <div
        id='authWelcome'
        className='flex flex-col h-full justify-center'
    >
        <div className='flex flex-row border-y-[3px] border-[#FFD701] py-[6px]'>
            <a
                id='userIcon'
                href='/user'
                className='my-auto'>
                <img
                    src={iconNum === null? '':`./charactor_0${iconNum}.png`}
                    className='w-[50px]'
                ></img>
            </a>
            <div
                id='userText'
                className='ml-3 my-auto'
            >
                <div className='text-xl'>
                    <a
                        href='/user'
                        className="font-bold hover:underline"
                    >{username}</a>
                    <span>님</span>
                </div>
                <div className='text-md'>
                    <span>반갑습니다</span>
                </div>
            </div>
            <button
                onClick={getLogout}
                className='ml-auto mb-auto bg-[#edebeb] hover:bg-[#e1e1e1] px-[10px] py-[6px] rounded-full text-xs'
            >로그아웃</button>
        </div>
    </div>
    )
}