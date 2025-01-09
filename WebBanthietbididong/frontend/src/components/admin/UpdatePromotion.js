import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePromotion, getPromotionDetails, clearErrors } from '../../actions/promotionActions';
import { UPDATE_PROMOTION_RESET } from '../../constants/promotionConstants';

const UpdatePromotion = ({ match, history }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, promotion } = useSelector((state) => state.promotionDetails || {});
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.updatePromotion || {});

    const promotionId = match.params.id;

    useEffect(() => {
        // Nếu ID không hợp lệ hoặc không tìm thấy khuyến mãi
        if (!promotionId || promotionId === 'new') {
            history.push('/admin/promotions');
            return;
        }

        // Lấy chi tiết khuyến mãi hoặc thiết lập dữ liệu
        if (!promotion._id || promotion._id !== promotionId) {
            dispatch(getPromotionDetails(promotionId));
        } else {
            setTitle(promotion.title || '');
            setDescription(promotion.description || '');
            setStartDate(promotion.startDate ? promotion.startDate.substring(0, 10) : '');
            setEndDate(promotion.endDate ? promotion.endDate.substring(0, 10) : '');
            setDiscount(promotion.discount || 0);
            setQuantity(promotion.quantity || 0);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Khuyến mãi được cập nhật thành công!');
            history.push('/admin/promotions');
            dispatch({ type: UPDATE_PROMOTION_RESET });
        }
    }, [dispatch, promotionId, promotion, error, updateError, isUpdated, history, alert]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
            title,
            description,
            startDate,
            endDate,
            discount,
            quantity,
        };

        dispatch(updatePromotion(promotionId, formData));
    };

    return (
        <Fragment>
            <MetaData title="Cập nhật Khuyến mãi" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    {loading ? (
                        <div className="text-center">Đang tải...</div>
                    ) : (
                        <Fragment>
                            <div className="wrapper my-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mb-4">Cập nhật Khuyến mãi</h1>

                                    <div className="form-group">
                                        <label htmlFor="title_field">Tên chương trình</label>
                                        <input
                                            type="text"
                                            id="title_field"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description_field">Miêu tả</label>
                                        <textarea
                                            className="form-control"
                                            id="description_field"
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="start_date_field">Thời gian bắt đầu</label>
                                        <input
                                            type="date"
                                            id="start_date_field"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="end_date_field">Thời gian kết thúc</label>
                                        <input
                                            type="date"
                                            id="end_date_field"
                                            className="form-control"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="discount_field">Số % giảm giá</label>
                                        <input
                                            type="number"
                                            id="discount_field"
                                            className="form-control"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity_field">Số lượng khuyến mãi</label>
                                        <input
                                            type="number"
                                            id="quantity_field"
                                            className="form-control"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="save_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xử lý...' : 'Cập nhật'}
                                    </button>
                                </form>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePromotion;
