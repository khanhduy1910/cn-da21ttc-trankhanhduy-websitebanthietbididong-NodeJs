const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tên chương trình khuyến mãi không được để trống'],
        trim: true,
        maxLength: [100, 'Tên chương trình không được vượt quá 100 ký tự']
    },
    description: {
        type: String,
        required: [true, 'Mô tả chương trình khuyến mãi không được để trống'],
    },
    discount: {
        type: Number,
        required: [true, 'Phần trăm giảm giá không được để trống'],
        min: [0, 'Phần trăm giảm giá không được nhỏ hơn 0'],
        max: [100, 'Phần trăm giảm giá không được vượt quá 100']
    },
    startDate: {
        type: Date,
        required: [true, 'Ngày bắt đầu không được để trống'],
    },
    endDate: {
        type: Date,
        required: [true, 'Ngày kết thúc không được để trống'],
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],
    usageLimit: {
        type: Number,
        default: 0, // 0 nghĩa là không giới hạn số lần sử dụng
    },
    timesUsed: {
        type: Number,
        default: 0, // Số lần khuyến mãi đã được áp dụng
    },
    isActive: {
        type: Boolean,
        default: true, // Khuyến mãi mặc định là đang hoạt động
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Promotion', promotionSchema);
