import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminProductsReducer } from './reducers/productReducers';
import {
    productsReducer,
    newProductReducer,
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer,
} from './reducers/productReducers';

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from './reducers/userReducers';

import { cartReducer } from './reducers/cartReducers';

import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
} from './reducers/orderReducers';

import {
    promotionsReducer,
    promotionReducer,
    newPromotionReducer,
    promotionDetailsReducer,
    updatePromotionReducer,
} from './reducers/promotionReducer';

const reducer = combineReducers({
    products: productsReducer,
    adminProducts: adminProductsReducer, // Thêm reducer adminProducts
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    promotions: promotionsReducer,
    promotion: promotionReducer,
    newPromotion: newPromotionReducer,
    promotionDetails: promotionDetailsReducer,
    updatePromotion: updatePromotionReducer,
});

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
