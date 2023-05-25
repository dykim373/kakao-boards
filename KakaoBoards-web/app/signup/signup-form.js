'use client'
import { useRouter } from 'next/navigation'; //next 13버전에서 router => navigation으로 바뀜
import React, { useEffect, useState } from 'react';

export default function LoginForm() {
    const signUpURL = 'http://localhost:3000/auth/signup'
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [username, setUsername] = useState('');
    //로그인 실패 시 애니메이션 (에러메세지 fade-out)
    const [idError, setIdError] = useState('text-transparent');
    const [passwordCheckError, setPasswordCheckError] = useState('text-transparent');
    const router = useRouter();
    //로그인 = true 인 상태에서 들어오면 홈으로 튕겨냄
    useEffect(() => { 
        const loginState = localStorage.getItem("loginState");
        if(loginState) {
            router.push('/');
        }
    },[]);

    const handleSignUp = async(event) => {
        event.preventDefault();
        //Error message 초기화
        setIdError('text-transparent');
        setPasswordCheckError('text-transparent');
        checkPasswordMatch();
    }

    const checkPasswordMatch = async() => {
        if(password === passwordCheck) {
            tryToSignUp();
        } else {
            //setPasswordCheckError('text-transparent')와 동기적으로 실행하기 위하여, 10ms를 기다린다.
            setTimeout(() => {
                setPasswordCheckError("text-red-500 fade-out"); //Error message Fade-out
            },10);
        }
    }

    const tryToSignUp = async() => {
        try {
            const response = await fetch(signUpURL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    password: password,
                    username: username, }),
            });
            const Data = await response.json(); // userData or errorData(->undefined)
            if(Data.userId) {
                router.push('/signin');
            } else {
                //fetch 함수 때문에 Error message 초기화 함수와 동기적으로 실행됨.
                setIdError("text-red-500 fade-out"); //Error message Fade-out
            }
        } catch {
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
                id="SignupForm"
                className='flex flex-col  mx-auto my-4 md:my-12 lg:my-24  p-5 md:p-8 lg:p-11  w-[550px]
                bg-white rounded-sm border-y-[3px] border-y-[#FFD701] border-x border-x-gray-300'
            >
                <form onSubmit={handleSignUp}>
                    <div className="relative mb-5">
                        <label
                            htmlFor="username"
                            className='ml-3 text-sm font-semibold'
                        >이름</label>
                        <input 
                            className='w-full bg-white rounded-sm text-base text-gray-700 py-1 px-3 leading-8
                            border border-gray-300 focus:border-[#FFD701] focus:ring-2 focus:ring-[#ffd9017e]
                            transition-colors duration-200 ease-in-out outline-none'
                            id="username" 
                            type="text"
                            value={username}
                            placeholder="2-20 Write your name."
                            required
                            minLength={2}
                            maxLength={20}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="relative mb-2">
                        <label
                            htmlFor="userId"
                            className='ml-3 text-sm font-semibold'
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
                            onChange={event => setUserId(event.target.value)}
                        />
                        <p
                            className={`${idError} ml-3 mt-1 text-sm`}
                        >이미 존재하는 아이디입니다</p>
                    </div>
                    <div className="relative mb-2">
                        <label
                            htmlFor="password"
                            className='ml-3 text-sm font-semibold'
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
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="relative mb-2">
                        <label
                            htmlFor="password"
                            className='ml-3 text-sm font-semibold'
                        >비밀번호 확인</label>
                        <input 
                            className='w-full bg-white rounded-sm text-base text-gray-700 py-1 px-3 leading-8
                            border border-gray-300 focus:border-[#FFD701] focus:ring-2 focus:ring-[#ffd9017e]
                            transition-colors duration-200 ease-in-out outline-none'
                            id="checkPassword"
                            type="password"
                            value={passwordCheck}
                            placeholder="8-20 English & Number"
                            required
                            minLength={8}
                            maxLength={20}
                            pattern='^[a-zA-Z0-9]*$'
                            onChange={event => setPasswordCheck(event.target.value)}
                        />
                        <p
                            className={`${passwordCheckError} ml-3 mt-1 text-sm`}
                        >비밀번호가 일치하지 않습니다</p>
                    </div>
                    <button
                        className="mt-2 w-full rounded-sm border-0 py-2 px-8 text-lg tracking-widest
                        bg-[#FFD701] hover:bg-[#efcb00] focus:bg-[#caab00]"
                        type="submit"
                    >회원가입</button>
                </form>
            </div>

        </div>
    </section>
    );
}