import {
    ALL_PROMOTIONS_REQUEST,
    ALL_PROMOTIONS_SUCCESS,
    ALL_PROMOTIONS_FAIL,
    NEW_PROMOTION_REQUEST,
    NEW_PROMOTION_SUCCESS,
    NEW_PROMOTION_FAIL,
    NEW_PROMOTION_RESET,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAIL,
    UPDATE_PROMOTION_RESET,
    DELETE_PROMOTION_REQUEST,
    DELETE_PROMOTION_SUCCESS,
    DELETE_PROMOTION_FAIL,
    DELETE_PROMOTION_RESET,
    PROMOTION_DETAILS_REQUEST,
    PROMOTION_DETAILS_SUCCESS,
    PROMOTION_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    
} from '../constants/promotionConstants';

const initialState = {
    promotions: [],
    loading: false,
    error: null,
    success: false,
};
export const adminProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCTS_REQUEST:
            return { loading: true, products: [] };
        case ADMIN_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload };
        case ADMIN_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};


export const promotionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PROMOTIONS_REQUEST:
            return { ...state, loading: true, error: null };
        case ALL_PROMOTIONS_SUCCESS:
            return { ...state, loading: false, promotions: action.payload };
        case ALL_PROMOTIONS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const newPromotionReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PROMOTION_REQUEST:
            return { loading: true };
        case NEW_PROMOTION_SUCCESS:
            return { loading: false, success: true, promotion: action.payload };
        case NEW_PROMOTION_FAIL:
            return { loading: false, error: action.payload };
        case NEW_PROMOTION_RESET:
            return {};
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const promotionReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PROMOTION_REQUEST:
        case NEW_PROMOTION_REQUEST:
            return { ...state, loading: true };
        case NEW_PROMOTION_SUCCESS:
            return { ...state, loading: false, success: true, promotion: action.payload };
        case DELETE_PROMOTION_SUCCESS:
            return { ...state, loading: false, success: true };
        case NEW_PROMOTION_FAIL:
        case DELETE_PROMOTION_FAIL:
            return { ...state, loading: false, error: action.payload };
        case DELETE_PROMOTION_RESET:
            return { ...state, success: false };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const updatePromotionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROMOTION_REQUEST:
            return { loading: true };
        case UPDATE_PROMOTION_SUCCESS:
            return { loading: false, isUpdated: true };
        case UPDATE_PROMOTION_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_PROMOTION_RESET:
            return { isUpdated: false };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const promotionDetailsReducer = (state = { promotion: {} }, action) => {
    switch (action.type) {
        case PROMOTION_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PROMOTION_DETAILS_SUCCESS:
            return { loading: false, promotion: action.payload };
        case PROMOTION_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};
