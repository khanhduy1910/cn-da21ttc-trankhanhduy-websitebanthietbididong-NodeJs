import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Ngày đặt hàng',
                    field: 'date',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Số lượng',
                    field: 'numOfItems',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Tổng tiền',
                    field: 'amount',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Trạng thái',
                    field: 'status',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                    width: 100
                },
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                date: new Date(order.createdAt).toLocaleDateString('vi-VN'),
                numOfItems: order.orderItems.length,
                amount: `${(order.totalPrice).toLocaleString()}đ`,
                status: order.orderStatus && String(order.orderStatus).includes('Đã giao hàng')
                    ? <span style={{ color: 'green', fontWeight: 'bold' }}>{order.orderStatus}</span>
                    : <span style={{ color: 'red', fontWeight: 'bold' }}>{order.orderStatus}</span>,
                actions: (
                    <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">
                        <i className="fa fa-eye"></i>
                    </Link>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>

            <MetaData title={'Đơn hàng của tôi'} />

            <div className="container mt-5">
                <h1 className="text-center mb-4">Đơn hàng của tôi</h1>

                {loading ? <Loader /> : (
                    <div className="table-responsive">
                        <MDBDataTableV5
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            searchTop
                            searchBottom={false}
                        />
                    </div>
                )}
            </div>

        </Fragment>
    );
};

export default ListOrders;
