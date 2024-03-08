import React from 'react'
import { VideoCall } from '../components'
import { useLocation } from 'react-router-dom'

function VideoCallPage() {

  return (
    <div className='h-screen w-screen p-4 flex place-items-center justify-center bg-slate-100'>
        <div className='h-full w-11/12 flex justify-center'>
                <VideoCall/>

        </div>
    </div>
  )
}

export default VideoCallPage