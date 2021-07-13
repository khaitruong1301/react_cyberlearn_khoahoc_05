import React, { useState } from 'react';
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

const AddNew = () => {



    const [componentSize, setComponentSize] = useState('default');
    const [img, setImg] = useState('');
    const formik = useFormik({
        initialValues: {
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom:'GP01',
            ngayKhoiChieu: '',
            hinhAnh: {}
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
            formik.setFieldValue('hinhAnh', e.target.files[0]);
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setImg(reader.result);
            reader.onload = function (e) {
                setImg(e.target.result);
            }
        }
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
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch name="dangChieu" onChange={handleChangSwitch} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch name="sapChieu" onChange={handleChangSwitch} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch name="hot" onChange={handleChangSwitch} />
                </Form.Item>


                <Form.Item label="Số sao">
                    <InputNumber onChange={changeNumber('danhGia')} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} /> <br />
                    <img src={img} width={100} height={100} />
                </Form.Item>
                <Form.Item label="Button">
                    <button type="submit" className="bg-blue-300 text-white p-2">Button</button>
                </Form.Item>
            </Form>
        </>
    );
};



export default AddNew;