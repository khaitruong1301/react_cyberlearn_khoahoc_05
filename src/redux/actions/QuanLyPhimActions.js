import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";




export const layDanhSachPhimAction = () => {


    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachPhim();

            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}


export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {


            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công!')
            console.log('result', result.data.content);


            
        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}



export const layThongTinPhim = (maPhim) => {


    return async (dispatch) => {
        try {

            dispatch({type:DISPLAY_LOADING});
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            await dispatch({
                type: 'SET_THONG_TIN_PHIM',
                thongTinPhim: result.data.content
            });
            dispatch({type:HIDE_LOADING});

        } catch (errors) {
            console.log('errors', errors)
        }
    };
}




export const capNhatPhimAction = (formData) => {
    return async (dispatch) => {
        try {


            let result = await quanLyPhimService.capNhatPhim(formData);
            console.log('result', result.data.content);
            alert('Cập nhật phim thành công!')


            
        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}