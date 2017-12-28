const mongoose = require('mongoose');
var increment = require('mongoose-increment');
//Model customer schema
const CustomerSchema = new mongoose.Schema({
    _id:{
        type:String,
        require: true,
    },
    TenDayDu: {
        type: String,
        require: true,
    },
    TenVietTat: {
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
    DienThoai: {
        type: String,
        require: true,
    },
    SoFax: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        require: true,
    },
    Website: {
        type: String,
        require: true,
    },
    MoTaTomTat: {
        type: String,
        require: true,
    },
    ThuocDonViKD: {
        type: String,
        require: true,
    },
    ThuocChiNhanh: {
        type: String,
        require: true,
    },
    LaKHTiemNang: {
        type: Boolean,
        require: true,
    }
}, { collection: 'customers' }); //connect my collection

//increment id customer
CustomerSchema.plugin(increment,{
    type:String,
    modelName: 'Customer',
    fieldName: '_id',
    start: 0,
    increment: 1,
    prefix : 'KH'
});
const Customer = module.exports = mongoose.model('Customer', CustomerSchema);
