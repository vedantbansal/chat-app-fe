import React from 'react'

function VideoCall() {
    return (

        <div className='border border-black h-full w-full flex justify-center relative z-0 '>
            <video id="user-1" autoPlay playsInline className="h-full w-full absolute z-10"></video>
            <div className='border border-green-600 relative z-10 h-full w-full flex place-items-end justify-end'>
                <video id="user-2" autoPlay playsInline className="h-1/5 w-1/6 border border-black"></video>
            </div>

        </div>
    );
}

export default VideoCall