import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions, deletePromotion, clearErrors } from '../../actions/promotionActions';
import { DELETE_PROMOTION_RESET } from '../../constants/promotionConstants';

const PromotionsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, promotions = [] } = useSelector(state => state.promotions);
    const { error: deleteError, isDeleted } = useSelector(state => state.promotion);

    useEffect(() => {
        // Lấy danh sách khuyến mãi
        dispatch(getPromotions());

        // Xử lý lỗi
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        // Xử lý trạng thái xóa thành công
        if (isDeleted) {
            alert.success('Khuyến mãi đã được xóa thành công!');
            history.push('/admin/promotions');
            dispatch({ type: DELETE_PROMOTION_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    // Xử lý xóa khuyến mãi
    const deletePromotionHandler = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
            dispatch(deletePromotion(id));
        }
    };

    // Chuẩn bị dữ liệu cho bảng khuyến mãi
    const setPromotions = () => {
        const data = {
            columns: [
                { label: 'Tiêu đề', field: 'title', sort: 'asc' },
                { label: 'Số % giảm giá', field: 'discount', sort: 'asc' },
                { label: 'Trạng thái', field: 'status', sort: 'asc' },
                { label: 'Đã sử dụng', field: 'used', sort: 'asc' },
                { label: 'Ngày bắt đầu', field: 'startDate', sort: 'asc' },
                { label: 'Ngày kết thúc', field: 'endDate', sort: 'asc' },
                { label: 'Hành động', field: 'actions' },
            ],
            rows: [],
        };

        promotions.forEach((promotion) => {
            const isActive =
                new Date(promotion.startDate) <= new Date() &&
                new Date(promotion.endDate) >= new Date();

            data.rows.push({
                title: promotion.title || 'N/A',
                discount: `${promotion.discount || 0}%`,
                status: isActive ? (
                    <span className="badge badge-success">Đang khuyến mãi</span>
                ) : (
                    <span className="badge badge-danger">Đã hết khuyến mãi</span>
                ),
                used: `${promotion.timesUsed || 0} / ${promotion.usageLimit || 'Không giới hạn'}`,
                startDate: promotion.startDate
                    ? new Date(promotion.startDate).toLocaleDateString()
                    : 'N/A',
                endDate: promotion.endDate
                    ? new Date(promotion.endDate).toLocaleDateString()
                    : 'N/A',
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/promotion/${promotion._id}`}
                            className="btn btn-primary py-1 px-2"
                            title="Sửa khuyến mãi"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deletePromotionHandler(promotion._id)}
                            title="Xóa khuyến mãi"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title="Danh sách khuyến mãi" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="my-4">Danh sách khuyến mãi</h1>
                            <Link to="/admin/promotion/new" className="btn btn-primary">
                                + Thêm khuyến mãi mới
                            </Link>
                        </div>

                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div className="alert alert-danger text-center">{error}</div>
                        ) : promotions.length === 0 ? (
                            <div className="alert alert-info text-center">
                                Không có khuyến mãi nào.
                            </div>
                        ) : (
                            <MDBDataTable
                                data={setPromotions()}
                                bordered
                                striped
                                hover
                                responsive
                                className="table-container"
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default PromotionsList;
