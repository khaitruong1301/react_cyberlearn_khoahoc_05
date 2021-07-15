import { baseService } from "./baseService";
import { GROUPID} from '../util/settings/config'
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
export class QuanLyDatVeService  extends baseService{

    constructor() {
        super();
    }

    layChiTietPhongVe = (maLichChieu) => { // mã lịch chiếu lấy từ url 
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }
    /* thongTinDatVe =  {
        "maLichChieu": 0,
        "danhSachVe": [
          {
            "maGhe": 0,
            "giaVe": 0
          }
        ]
      }*/ 
    
    datVe = (thongTinDatVe = new ThongTinDatVe()) => { 
        return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    }
    
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu);
    }

}



export const quanLyDatVeService = new QuanLyDatVeService();
