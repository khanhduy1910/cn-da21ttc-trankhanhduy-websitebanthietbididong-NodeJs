import React from 'react';
import { Link } from 'react-router-dom';

const Promotion = ({ promotion, col }) => {
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
                {/* Promotion title */}
                <h5
                    className="card-title text-center"
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#ff4747',
                        marginBottom: '15px',
                        textTransform: 'uppercase',
                    }}
                >
                    {promotion.title}
                </h5>

                {/* Promotion description */}
                <p
                    className="card-text text-center"
                    style={{
                        fontSize: '14px',
                        color: '#555',
                        marginBottom: '10px',
                    }}
                >
                    {promotion.description}
                </p>

                {/* Discount percentage */}
                <p
                    className="card-text text-center"
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#e60000',
                        marginBottom: '15px',
                    }}
                >
                    Giảm {promotion.discount}%!
                </p>

                {/* Date range */}
                <div
                    className="text-center"
                    style={{
                        fontSize: '12px',
                        color: '#777',
                        marginBottom: '15px',
                    }}
                >
                    <p>Bắt đầu: {new Date(promotion.startDate).toLocaleDateString()}</p>
                    <p>Kết thúc: {new Date(promotion.endDate).toLocaleDateString()}</p>
                </div>

                {/* Promotion usage */}
                <div
                    className="text-center"
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '15px',
                    }}
                >
                    <p>Đã sử dụng: {promotion.timesUsed} lần</p>
                    <p>
                        {promotion.usageLimit > 0
                            ? `Giới hạn: ${promotion.usageLimit} lần`
                            : 'Không giới hạn'}
                    </p>
                </div>

                {/* View details button */}
                <div className="text-center">
                    <Link
                        to={`/promotion/${promotion._id}`}
                        style={{
                            display: 'inline-block',
                            marginTop: '10px',
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

export default Promotion;
