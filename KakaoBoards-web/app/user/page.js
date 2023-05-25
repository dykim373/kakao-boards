'use client'
import { useRouter } from "next/navigation";

export default function User() {
    const router = useRouter();

    const getLogout = () => { //로그아웃
        localStorage.clear();
        router.push('/');
    }
    return (
    <button onClick={getLogout}>로그아웃</button>
    )
}