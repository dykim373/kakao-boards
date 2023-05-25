'use client'
import React, { useState } from 'react';
import BoardsAll from './home-boards-1-all';
import BoardsPrivate from './home-boards-2-private';
import CreateBoard from './home-boards-3-createBoard';

export default function HomeBoards() {
    const [boardsState, setBoardsState] = useState('all');
    
    return (
    <div
        id='homeBoards'
        className='flex-grow md:ml-[2%] md:mr-0
        mx-2 my-0 min-w-[400px] py-3 px-8
        text-[#3C1E1E] border border-[#CCD0D4] bg-white ring-[1px] ring-[#ccd0d453]' 
    >

        <div className={`${boardsState=='all'? '':'hidden'} w-full`}>
            <BoardsAll
                boardsState={boardsState}
                setBoardsState={setBoardsState}
            />
        </div>
        <div className={`${boardsState=='private'? '':'hidden'} w-full`}>
            <BoardsPrivate
                boardsState={boardsState}
                setBoardsState={setBoardsState}
            />
        </div>
        <div className={`${boardsState=='write'? '':'hidden'} w-full`}>
            <CreateBoard
                boardsState={boardsState}
                setBoardsState={setBoardsState}
            />
        </div>

    </div>
    )
}