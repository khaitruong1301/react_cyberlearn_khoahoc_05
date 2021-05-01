import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './Flim_Flip.css'


export default function Film_Flip(props) {

    const { item } = props;


    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front">

                    <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }} >
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ</div>
        </div>

    )
}
