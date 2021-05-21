import React from 'react'


import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'

export default function Contact(props) {


    return (
        <CustomCard
        effectColor="#C780FF" // required
        color="#14AEFF" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
    >
        <h1>Hello</h1>
        <p>This is an example</p>
    </CustomCard>

    )
}
