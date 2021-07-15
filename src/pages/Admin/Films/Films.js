import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';

import { Input, Space } from 'antd';
import { AudioOutlined,EditOutlined,SearchOutlined ,DeleteOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import axios from 'axios';
import { TOKEN } from '../../../util/settings/config';
const { Search } = Input;

export default function Films() {

    const {arrFilmDefault} = useSelector(state=>state.QuanLyPhimReducer);

    const dispatch = useDispatch();

    console.log('arrFilmDefault',arrFilmDefault);

    useEffect(() => {
        dispatch(layDanhSachPhimAction());

    },[])



    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend','ascend'],
            width:'15%'

            // sortOrder:'descend'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render : (text,film,index) => { return <Fragment>
                <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => {e.target.onError = null; e.target.src=`https://picsum.photos/id/${index}/50/50` }} />
            </Fragment>},
            width:'15%'
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if(tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend','ascend'],
            width:'25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            
            // sorter: (a, b) => {
            //     let moTaA = a.moTa.toLowerCase().trim();
            //     let moTaB = b.moTa.toLowerCase().trim();
            //     if(moTaA > moTaB) {
            //         return 1;
            //     }
            //     return -1;
            // },
            render: (text,film) => {return <Fragment>
                {film.moTa.length>50 ? film.moTa.substr(0,50) + ' ...' : film.moTa}
            </Fragment>},
            sortDirections: ['descend','ascend'],
            width:'25%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text,film) => {return <Fragment>
                <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{color:'blue'}} /> </NavLink>
                <span style={{cursor:'pointer'}} key={2}  className="text-2xl" onClick={()=>{
                    if(window.confirm('Bạn có chắc mua xoá')) {
                        axios({
                            url:`http://movieapi.cyberlearn.vn/api/QuanLyPhim/XoaPhim?MaPhim=${film.maPhim}`,
                            method:'DELETE',
                            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
                        }).then(result => {
                            console.log(result)
                        }).catch(error => {
                            console.log(error.response?.data);
                            dispatch(layDanhSachPhimAction())
                        })
                    }


                  
                }}><DeleteOutlined style={{color:'red'}}  /> </span>
            </Fragment>},
            sortDirections: ['descend','ascend'],
            width:'25%'
        },
    ];
    const data = arrFilmDefault;

    

    const onSearch = value => console.log(value);

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>


            <h3 className="text-4xl">Quản lý Phim</h3>
            <Button className="mb-5" onClick={()=>{
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
     
                onSearch={onSearch}
            />

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
        </div>
    )
}
