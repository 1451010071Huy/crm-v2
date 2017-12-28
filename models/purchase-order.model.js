const mongoose = require('mongoose');
var increment = require('mongoose-increment');
//Model customer schema
const PurchaseOrderSchema = new mongoose.Schema({
    SoHopDong: {
        type: String,
        require: true,
    },
    NgayKy: {
        type: String,
        require: true,
    },
    NgayBatDau: {
        type: String,
        require: true,
    },
    NgayKetThuc: {
        type: String,
        require: true,
    },
    GiaTriHopDong: {
        type: Number,
        require: true,
    },
    KyThanhToan: {
        type: Object,
        require: true,
    },
    KhachHang: {
        type: String,
        require: true,
    },
    NguoiLienHe: {
        type: String,
        require: true,
    },
    DiaChi: {
        type: String,
        require: true,
    },
    //Nhan vien phu trach hop dong
    AM: {
        type: String,
        require: true,
    },
    NoiDungHopDong: {
        type: String,
        require: true,
    },
    FileHopDong: {
        type: Array
    },
    ThongTinKhac: {
        type: String
    }
}, { collection: 'purchase-order' }); //connect my collection


const PurchaseOrder = module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
