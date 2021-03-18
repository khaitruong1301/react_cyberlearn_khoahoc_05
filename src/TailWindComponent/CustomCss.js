import React, { Component } from 'react'
import './CustomCss.css'


export default class CustomCss extends Component {
    render() {
        return (
            <div className="container mt-1">
                <article className="bg-gray-500 p-5 shadow-lg">
                    <p className="text-4xl text-white">Responsive</p>

                    <p className="content">To control the font size of an element at a specific breakpoint, add a  prefix to any existing font size utility. For example, use md:text-lg to apply the text-lg utility at only medium screen sizes and above.</p>

                    <button class="animation-scale p-5">
                        Hover me
                    </button>
                </article>
            </div>
        )
    }
}
