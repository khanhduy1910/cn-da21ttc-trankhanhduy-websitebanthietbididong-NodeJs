import axios from 'axios';
import {
    ALL_PROMOTIONS_REQUEST,
    ALL_PROMOTIONS_SUCCESS,
    ALL_PROMOTIONS_FAIL,
    NEW_PROMOTION_REQUEST,
    NEW_PROMOTION_SUCCESS,
    NEW_PROMOTION_FAIL,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAIL,
    DELETE_PROMOTION_FAIL,
    DELETE_PROMOTION_SUCCESS,
    DELETE_PROMOTION_REQUEST,
    PROMOTION_DETAILS_REQUEST,
    PROMOTION_DETAILS_SUCCESS,
    PROMOTION_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
} from '../constants/promotionConstants'; // Đảm bảo lấy đúng từ promotionConstants.js

// Get all products (Admin)
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
// Get all promotions
export const getPromotions = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROMOTIONS_REQUEST });

        const response = await axios.get('/api/v1/admin/promotions');

        if (response && response.data) {
            dispatch({
                type: ALL_PROMOTIONS_SUCCESS,
                payload: response.data.promotions,
            });
        } else {
            throw new Error('Không nhận được dữ liệu từ server.');
        }
    } catch (error) {
        dispatch({
            type: ALL_PROMOTIONS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Create new promotion
export const createPromotion = (promotionData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PROMOTION_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/v1/admin/promotion/new', promotionData, config);

        dispatch({
            type: NEW_PROMOTION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PROMOTION_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
// Update promotion
export const updatePromotion = (id, promotionData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROMOTION_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.put(`/api/v1/admin/promotion/${id}`, promotionData, config);

        if (response && response.data) {
            dispatch({
                type: UPDATE_PROMOTION_SUCCESS,
                payload: response.data.success,
            });
        } else {
            throw new Error('Không thể cập nhật khuyến mãi.');
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PROMOTION_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deletePromotion = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROMOTION_REQUEST });

        const response = await axios.delete(`/api/v1/admin/promotion/${id}`);

        if (response && response.data) {
            dispatch({
                type: DELETE_PROMOTION_SUCCESS,
                payload: response.data.success,
            });
        } else {
            throw new Error('Không thể xóa khuyến mãi.');
        }
    } catch (error) {
        dispatch({
            type: DELETE_PROMOTION_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Get promotion details
export const getPromotionDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROMOTION_DETAILS_REQUEST });

        const response = await axios.get(`/api/v1/admin/promotion/${id}`);

        if (response && response.data) {
            dispatch({
                type: PROMOTION_DETAILS_SUCCESS,
                payload: response.data.promotion,
            });
        } else {
            throw new Error('Không thể lấy chi tiết khuyến mãi.');
        }
    } catch (error) {
        dispatch({
            type: PROMOTION_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
