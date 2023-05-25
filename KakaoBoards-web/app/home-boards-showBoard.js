'use client'
import React from 'react';

export default function ShowBoard({
    clickedBoard, setListShown
}) {

    const goBack = () => {
        setListShown(true);
    }

    return (
    <div
        id='showBoard'
        className='flex flex-col max-w-[920px] mx-auto mt-[8px]'
    >
        <div className='ml-[12px]'>
            <div className='flex flex-row justify-between'>
                <p
                    style= {{
                        'fontSize': '1.7rem',
                        'lineHeight': '2rem'
                    }}
                    className='font-bold my-1 break-all'
                >{clickedBoard.title}</p>
                <button
                    className='my-auto text-sm ml-[18px] py-[3.5px] bg-[#FFD701] hover:bg-[#efcb00] rounded-sm
                    px-[16px] min-w-[60px]'
                    onClick={goBack}
                >목록</button>
            </div>
            <div className='flex flex-row justify-start text-sm'>
                <img
                    src={clickedBoard.writerIconNum === undefined? '':`./charactor_0${clickedBoard.writerIconNum}.png`}
                    className='h-[33px] my-auto'
                />
                <div className='flex flex-col'>
                    <p className='my-auto px-[6px] font-semibold'>{clickedBoard.writer}</p>
                    <div className='flex pb-[1px]'>
                        <p className='my-auto px-[6px] text-xs opacity-80'>{clickedBoard.createDate}</p>
                        <p className='my-auto px-[3px] text-xs opacity-80'>{clickedBoard.createTime}</p>
                    </div>
                </div>
            </div>
        </div>

        <div
            className='border-[1px] border-[#CCD0D4] py-[15px] px-[12px] text-base mb-3 mt-2
            overflow-auto whitespace-pre min-h-[300px] max-h-[400px]'
        >
            {clickedBoard.description}
        </div>
    </div>
    )
}