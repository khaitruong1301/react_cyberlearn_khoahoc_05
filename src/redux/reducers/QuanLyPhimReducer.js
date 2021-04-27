


const stateDefault = {
    arrFilm: [
        {
          "maPhim": 1282,
          "tenPhim": "Ban tay diet quy",
          "biDanh": "ban-tay-diet-quy",
          "trailer": "https://www.youtube.com/embed/uqJ9u7GSaYM",
          "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
          "moTa": "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
          "maNhom": "GP00",
          "ngayKhoiChieu": "2019-07-29T00:00:00",
          "danhGia": 5,
          "hot": true,
          "dangChieu": false,
          "sapChieu": true
        },
        {
            "maPhim": 1282,
            "tenPhim": "Ban tay diet quy",
            "biDanh": "ban-tay-diet-quy",
            "trailer": "https://www.youtube.com/embed/uqJ9u7GSaYM",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
            "moTa": "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2019-07-29T00:00:00",
            "danhGia": 5,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
          }
    ]
}

export const QuanLyPhimReducer = (state=stateDefault,action ) => {
    switch(action.type) {


        default : return {...state}
    }
}