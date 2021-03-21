import React from 'react'

export default function Card() {
    return (
        <div className="card w-full">
            <div className="card-body bg-gray-200 py-8 rounded-tl-lg rounded-tr-lg ">
                <h3 className="text-purple-800 font-bold text-xs">Category</h3>
                <p className="text-black text-1xl">Cybersoft frontend developer</p>
                <p className="text-black text-1xl font-thin my-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic enim, qui maxime quos temporibus nulla eveniet reiciendis! Dolore, architecto dicta suscipit illo debitis numquam expedita deserunt reiciendis, adipisci, ullam ea!
            </p>
            </div>

            <div className="card-footer bg-gray-100 justify-between flex px-2">
                <p className="mt-4">1 USD</p>
                <button className="rounded-lg bg-purple-500 text-white px-2 my-2 py-2 transition hover:text-purple-500 hover:bg-gray-300  duration-500">Register</button>
            </div>
        </div>
    )
}
