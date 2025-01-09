import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import { orderReducer } from './orderReducers';
import { productReducer } from './productReducers';
import { PromotionReducer } from './promotionReducer';
import { userReducer } from './userReducers';

// Kết hợp các reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer,
    promotions: PromotionReducer, // Thêm reducer khuyến mãi
    user: userReducer,
});

export default rootReducer;
