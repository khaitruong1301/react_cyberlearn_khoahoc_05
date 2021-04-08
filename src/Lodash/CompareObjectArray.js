import _ from 'lodash';
import React from 'react'

export default function CompareObjectArray() {

    const arrA = [1,2];
    const arrB = [2,1];
    const result = _.isEqual(arrA.sort(),arrB.sort());
    console.log('result',result)


    const arrObject1 = [{id:1,name:'Khai'},{id:'2',name:'Minh'}];
    const arrObject2 = [{id:1,name:'Khai'},{id:'2',name:'Hang'},{id:'3',name:'Minh'}];

    const result1 = _.differenceWith(arrObject2,arrObject1,_.isEqual);

    console.log('result1',result1)


    return (
        <div>
            
        </div>
    )
}
