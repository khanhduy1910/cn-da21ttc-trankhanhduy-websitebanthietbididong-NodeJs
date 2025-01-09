import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import Search from './Search';
import '../../App.css';

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Đăng xuất thành công');
    };

    return (
        <Fragment>
            <nav className="navbar row" style={{ backgroundColor: '#90c1ff' }}>
                {/* Logo Section */}
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" alt="Logo" className="img-fluid" />
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                {/* User Actions */}
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {user && user.role === 'admin' ? null : (
                        <Link to="/cart" className="cart-link">
                            <span id="cart" className="ml-3">Giỏ hàng</span>
                            <span id="cart_count">
                                <i className="bi bi-cart4"></i>
                                {cartItems.length}
                            </span>
                        </Link>
                    )}

                    {/* Dropdown for User */}
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link
                                to="#!"
                                className="btn dropdown-toggle text-white mr-4"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user.role === 'admin' ? (
                                    <Link className="dropdown-item" to="/dashboard">Trang quản trị</Link>
                                ) : (
                                    <Link className="dropdown-item" to="/orders/me">Đơn đặt hàng</Link>
                                )}
                                <Link className="dropdown-item" to="/me">Thông tin cá nhân</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Đăng xuất
                                </Link>
                            </div>
                        </div>
                    ) : !loading && (
                        <Link to="/login" className="btn ml-4" id="login_btn">Đăng nhập</Link>
                    )}
                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
