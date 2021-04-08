import _ from 'lodash';
import React from 'react'

export default function FillLodash() {

    var arr = [
        {id:1,name:'IPhone'},
        {id:2,name:'IPhone X'},
        {id:3,name:'IPhone XS'},
        {id:4,name:'IPhone Pro'},
        {id:5,name:'IPhone Pro max'},
    ];

    _.fill(arr,{id:5,name:'Samsung galaxy note 10 plus'},1,4);

    console.log('arr',arr);

    return (
        <div>
            
        </div>
    )
}
