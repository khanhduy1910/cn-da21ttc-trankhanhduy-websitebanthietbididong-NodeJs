import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import TopSellingProducts from '../product/TopSellingProducts';
const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);
<div className="admin-section">
    <TopSellingProducts />
</div>
    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Sản phẩm đã được xóa thành công!');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const deleteProductHandler = id => {
        dispatch(deleteProduct(id));
    };

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Tên sản phẩm',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Giá',
                    field: 'price',
                    sort: 'asc',
                },
                {
                    label: 'Số lượng còn lại',
                    field: 'stock',
                    sort: 'asc',
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: [],
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${product.price.toLocaleString()} VNĐ`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/product/${product._id}`}
                            style={{
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                marginRight: '10px',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = '#45A049')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = '#4CAF50')
                            }
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            style={{
                                backgroundColor: '#F44336',
                                color: '#fff',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = '#E53935')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = '#F44336')
                            }
                            onClick={() => deleteProductHandler(product._id)}
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
            <MetaData title="Tất cả sản phẩm" />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '0 0 20%' }}>
                    <Sidebar />
                </div>

                <div
                    style={{
                        flex: '1',
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            Danh sách sản phẩm
                        </h1>
                        <Link
                            to="/admin/product"
                            style={{
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = '#0056b3')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = '#007BFF')
                            }
                        >
                            + Thêm sản phẩm mới
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <MDBDataTable
                            data={setProducts()}
                            bordered
                            striped
                            hover
                            style={{
                                background: '#ffffff',
                                borderRadius: '10px',
                                padding: '20px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsList;
