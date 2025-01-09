const express = require('express');
const router = express.Router();

const {
    getPromotions,
    getAdminPromotions,
    newPromotion,
    getSinglePromotion,
    updatePromotion,
    deletePromotion,
} = require('../controllers/promotionController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Lấy danh sách khuyến mãi (người dùng & admin)
router.route('/promotions').get(getPromotions);

// Lấy danh sách khuyến mãi (chỉ admin)
router.route('/admin/promotions').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminPromotions);

// Lấy thông tin chi tiết một khuyến mãi
router.route('/admin/promotion/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSinglePromotion);

// Tạo mới khuyến mãi
router.route('/admin/promotion/new').post(isAuthenticatedUser, authorizeRoles('admin'), newPromotion);

// Cập nhật và xóa khuyến mãi
router.route('/admin/promotion/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updatePromotion)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deletePromotion);

module.exports = router;
