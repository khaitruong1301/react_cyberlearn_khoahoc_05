import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css';
import {CloseOutlined} from '@ant-design/icons'
import './Checkout.css'
export default function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        //Gọi hàm tạo ra 1 async function 
        const action = layChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action)
    }, [])

    console.log({ chiTietPhongVe });
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;


    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            return <Fragment key={index}>
                <button disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} text-center`} key={index}>
                    
                    {ghe.daDat ? <CloseOutlined style={{marginBottom:7.5,fontWeight:'bold'}} /> : ghe.stt}
            
                </button>

                {(index + 1) % 16 === 0 ? <br /> : ''}

            </Fragment>
        })
    }

    return (
        <div className=" min-h-screen mt-5" >
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">

                        <div className="bg-black " style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>


                </div>
                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-4xl">0 đ</h3>
                    <hr />
                    <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5"><span className="text-red-400 text-lg">Ghế</span></div>
                        <div className="text-right col-span-1">
                            <span className="text-green-800 text-lg">0đ</span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom:0 }}>
                        <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
