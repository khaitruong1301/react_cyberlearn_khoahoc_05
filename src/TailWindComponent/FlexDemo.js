import React from 'react'

export default function FlexDemo() {


    return (
        <div className="w-screen h-screen bg-purple-400">
            <div className="flex flex-row h-1/2 w-full bg-green-400 justify-start flex-wrap gap-4">
                <div className="fItem h-10 w-1/4 bg-black "></div>
                <div className="fItem bg-blue-400 h-10 w-1/4"></div>
                <div className="fItem bg-red-400 h-10 w-1/4"></div>
            </div>
        </div>
    )
}
