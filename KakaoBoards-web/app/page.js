'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeAuth from './home-auth';
import HomeBoards from './home-boards';

export default function Home() {
    /* 
    useState : 마운트 될 때 사라짐, 값 변경 시 리랜더링
    
    컴포넌트 내에서 반응성 동적 효과 처리
    => useState로 처리 가능, 마운트 시 초기화됨
    
    웹사이트 전반적인 상태 처리 (로그인 상태, 유저 정보)
    => 페이지 이동 시 locaStorage로 1차 처리
    => 새고로침 시, useEffect로 2차 처리
    */
    const getCurrentUserURL = 'http://localhost:3000/auth/current'

    useEffect(() => { //새로고침 시, 토큰 유효성 확인
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken && accessToken !== 'undefined') {
            checkToken();
        }
    },[]);

    const checkToken = async() => { //토큰 유효성 확인
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(getCurrentUserURL, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${accessToken}`, //토큰 제출하여 유저 데이터 요청하기
                }
            });
            if(response.statusText === 'Unauthorized') {
                getLogout();
            }
        } catch {
            console.log('Error');
        }
    }

    const getLogout = () => { //로그아웃
        localStorage.clear();
        location.reload();
    }
    
    return (
    <section className='flex flex-col'>
        <div id='homeBgImage' className='w-full bg-[#FFD701] min-w-[416px]'>
            <img src='./HomeBackground-01.png' className='w-full mx-auto max-w-[1200px]'/>
        </div>
        <div className='bg-[#F8F8F8]'>
            <div
                id='contents'
                className='container flex mx-auto md:flex-nowrap flex-wrap py-2 px-[3.5%]'
            >
                <HomeAuth/>
                <HomeBoards/>
            </div>
        </div>
    </section>
    )
}