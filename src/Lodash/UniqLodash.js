import _ from 'lodash';
import React from 'react'

export default function UniqLodash() {

    const arr = [1,2,2,2,4,5,6];
    console.log(_.uniq(arr));



    const arr2 = [
        {id:'1',name:'iphoneX',price:1000},
        {id:'2',name:'iphoneXS',price:2000},
        {id:'3',name:'iphoneXS Max',price:3000},
        {id:'3',name:'iphoneXS Max',price:3000},
        {id:'3',name:'iphoneXS Max',price:3000},
        {id:'5',name:'iphone Pro',price:4000},
        {id:'4',name:'iphone Pro MAX',price:5000},

    ];

    console.log('result',_.uniqBy(arr2, 'id'))


    return (
        <div>
            
        </div>
    )
}
