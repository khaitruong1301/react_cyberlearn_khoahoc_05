import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DatGheAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import './Checkout.css';
import { CHUYEN_TAB, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { datVeAction } from '../../redux/actions/QuanLyDatVeActions';

import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../..';


function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    let { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachChon } = useSelector(state => state.QuanLyDatVeReducer);

    const dispatch = useDispatch();
    console.log('danhSachGheDangDat', danhSachGheDangDat);
    useEffect(() => {
        //Gọi hàm tạo ra 1 async function 
        const action = layChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action);
        
        // connection.start().then(function () {
            connection.invoke("loadDanhSachGhe", props.match.params.id)
            connection.on("loadDanhSachGheDaDat", (dsGheDangDatReturn) => {

                // dsGheDangDatReturn = dsGheDangDatReturn.filter(tt => tt.taiKhoan !== userLogin.taiKhoan);
                // console.log('aaa',dsGheDangDatReturn)

                if (userLogin.taiKhoan != dsGheDangDatReturn.taiKhoan) {


                    let danhSachGheKhachChonCapNhat = dsGheDangDatReturn.reduce((arrResult, item, index) => {
                        if (item.taiKhoan !== userLogin.taiKhoan) {
                            console.log('item', item)
                            let danhSachGhe = JSON.parse(item.danhSachGhe);
                            return [...arrResult, ...danhSachGhe];
                        }
                        return [...arrResult]
                    }, []);

                    danhSachGheKhachChonCapNhat = _.uniqBy(danhSachGheKhachChonCapNhat, 'maGhe');

                    console.log(danhSachGheKhachChonCapNhat, userLogin.taiKhoan)
                    dispatch({
                        type: 'KHACH_DAT',
                        danhSachGheKhachChon: danhSachGheKhachChonCapNhat
                    })
                }

            // });
        })


        return () => {
            //Gửi thông tin về signalr

            // const danhSachGheDangdat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);

        }

    }, [])

    console.log({ chiTietPhongVe });
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;


    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

            //Kiểm tra danh sách ghế khách chọn 
            let classGheKhachChon = '';
            let indexGheKhachChon = danhSachGheKhachChon.findIndex(gheKC => gheKC.maGhe == ghe.maGhe);

            if (indexGheKhachChon !== -1) {
                classGheKhachChon = 'gheKhachChon';
            }
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }


            if (indexGheDD != -1) {
                classGheDaDat = 'gheDangDat';
            }


            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch(DatGheAction(ghe, props.match.params.id));
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachChon} text-center`} key={index}>

                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}

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

                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-4xl"> {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                    }, 0).toLocaleString()} đ</h3>
                    <hr />
                    <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className="text-red-400 text-lg">Ghế</span>

                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}</span>
                            })}
                        </div>
                        <div className="text-right col-span-1">
                            <span className="text-green-800 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}
                            </span>
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
                    <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            console.log(thongTinDatVe);

                            dispatch(datVeAction(thongTinDatVe));


                        }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

export default function CheckoutTab(props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    console.log('tabActive', tabActive)
    return <div className="p-5">
        <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {

            // console.log('key',  key)
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: key.toString()
            })
        }}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>

        </Tabs>

    </div>

}


function KetQuaDatVe(props) {

    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
        let tempArray = [];
        connection.on("loadDanhSachGheDaDat", (dsGheDangDatReturn) => {
            console.log(dsGheDangDatReturn, typeof (dsGheDangDatReturn));
            // tempArray = dsGheDangDatReturn.filter(item => item.maLichChieu === parseInt(this.state.maLichChieu));
            // console.log("tempArray", tempArray);
            // // this.setState({
            // //     danhSachGheInvoke: tempArray
            // // })
            // this.props.putDataInvoke(tempArray)
        })

    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                        <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    </div>
                </div>
            </div>
        });
    }

    return <div className="p-5">

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa và thời gian để xem phim vui vẻ bạn nhé !</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                    {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
                                <p className="text-gray-500">10:20 Rạp 5, Hệ thống rạp cinestar bhd </p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>

    </div>
}