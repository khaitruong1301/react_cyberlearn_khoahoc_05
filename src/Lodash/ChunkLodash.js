import React from 'react'
import _ from 'lodash'


export default function ChunkLodash() {

    const arr = ['id',1,'name','Khải','info','cybersoft'];

    const result = _.chunk(arr,2);

    console.log('result',result);

    const arrString = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13"];

    const result2 = _.chunk(arrString,3);
    
    console.log('result2',result2)


    return (
        <div>
            
        </div>
    )
}
