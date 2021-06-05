import { SET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeType"
import {ThongTinLichChieu} from '../../_core/models/ThongTinPhongVe'


const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu()
}



export const QuanLyDatVeReducer = (state=stateDefault,action)=> {

    switch (action.type) {
       
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return {...state};
        }
        default: return {...state}
    }

}