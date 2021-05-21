import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";



export const layDanhSachHeThongRapAction = () => {
    console.log('abc')
    return async dispatch => {
        try{
            const result = await quanLyRapService.layDanhSachHeThongRap();

            console.log('result',result.data.content);
            if(result.status === 200) {
                dispatch({
                    type:SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu:result.data.content
                })
            }


        }catch(errors) {
            console.log('errors',errors.response?.data)
        }

    }
} 