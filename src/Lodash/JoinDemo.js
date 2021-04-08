import React from 'react'
import _ from 'lodash'
export default function JoinDemo() {

    let arr = ['Khải','Nam','Minh'];

    let arrPerson = [
        {id:1, name:'Khải'},
        {id:2, name:'Nam'},
        {id:3, name:'Minh'},
    ]

    //es6 
    const result = arr.join('-'); //IE 9 10

    //lodash
    const resultLodash = _.join(arr,'*')

    const person =  _.find(arrPerson,item => item.id === 2);

    return (
        <div>
            {result}
            <br />
            <div>
                <p>Name: {person.name} - id {person.id}</p>
            </div>

        </div>
    )
}
