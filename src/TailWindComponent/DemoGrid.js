import React from 'react'

export default function DemoGrid() {
    return (
        <div className="container">
            <div className="grid grid-cols-7 gap-2">
                <div className="bg-red-400">1</div>
                <div className="bg-green-400">2</div>
                <div className="bg-blue-400"> 3</div>
                <div className="bg-pink-400"> 4</div>
                <div className="bg-gray-400">5</div>
                <div className="bg-yellow-400">6</div>
                <div className="bg-indigo-500">7</div>
            </div>
        </div>
    )
}
