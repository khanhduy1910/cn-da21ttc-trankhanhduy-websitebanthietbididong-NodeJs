import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Doughnut, Line, Radar } from "react-chartjs-2";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import ChartIncome from './ChartIncome';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // status order
    let da_dat_hang = 0;
    let dang_van_chuyen = 0;
    let da_giao_hang = 0;
    orders &&
        orders.forEach((order) => {
            if (order.orderStatus === "Đã đặt hàng") {
                da_dat_hang += 1;
            }
            if (order.orderStatus === "Đang vận chuyển") {
                dang_van_chuyen += 1;
            }
            if (order.orderStatus === "Đã giao hàng") {
                da_giao_hang += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch]);

    let totalAmountall = 0;
    orders &&
        orders.forEach((product) => {
            totalAmountall += product.totalPrice;
        });
    // Chart Line tính tổng doanh thu
    const lineState = {
        labels: ["Số tiền ban đầu", "Tổng danh thu hiện tại"],
        datasets: [
            {
                label: "TỔNG DANH THU",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmountall],
            },
        ],
    };
    // Doughnut tính số lượng hàng còn và hết hàng
    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    // Doughnut thống kê trạng thái đơn hàng
    const doughnutStateOrder = {
        labels: ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700"],
                data: [da_dat_hang, dang_van_chuyen, da_giao_hang],
            },
        ],
    };
    // radar chart
    let khac = 0;
    let linhkien = 0;
    let DonghoTM = 0;
    let Laptop = 0;
    let dienthoai = 0;
    products &&
        products.forEach((product) => {
            if (product.category === "Khác") {
                khac += 1;
            }
            if (product.category === "Linh kiện") {
                linhkien += 1;
            }
            if (product.category === "Đồng hồ thông minh") {
                DonghoTM += 1;
            }
            if (product.category === "Laptop") {
                Laptop += 1;
            }
            if (product.category === "Điện thoại") {
                dienthoai += 1;
            }
        });
    const data = {
        labels: [
            'Khác',
        'Linh kiện',
        'Đồng hồ thông minh',
        'Laptop',
        'Điện thoại'
        ],
        datasets: [{
            label: 'Danh mục sản phẩm',
            data: [khac, linhkien, DonghoTM, Laptop, dienthoai],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    return (
        <Fragment>
            <div class="grid-bg ba-grid anim">
                <div class="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <h1 className="my-4">Tổng quan</h1>

                            {loading ? <Loader /> : (
                                <Fragment>
                                    <MetaData title={'Admin Dashboard'} />

                                    <div className="row g-4">
  <div className="col-xl-3 col-sm-6">
    <div className="card bg-primary text-white">
      <div className="card-body text-center">
        <h5 className="card-title">Tổng danh thu</h5>
        <p className="card-text"><b>{totalAmount && totalAmount.toLocaleString()} VNĐ</b></p>
      </div>
      <Link className="card-footer text-white d-flex justify-content-between align-items-center" to="/admin/orders">
        <span>Xem chi tiết</span>
        <i className="fa fa-angle-right"></i>
      </Link>
    </div>
  </div>

  <div className="col-xl-3 col-sm-6">
    <div className="card bg-success text-white">
      <div className="card-body text-center">
        <h5 className="card-title">Tổng sản phẩm</h5>
        <p className="card-text"><b>{products && products.length}</b></p>
      </div>
      <Link className="card-footer text-white d-flex justify-content-between align-items-center" to="/admin/products">
        <span>Xem chi tiết</span>
        <i className="fa fa-angle-right"></i>
      </Link>
    </div>
  </div>

  <div className="col-xl-3 col-sm-6">
    <div className="card bg-danger text-white">
      <div className="card-body text-center">
        <h5 className="card-title">Tổng hóa đơn</h5>
        <p className="card-text"><b>{orders && orders.length}</b></p>
      </div>
      <Link className="card-footer text-white d-flex justify-content-between align-items-center" to="/admin/orders">
        <span>Xem chi tiết</span>
        <i className="fa fa-angle-right"></i>
      </Link>
    </div>
  </div>

  <div className="col-xl-3 col-sm-6">
    <div className="card bg-info text-white">
      <div className="card-body text-center">
        <h5 className="card-title">Tổng người dùng</h5>
        <p className="card-text"><b>{users && users.length}</b></p>
      </div>
      <Link className="card-footer text-white d-flex justify-content-between align-items-center" to="/admin/users">
        <span>Xem chi tiết</span>
        <i className="fa fa-angle-right"></i>
      </Link>
    </div>
  </div>

  {/* Biểu đồ Doughnut */}
  <div className="col-xl-6 col-sm-12">
    <div className="card bg-light">
      <div className="card-body">
        <h5 className="card-title text-dark">Tình trạng số lượng hàng</h5>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  </div>

  <div className="col-xl-6 col-sm-12">
    <div className="card bg-light">
      <div className="card-body">
        <h5 className="card-title text-dark">Tình trạng đơn hàng</h5>
        <div className="doughnutChart">
          <Doughnut data={doughnutStateOrder} />
        </div>
      </div>
    </div>
  </div>

  {/* Biểu đồ Line */}
  <div className="col-xl-12">
    <div className="card bg-light">
      <div className="card-body">
        <h5 className="card-title text-dark">Tổng doanh thu</h5>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
      </div>
    </div>
  </div>
</div>

                                </Fragment>
                            )}

                            <div className='row'>

                                <div className='col-md-6'>
                                    <ChartIncome />
                                </div>
                                <div className='radar col-md-5 card text-white bg-light'>

                                    <Radar
                                        data={data}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Dashboard
