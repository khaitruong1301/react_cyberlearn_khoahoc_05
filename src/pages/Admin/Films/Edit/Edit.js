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
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimActions';

const Edit = (props) => {

    const [componentSize, setComponentSize] = useState('default');
    const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer);
    console.log('thongTinPhim',thongTinPhim);
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      let {id} = props.match.params;

      dispatch(layThongTinPhimAction(id));

      
    }, [])

    
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            maNhom:'GP01',
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            hinhAnh: null
        },

        onSubmit: (values) => {
            console.log('values', values);
            let frmData = new FormData();
            for (let key in values) {
                frmData.append(key, values[key]);
                if (key === 'hinhAnh') {
                    frmData.append(key, values[key], values[key].name);

                }
            }

            axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/ThemPhimUploadHinh',
                method: 'POST',
                data: frmData

            }).then(result => {
                console.log('result', result);
            }).catch(error => {
                console.log(error, error.response?.data)
            })


        }
    })

    const handleChangSwitch = (checked, e) => {
        // console.log('checked',checked)
        // console.log('checked',e.target.name)

        formik.setFieldValue(e.target.name, checked);


    }
    const changeNumber = (name) => {

        return (value) => {
            // console.log('value', value)
            // console.log('value', e)
            formik.setFieldValue(name, value);

        }
    }


    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };


    const handleChangeFile = (e) => {
        console.log('e', e.target.files[0]);
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (e) {
                setImgSrc(e.target.result);
            }
        }
        formik.setFieldValue('hinhAnh', e.target.files[0]);
    }

    const handleChangeDatePicker = (value) => {
        console.log('value', moment(value).format('DD/MM/YYYY'));
        // console.log('value');
        formik.setFieldValue('ngayKhoiChieu', moment(value).format('DD/MM/YYYY'))
    }

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
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY"  value={moment(formik.values.ngayKhoiChieu,'DD/MM/YYYY')} />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch name="dangChieu" onChange={handleChangSwitch} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch name="sapChieu" onChange={handleChangSwitch} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch name="hot" onChange={handleChangSwitch} checked={formik.values.hot}/>
                </Form.Item>


                <Form.Item label="Số sao">
                    <InputNumber onChange={changeNumber('danhGia')} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} /> <br />
                    <img  width={100} height={100} src={imgSrc ==='' ? thongTinPhim.hinhAnh : imgSrc}  />
                </Form.Item>
                <Form.Item label="Button">
                    <button type="submit" className="bg-blue-300 text-white p-2">Button</button>
                </Form.Item>
            </Form>
        </>
    );
};



export default Edit;