import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import {quanLyPhimService} from '../../services/QuanLyPhimService';

export const getCarouselAction = () => {

    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachBanner();

             dispatch({
                 type:SET_CAROUSEL,
                 arrImg:result.data.content
             })
        }catch (errors) {
            console.log('errors',errors)
        }
    };
}
