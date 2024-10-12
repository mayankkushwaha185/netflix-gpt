import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[20%] px-28 absolute text-white bg-gradient-to-r from-black aspect-video w-screen '>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 font-semibold w-1/3'>{overview}</p>
        <div className='flex'>
            <button className=' bg-white flex justify-center items-center text-black p-4 px-12  text-xl font-semibold rounded-lg hover:bg-opacity-90'>
              <img className='h-7 mx-1 px-1' src='https://png.pngtree.com/png-vector/20190419/ourlarge/pngtree-vector-play-icon-png-image_956416.jpg'/>   Play
            </button>
            <button className=' bg-gray-600 flex items-center justify-center text-white p-4 mx-2 px-12  text-xl bg-opacity-50 hover:bg-opacity-90 rounded-lg '> 
            <img className='h-7 mx-1 px-1' src='https://www.pngplay.com/wp-content/uploads/7/More-Info-Button-PNG-HD-Quality.png'/>    More Info
                </button>
        </div>
    </div>
  )
}


 


export default VideoTitle