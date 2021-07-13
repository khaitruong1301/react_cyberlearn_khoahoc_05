import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, layDanhSachPhimAction, layThongTinPhim, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';
import _ from 'lodash';

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const { arrFilmDefault, thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    console.log({ thongTinPhim })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: {}

        },

        onSubmit: (values) => {
            console.log('values', values);
            console.log(formik.values)
            values.maNhom = GROUPID;
            values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format('DD/MM/YYYY');
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    console.log('aa',values.hinhAnh)
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }

                console.log(`formData[${key}]=`, values[key])
            }

            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(capNhatPhimAction(formData));

        }
    })


    useEffect(async () => {

        await dispatch(layThongTinPhim(props.match.params.id));
    }, [])




    const handleChangeDatePicker = (value) => {
        // console.log('datepickerchange',);
        // let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', value);

    }

    const handleChangeSwitch = (name) => {

        return (value) => {
            thongTinPhim[name] = value;
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {

            formik.setFieldValue(name, value);
        }
    }

    const handleChangeFile = (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file);
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);

                setImgSrc(e.target.result);//Hình base 64

            }

        }
    }


    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    console.log(thongTinPhim)
    return (
        <>

            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3>Thêm mới phim </h3>
                <Form.Item label="Form Size" name="size" >
                    <Radio.Group>
                        <Radio.Button key={1} value="small">Small</Radio.Button>
                        <Radio.Button key={2} value="default">Default</Radio.Button>
                        <Radio.Button key={3} value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" name="tenPhim" onChange={formik.handleChange} value={formik.values?.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" name="trailer" onChange={formik.handleChange} value={formik.values?.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" name="moTa" onChange={formik.handleChange} value={formik.values?.moTa} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values?.ngayKhoiChieu)} />
                </Form.Item>
                <Form.Item label="Đang chiếu" >
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>

                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? thongTinPhim?.hinhAnh : imgSrc} alt="..." />


                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};



export default Edit;