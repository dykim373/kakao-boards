'use client'
import React, { useState, useEffect } from 'react';

export default function BoardsNav({
    boardsState, setBoardsState
}) {

    const [boardsMenu, setBoardsMenu] = useState('hidden');
    useEffect(() => { //매 번 로그인 상태 확인 후, 적절한 요소를 띄워줌
        const loginState = localStorage.getItem("loginState");
        if(loginState) {
            setBoardsMenu('');
        } else {
            setBoardsMenu('hidden');
        }
    },[]);

    return (
    <div
        id='boardsNav'
        className='flex flex-row justify-between border-b-[3px] border-[#FFD701] p-[1px]'
    >
        <p className='text-2xl font-bold tracking-widest ml-[22px] my-1'>게시판</p>
        <div className={`${boardsMenu} flex flex-row`}>
            <button
                className={`${(boardsState=='all'? 'font-extrabold':'')} mt-auto ml-2 pr-[6px]
                text-sm border-r-[1.5px] border-[#3C1E1E] hover:underline`}
                onClick={() => {setBoardsState('all')}}
            >전체</button>
            <button
                className={`${(boardsState=='private'? 'font-extrabold':'')} mt-auto pl-[6px]
                text-sm hover:underline`}
                onClick={() => {setBoardsState('private')}}
            >내 글</button>
            <button
                className={`${(boardsState=='write'? 'font-extrabold border-[1.5px] border-[#3C1E1E] px-[10.5px]':'px-[12px]')}
                my-auto text-sm ml-[18px] py-[5px] bg-[#FFD701] hover:bg-[#efcb00] rounded-sm`}
                onClick={() => {setBoardsState('write')}}
            >글쓰기</button>
        </div>
    </div>
    )
}