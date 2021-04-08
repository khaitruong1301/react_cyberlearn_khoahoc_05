import React from 'react'
import _ from 'lodash';

export default function LastFirstLodash() {

    const arrStudent = [
        {id:1,name:'Peter'},
        {id:2,name:'Barry'},
        {id:3,name:'Iris'}
    ]

    const firstItem = _.first(arrStudent);
    const lastItem = _.last(arrStudent);
    

    const arr = [['001','Alice'], ['002','Pop'],['003','Barry']];

    const [id,name] = _.first(arr);

    const [id2,name2] = _.last(arr);

    return (
        <div className="container">
            <div>FirstItem: {firstItem.name }</div>
            <div>LastItem: {lastItem.name}</div>


            <hr />
            <div>FirstItem: {id} - {name}</div>
            <div>LastItem: {id2} - {name2} </div>
        </div>
    )
}
