'use client'
import React, { useState, useEffect } from 'react';

export default function BoardsPagination({
    boardsLength, boardsPerPage, currentPage, setCurrentPage
}) {

    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(boardsLength / boardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <div id='pagination' className='mb-[0px] pt-[2px] border-t-[3px] border-[#FFD701]'>
        <ul className='flex flex-row justify-center text-md'>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`${currentPage == number? 'border border-[#3c1e1e54] rounded-sm': ''} mx-[2px]`}
                    >
                        <button
                            onClick={() => {setCurrentPage(number)}}
                            className='hover:underline px-[8px]'
                        >
                            {number}
                        </button>
                    </li>
                ))}
        </ul>
    </div>
    )
}