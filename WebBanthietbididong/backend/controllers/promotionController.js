const Promotion = require('../models/Promotion');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new promotion   =>   /api/v1/admin/promotion/new
exports.newPromotion = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const promotion = await Promotion.create(req.body);

    res.status(201).json({
        success: true,
        promotion,
    });
});

// Get all promotions (public)   =>   /api/v1/promotions
exports.getPromotions = catchAsyncErrors(async (req, res, next) => {
    const promotions = await Promotion.find({ isActive: true }).sort({ startDate: -1 });

    res.status(200).json({
        success: true,
        promotions,
    });
});

// Get all promotions (Admin)   =>   /api/v1/admin/promotions
exports.getAdminPromotions = catchAsyncErrors(async (req, res, next) => {
    const promotions = await Promotion.find();

    res.status(200).json({
        success: true,
        promotions,
    });
});

// Get single promotion details   =>   /api/v1/admin/promotion/:id
exports.getSinglePromotion = catchAsyncErrors(async (req, res, next) => {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
        return next(new ErrorHandler('Không tìm thấy khuyến mãi', 404));
    }

    res.status(200).json({
        success: true,
        promotion,
    });
});

// Update promotion   =>   /api/v1/admin/promotion/:id
exports.updatePromotion = catchAsyncErrors(async (req, res, next) => {
    let promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
        return next(new ErrorHandler('Không tìm thấy khuyến mãi', 404));
    }

    promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        promotion,
    });
});

// Delete promotion   =>   /api/v1/admin/promotion/:id
exports.deletePromotion = catchAsyncErrors(async (req, res, next) => {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
        return next(new ErrorHandler('Không tìm thấy khuyến mãi', 404));
    }

    await promotion.remove();

    res.status(200).json({
        success: true,
        message: 'Xóa khuyến mãi thành công',
    });
});
