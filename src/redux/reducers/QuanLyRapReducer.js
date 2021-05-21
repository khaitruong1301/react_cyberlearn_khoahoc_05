import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType";

const stateDefault = {
    heThongRapChieu: []
}



export const QuanLyRapReducer = (state=stateDefault,action) =>{

    switch (action.type) {
      
        case SET_HE_THONG_RAP_CHIEU : {
            state.heThongRapChieu = action.heThongRapChieu;
            return {...state};
        }

        default: return {...state}
            break;
    }
}