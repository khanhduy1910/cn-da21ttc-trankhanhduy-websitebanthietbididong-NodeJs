import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { createPromotion, clearErrors } from '../../actions/promotionActions';
import { getAdminProducts } from '../../actions/productActions';
import { NEW_PROMOTION_RESET } from '../../constants/promotionConstants';

const NewPromotion = ({ history }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productIds, setProductIds] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.newPromotion);
    const { products } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Khuyến mãi được tạo thành công!');
            history.push('/admin/promotions');
            dispatch({ type: NEW_PROMOTION_RESET });
        }
    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Combine selected product IDs with manually entered IDs
        const manualIds = productIds
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        const combinedProductIds = Array.from(new Set([...selectedProducts, ...manualIds]));

        const formData = {
            title,
            description,
            startDate,
            endDate,
            discount,
            quantity,
            products: combinedProductIds,
        };

        dispatch(createPromotion(formData));
    };

    const handleProductChange = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    return (
        <Fragment>
            <MetaData title="Thêm khuyến mãi mới" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Thêm khuyến mãi mới</h1>
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
                                    <label htmlFor="start_date_field">Ngày bắt đầu</label>
                                    <input
                                        type="date"
                                        id="start_date_field"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="end_date_field">Ngày kết thúc</label>
                                    <input
                                        type="date"
                                        id="end_date_field"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sản phẩm áp dụng</label>
                                    {products &&
                                        products.map((product) => (
                                            <div key={product._id} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={product._id}
                                                    id={`product_${product._id}`}
                                                    onChange={() => handleProductChange(product._id)}
                                                />
                                                <label className="form-check-label" htmlFor={`product_${product._id}`}>
                                                    {product.name}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product_ids_field">Nhập thêm ID sản phẩm</label>
                                    <input
                                        type="text"
                                        id="product_ids_field"
                                        className="form-control"
                                        placeholder="Nhập ID sản phẩm, cách nhau bằng dấu phẩy"
                                        value={productIds}
                                        onChange={(e) => setProductIds(e.target.value)}
                                    />
                                    <small className="form-text text-muted">
                                        Ví dụ: "id1, id2, id3"
                                    </small>
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
                                    <label htmlFor="quantity_field">Số lượng giảm giá</label>
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
                                    {loading ? 'Đang xử lý...' : 'Thêm mới'}
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default NewPromotion;
