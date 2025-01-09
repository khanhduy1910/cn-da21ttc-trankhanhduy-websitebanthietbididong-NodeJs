import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';

import Sliderr from '../components/layout/Slider'
import TopSellingProducts from './product/TopSellingProducts';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000000])
    const [category, setCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('') // State for selected category
    const [rating, setRating] = useState(0)

    const categories = [
        {
            name: 'Điện thoại',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mobile-Smartphone-icon.png',
        },
        {
            name: 'Laptop',
            icon: 'https://thumbs.dreamstime.com/b/laptop-line-icon-flat-style-vector-app-ui-websites-black-icon-vector-illustration-laptop-line-icon-flat-style-vector-167117095.jpg',
        },
        {
            name: 'Đồng hồ thông minh',
            icon: 'https://png.pngtree.com/png-clipart/20230925/original/pngtree-smartwatch-with-heart-rate-icon-vector-illustration-wristband-sport-wrist-vector-png-image_12869450.png',
        },
        {
            name: 'Linh kiện',
            icon: 'https://lh3.googleusercontent.com/proxy/2WCGjMiNbXWig5ry61TgsVT9UEqV1Mk8DAPUCEvtDqWxlSX8rTRFzJh7jkJ5bm24ZKbDn1MINzOIFu_rv2JbcInKBRzi6SzQ0kAFTjaKD_px-jftoh4YWTM3q2wHzA',
        },
        {
            name: 'Khác',
            icon: 'https://png.pngtree.com/png-clipart/20231003/original/pngtree-line-version-of-digital-computer-hardware-icon-vector-png-image_13074827.png',
        },
    ];
    

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }

    return (
        <Fragment>
            {/* Danh mục sản phẩm */}
            <div id="products_heading" className='container container-fluid'>
            <ul
    id="ul_top_hypers"
    style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 0',
        margin: '0 auto',
        listStyleType: 'none',
        backgroundColor: '#90c1ff',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 2,
        position: 'relative',
        marginTop: '-40px',
    }}
>
    {categories.map(({ name, icon }, index) => (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '10px 15px',
                backgroundColor: selectedCategory === name ? '#dcdcdc' : 'transparent',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
            }}
            key={name}
            onClick={() => {
                setCategory(name);
                setSelectedCategory(name);
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#90c1ff';
                e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = selectedCategory === name ? '#dcdcdc' : 'transparent';
                e.target.style.transform = 'scale(1)';
            }}
        >
            {/* Icon minh họa */}
            <img
                src={icon}
                alt={`${name} icon`}
                style={{
                    width: '24px',
                    height: '24px',
                }}
            />
            {/* Tên danh mục */}
            <span
                style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: '16px',
                }}
            >
                {name}
            </span>
        </li>
    ))}
</ul>

</div>

    
            {/* Slider */}
            <Sliderr />
    {/* Top 8 Sản Phẩm Bán Chạy */}
<TopSellingProducts />
            <br />
            <h2 className="text-center mb-4">Sản phẩm mới nhất</h2>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Website bán hàng trực tuyến'} />
    
                    <section id="products" className="container mt-5">
                        {<div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
    
                                        <div className="px-5">
                                            <h4 className="mb-5">
                                                Khoảng giá
                                            </h4>
                                            <Range
                                                marks={{
                                                    10000: `10.000`,
                                                    1000000: `1.000.000`,
                                                    100000000: '100.000.000',
                                                    1000000000: '1.000.000.000'
                                                }}
                                                min={10}
                                                max={100000000000}
                                                defaultValue={[1, 100000000000]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            <br />
                                            <hr className="my-3" />
    
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Đánh giá
                                                </h4>
    
                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
    
                                        </div>
                                    </div>
    
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}
    
                        </div>}
                    </section>
    
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Tiếp'}
                                prevPageText={'Trở về'}
                                firstPageText={'Đầu tiên'}
                                lastPageText={'Cuối cùng'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
    
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
