import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import {history} from '../../App'
import { connection } from "../..";


export const layChiTietPhongVeAction = (maLichChieu) => {


    return async dispatch => {


        try {

            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            // console.log('result',result);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }


        } catch (error) {

            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const DatGheAction =  (ghe,maLichChieu) => {

    return async (dispatch,getState)=> {

      await dispatch( {
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Gửi thông tin về signalr
        const userLogin = getState().QuanLyNguoiDungReducer.userLogin;
        const danhSachGheDangdat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
         connection.invoke('datGhe',userLogin.taiKhoan,JSON.stringify( danhSachGheDangdat),maLichChieu)

        
    }

}



export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {


    return async dispatch => {
        try {

            dispatch(displayLoadingAction)


            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log(result.data.content);
            //Đặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({type:DAT_VE_HOAN_TAT})
            await dispatch(hideLoadingAction);
            dispatch({type:CHUYEN_TAB});

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error.response.data);
        }
    }

}