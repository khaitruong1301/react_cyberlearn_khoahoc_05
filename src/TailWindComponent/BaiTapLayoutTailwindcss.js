import React from 'react'
import Card from './Card'

export default function BaiTapLayoutTailwindcss() {
    return (
        <div className="container">
            <h1 className="text-center text-4xl text-green-500">Welcome to the cybersoft frontend with tailwindcss</h1>

            <div className="grid grid-cols-3 gap-4 my-3">
                <div className="text-center">
                    <Card />
                </div>
                <div className="text-center">
                    <Card />
                </div>
                <div className="text-center">
                    <Card />
                </div>
            </div>

        </div>
    )
}
