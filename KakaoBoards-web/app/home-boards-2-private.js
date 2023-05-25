'use client'
import React, { useState, useEffect } from 'react';
import BoardsPagination from './home-boards-pagination';
import ShowBoard from './home-boards-showBoard';
import BoardsNav from './home-boards-nav';

export default function BoardsAll({
    boardsState, setBoardsState
}) {
    const [boards, setBoards] = useState([]); //DB에서 게시물 받아올 예정
    const [indexs, setIndexs] = useState([]); //게시판에 보여질 게시물 번호
    const [currentPage, setCurrentPage] = useState(1);
    const [boardsPerPage] = useState(9); // 한 페이지당 게시물 갯수
    // 게시물 클릭 시, 보여줄 게시물 관리
    const [listShown, setListShown] = useState(true);
    const [clickedBoard, setClickedBoard] = useState({});
    const getCurrentUserURL = 'http://localhost:3000/auth/current'

    //DB에서 모든 유저 및 게시판 데이터 가져오기
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken !== null && accessToken !== 'undefined') {
            fetchUsers(accessToken);
        }
    }, []);

    const fetchUsers = async (accessToken) => {
        try {
            const response = await fetch(getCurrentUserURL, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = await response.json();

            // 여기에 boards Data 넣을거임
            const boardsData = [];
            // boards Data에 작성자 정보를 추가하는 2중 forEach 루프
            userData.boards.forEach(board => {
                board.writer = userData.username;
                board.writerIconNum = userData.iconNum;
                boardsData.push(board);
            });
            /*********** [중요] boards 객체 배열을 id 크기 순서로 정렬 ***********/
            boardsData.sort((a, b) => b.id - a.id);
            
            const indexsData = []; // 여기에 넣을거임
            for(let i = 1; i <= boardsData.length; i++) {
                indexsData.push(boardsData.length - i + 1);
            }
            setBoards(boardsData);
            setIndexs(indexsData);
        } catch {
            console.log('Error');
        }
    };
    
    const showBoard = (board) => {
        setClickedBoard(board);
        setListShown(false);
    }

    //현재 페이지에 해당하는 게시물 가져오기
    const indexOfLastBoard = currentPage * boardsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;
    const currentBoards = boards.slice(indexOfFirstBoard, indexOfLastBoard);
    const currentIndexs = indexs.slice(indexOfFirstBoard, indexOfLastBoard);

    return (
    <div
        id='boardsAll'
        className='w-full h-full'
    >
        <div id='list' className={`${listShown? '':'hidden'} flex flex-col`}>
            <BoardsNav
                boardsState={boardsState}
                setBoardsState={setBoardsState}
            />            
            <div className='flex-grow h-full'>
                <div
                    id='menu'
                    className='flex flex-row ml-[65px] my-[2px] font-semibold justify-between'>
                    <p
                        className='flex-grow text-center'
                    >제목</p>
                    <p
                        className='my-auto ml-[20px] mr-[30px] text-center max-w-[70px] min-w-[70px] break-all'
                    >공개여부</p>
                    <p
                        className='my-auto text-center max-w-[85px] min-w-[85px] break-all'
                    >작성일</p>
                </div>
                <div id='currentBoards'>
                {currentBoards.map((board, index) => (
                    <div
                        key={board.id} //DB에 저장된 board.id로 key값 저장
                        className='flex flex-row py-[6px] justify-between text-sm border-t-[1px] border-[#CCD0D4]'
                    >
                        {/* Array.map으로 게시판 목록 생성 */}
                        <p
                            className='text-gray-600 text-xs my-auto text-center max-w-[55px] min-w-[55px]
                            mx-[5px] break-all'
                        >{currentIndexs[index]}</p>
                        <a
                            href='#'
                            onClick={() => {showBoard(board)}}
                            className='text-base my-auto flex-grow pl-[10px] hover:underline break-all'
                        >{board.title}</a>
                        <p
                            className='my-auto ml-[20px] mr-[30px] text-center max-w-[70px] min-w-[70px] break-all'
                        >{board.status=='PUBLIC'? '공개':'비공개'}</p>
                        <p
                            className='my-auto text-center max-w-[85px] min-w-[85px] break-all'
                        >{board.createDate}</p>
                    </div>
                ))}
                </div>
            </div>
            <BoardsPagination
                boardsLength={boards.length}
                boardsPerPage={boardsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
        <div className={`${listShown? 'hidden':''} w-full h-full`}>
            <ShowBoard
                clickedBoard={clickedBoard}
                setListShown={setListShown}
            />
        </div>
    </div>
    )
}