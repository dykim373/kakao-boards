'use client'
import React, { useState, useEffect } from 'react';
import BoardsNav from './home-boards-nav';

export default function CreateBoard({
    boardsState, setBoardsState
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PUBLIC');
    const createBoardURL = 'http://localhost:3000/boards'
    
    const handleSubmitBoard = async(event) => {
        event.preventDefault(); //리렌더링(기본 동작) 금지

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(createBoardURL, { //서버에 보드 작성 요청
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ 
                    title: title,
                    description: description,
                    status: status
                }),
            });
            //아래는 '토큰 유효성 체크', '내용 체크', '글이 작성된 경우' 처리하는 로직
            if(response.statusText === 'Unauthorized') {
                getLogout();
            } else if(response.statusText === 'Created') {
                location.reload();
            } else if(response.statusText === 'Bad Request') {
                console.log('Bad Request');
            } else {
                console.log('Error');
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
    <div id='createBoard'>
        <BoardsNav
            boardsState={boardsState}
            setBoardsState={setBoardsState}
        />       
        <form onSubmit={handleSubmitBoard} className='flex flex-row h-full'>
            <div id='input' className='flex flex-col flex-grow my-3 mx-3'>
                <input
                    id='title'
                    type='text'
                    value={title}
                    required
                    placeholder={title==''? '제목을 입력하세요' : ''}
                    onChange={(event) => setTitle(event.target.value)}
                    className='border-[1px] border-[#CCD0D4] focus:border-[#3C1E1E] outline-none
                    py-2 px-[12px] text-lg'
                />
                <textarea
                    id='description'
                    type='text'
                    value={description}
                    required
                    placeholder={description==''? '내용을 입력하세요' : ''}
                    onChange={event => setDescription(event.target.value)}
                    className='border-[1px] border-[#CCD0D4] focus:border-[#3C1E1E] outline-none resize-none
                    py-3 px-[12px] text-base mt-2 flex-grow min-h-[300px] max-h-[300px]'
                />
            </div>
            <div id='button' className='flex flex-col justify-end my-4 mr-3'>
                <div className='flex flex-row justify-evenly my-[4px] text-md'>
                    <label>
                        <input
                            id='PUBLIC'
                            type="radio"
                            value="PUBLIC"
                            checked={status === "PUBLIC"}
                            onChange={event => setStatus(event.target.value)}
                            className='accent-[#3C1E1E]'
                        />
                        공개
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="PRIVATE"
                            checked={status === "PRIVATE"}
                            onChange={event => setStatus(event.target.value)}
                            className='accent-[#3C1E1E]'
                        />
                        비공개
                    </label>
                </div>

                <button
                    type='submit'
                    className='bg-[#FFD701] hover:bg-[#efcb00] rounded-sm text-lg px-[35px] py-[5px] font-semibold'
                >등록하기</button>
            </div>
        </form>
    </div>
    )
}