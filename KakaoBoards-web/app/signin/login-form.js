'use client'
import { useRouter } from 'next/navigation'; //next 13버전에서 router => navigation으로 바뀜
import React, { useEffect, useState } from 'react';

export default function LoginForm() {
    const signInURL = 'http://localhost:3000/auth/signin'
    const getCurrentUserURL = 'http://localhost:3000/auth/current'
    //Input 값 실시간 저장
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    //로그인 실패 시 애니메이션 (에러메세지 fade-out)
    const [inputError, setInputError] = useState('text-transparent');
    const router = useRouter();
    //로그인 = true 인 상태에서 들어오면 홈으로 튕겨냄
    useEffect(() => { 
        const loginState = localStorage.getItem("loginState");
        if(loginState) {
            router.push('/');
        }
    },[]);

    const handleSignin = async(event) => { //로그인form 제출 시 실행
        event.preventDefault(); //리렌더링(기본 동작) 금지
        setInputError('text-transparent'); //input error message 초기화
        try {
            const response = await fetch(signInURL, { //서버에 로그인 시도
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: userId,
                    password: password,
                }),
            });
            const Data = await response.json();
            localStorage.setItem("accessToken", Data.accessToken); //로컬 스토리지에 (토큰 / 'undefined') 저장
        } catch {
            console.log('Error');
        }

        const accessToken = localStorage.getItem("accessToken");
        if(accessToken !== 'undefined' && accessToken) {
            await getUserByToken();
            getLogin();
        } else {
            setInputError("text-red-600 fade-out"); //Error message Fade-out
            localStorage.clear();
        }
    }

    const getUserByToken = async() => { //토큰 유효성 확인 => 로컬 스토리지에 (유저Id,name / 'undefined') 저장
        const accessToken = localStorage.getItem("accessToken"); //로컬 스토리지에서 토큰 꺼내오기
        try {
            const response = await fetch(getCurrentUserURL, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${accessToken}`, //토큰 제출하여 유저 데이터 요청하기
                }
            });
            const currentUserData = await response.json(); //유저 데이터 받아옴
            localStorage.setItem("userId", currentUserData.userId); // userID 로컬 스토리지에 저장
            localStorage.setItem("username", currentUserData.username); // username 로컬 스토리지에 저장
            localStorage.setItem("iconNum", currentUserData.iconNum); // iconNum 로컬 스토리지에 저장
        } catch {
            console.log('Error');
        }
    }

    const getLogin = () => { //로그인 시도
        const userId = localStorage.getItem("userId");
        if(userId !== 'undefined' && userId) { //undefined가 localStorage에 문자열로 저장되서 이렇게 써야함
            localStorage.setItem("loginState", true);
            router.push('/');
        } else {
            console.log('Error');
        }
    }

    return (
    <section
        id='contentsBg'
        className='flex w-full m-0 bg-[#F8F8F8] text-[#3C1E1E]'
    >
        <div className='container mx-auto border-t border-[#3C1E1E]'>

            <div
                id="LoginForm"
                className='flex flex-col mx-auto my-10 md:my-20 lg:my-32 p-5 md:p-8 lg:p-11 w-[550px] 
                bg-white rounded-sm border-y-[3px] border-y-[#FFD701] border-x border-x-gray-300'
            >
                <div className='tracking-wider text-center mb-8'>
                    <span 
                        className=" inline text-3xl title-font"
                    >kakao</span>
                    <span 
                        className=" inline text-3xl font-bold title-font"
                    >Boards</span>
                </div>
                <form onSubmit={handleSignin}>
                    <div className="relative mb-8">
                        <label
                            htmlFor="userId"
                            className=' ml-3 text-sm font-semibold'
                        >아이디</label>
                        <input 
                            className='w-full bg-white rounded-sm text-base text-gray-700 py-1 px-3 leading-8
                            border border-gray-300 focus:border-[#FFD701] focus:ring-2 focus:ring-[#ffd9017e]
                            transition-colors duration-200 ease-in-out outline-none'
                            id="userId" 
                            type="text"
                            value={userId}
                            placeholder="8-20 English & Number"
                            required
                            minLength={8}
                            maxLength={20}
                            pattern='^[a-zA-Z0-9]*$'
                            onChange={event => setUserId(event.target.value)} //실시간 입력창 값 state에 저장
                        />
                    </div>
                    <div className="relative mb-3">
                        <label
                            htmlFor="password"
                            className=' ml-3 text-sm font-semibold'
                        >비밀번호</label>
                        <input 
                            className='w-full bg-white rounded-sm text-base text-gray-700 py-1 px-3 leading-8
                            border border-gray-300 focus:border-[#FFD701] focus:ring-2 focus:ring-[#ffd9017e]
                            transition-colors duration-200 ease-in-out outline-none'
                            id="password"
                            type="password"
                            value={password}
                            placeholder="8-20 English & Number"
                            required
                            minLength={8}
                            maxLength={20}
                            pattern='^[a-zA-Z0-9]*$'
                            onChange={event => setPassword(event.target.value)} //실시간 입력창 값 state에 저장
                        />
                    </div>
                    <p
                        className={`${inputError} ml-3 mt-0 text-sm`}
                    >아이디 또는 비밀번호가 일치하지 않습니다.</p>
                    <button
                        className="mt-2 w-full rounded-sm border-0 py-2 px-8 text-lg tracking-widest
                        bg-[#FFD701] hover:bg-[#efcb00] focus:bg-[#caab00]"
                        type="submit"
                    >로그인</button>
                </form>
                <div
                    className='flex flex-row mt-1 ml-16 mr-3 justify-between'
                >
                    <span></span>
                    <span
                        className="text-sm"
                    >계정이 없으신가요?</span>
                    <a
                        href='/signup'
                        className="text-sm  hover:underline focus:opacity-70"
                    >회원가입</a>
                </div>
            </div>

        </div>
    </section>
    );
}