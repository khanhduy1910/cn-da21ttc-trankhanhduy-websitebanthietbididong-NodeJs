import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div
                className="card p-3 rounded"
                style={{
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
                }}
            >
                {/* New product label */}
                {product.isNew && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: '#ff4747',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            zIndex: 10,
                            textTransform: 'uppercase',
                        }}
                    >
                        Mới
                    </span>
                )}

                {/* Product image */}
                <Link to={`/product/${product._id}`} style={{ position: 'relative' }}>
                    <img
                        className="card-img-top"
                        src={product.images[0]?.url}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                    />
                </Link>

                {/* Product details */}
                <div className="card-body text-center">
                    {/* Special offer banner */}
                    {product.specialOffer && (
                        <span
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#ff4747',
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {product.specialOffer}
                        </span>
                    )}

                    {/* Product name */}
                    <h5
                        className="card-title"
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#333',
                            margin: '10px 0',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <Link
                            to={`/product/${product._id}`}
                            style={{
                                textDecoration: 'none',
                                color: '#333',
                            }}
                        >
                            {product.name}
                        </Link>
                    </h5>

                    {/* Product price */}
                    <p
                        className="card-text mt-2"
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#e60000',
                        }}
                    >
                        {product.price.toLocaleString()}đ
                    </p>

                    {/* Product rating */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            gap: '5px',
                            marginTop: '10px',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#ffc107',
                            }}
                        >
                            ★
                        </span>
                        <span
                            style={{
                                fontSize: '14px',
                                color: '#555',
                            }}
                        >
                            {product.ratings ? product.ratings.toFixed(1) : '0'}
                        </span>
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#888',
                            }}
                        >
                            ({product.numOfReviews} đánh giá)
                        </span>
                    </div>

                    {/* View details button */}
                    <Link
                        to={`/product/${product._id}`}
                        style={{
                            display: 'inline-block',
                            marginTop: '15px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
