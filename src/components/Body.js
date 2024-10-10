import React from 'react'
import Browse from './Browse'
import Login from './Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        },
        // {
        //     path:"/",
        //     element:<Body/>
        // },
    ])

  return (
    <div>
        <RouterProvider router={appRouter}/>

    </div>
  )
}

export default Body