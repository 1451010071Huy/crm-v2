const express = require('express');
const routerPurchaseOrder = express.Router();
const PurchaseOrder = require('../models/purchase-order.model')// class customer schema
var multer = require('multer');
var fs = require('fs');
//get purchase-order

routerPurchaseOrder.get('/purchase-orders', (req, res, next) => {
    PurchaseOrder.find(function (err, PurchaseOrder) {
        res.json(PurchaseOrder);
    })
})

//add Purchase Order
routerPurchaseOrder.post('/purchase-order', (req, res, next) => {
    let newPurchaseOrder = new PurchaseOrder({
        SoHopDong: req.body.SoHopDong,
        NgayKy: req.body.NgayKy,
        NgayBatDau: req.body.NgayBatDau,
        NgayKetThuc: req.body.NgayKetThuc,
        GiaTriHopDong: req.body.GiaTriHopDong,
        KyThanhToan: req.body.KyThanhToan,
        KhachHang: req.body.KhachHang,
        NguoiLienHe: req.body.NguoiLienHe,
        DiaChi: req.body.DiaChi,
        AM: req.body.AM,
        FileHopDong: [],
        NoiDungHopDong: req.body.NoiDungHopDong,
        ThongTinKhac: req.body.ThongTinKhac,
    });
    newPurchaseOrder.save((err, purchaseOrder) => {
        if (err) {
            res.json({ msg: 'failed to add customer' });
            console.log(err);
        } else {
            res.json({ msg: 'customer added successfully', record: purchaseOrder });

        }
    });
});

//delete purchase order and delete file item
routerPurchaseOrder.delete('/purchase-order/:id', (req, res, next) => {
    PurchaseOrder.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            result.FileHopDong.forEach(file => {
                var path = file.path;
                fs.unlink(path, function (err) {
                    if (err)
                        console.log(err);
                    else
                        console.log("Deleted file" + path);
                })
            })
            res.json(result);
        }
    }, { new: true })
})
//update purchase order
routerPurchaseOrder.put('/purchase-order/:id', (req, res, next) => {
    PurchaseOrder.update({ _id: req.params.id }, req.body, (err, rawData) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Update success");
        }
    })
})
//----------------------------------------
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {//check directory 
            fs.mkdirSync('uploads');
        }
        cb(null, './uploads/');
    },
    //file name 
    filename: function (req, file, cb) {
        var datetimestamp = "";
        var currentTime = new Date();
        var day = currentTime.getDate().toString();
        var month = currentTime.getMonth().toString();
        var year = currentTime.getFullYear().toString();
        var hours = currentTime.getHours().toString();
        var minutes = currentTime.getMinutes().toString();
        var seconds = currentTime.getSeconds().toString();
        datetimestamp += day + month + year + "-" + hours + minutes + seconds;
        //  cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        cb(null, datetimestamp + "-" + file.originalname);// return full name file
    }

});

var upload = multer({ //multer settings
    storage: storage
}).any();

/** API path that will upload and new purchase order the files */
routerPurchaseOrder.post('/purchase-order/upload/:id', function (req, res) {
    console.log(req.params.id);
    PurchaseOrder.findById(req.params.id, function (err, doc) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        } else if (doc == null) {
            res.json({ error_code: 2, err_desc: err });
            return;
        }
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 3, err_desc: err });
                return;
            }
            console.log(req.files);
            PurchaseOrder.findByIdAndUpdate(req.params.id, {
                $pushAll: { FileHopDong: req.files }
            }, { new: true }, function (err, doc) {
                if (err) {
                    res.json({ error_code: 4, err_desc: err });
                    return;
                } else if (doc == null) {
                    /*delete all files */
                    req.files.forEach(function (file) {
                        fs.unlink(file.path, function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        });
                    })
                    res.json({ error_code: 5, err_desc: err });
                    return;
                }
                res.json({mgs: "add success files",err_desc: null, obj: doc});
            })
        });

    })

});

//deleted file item
routerPurchaseOrder.delete('/purchase-order/:id/:filename', function (req, res) {
    let filename = req.params.filename;

    PurchaseOrder.findById(req.params.id, function (err, doc) {
        if (err) {
            res.json({ error_code: 1, err_desc: err, msg: "id not found" });
            return;
        } else if (doc == null) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        fs.unlink('./uploads/' + filename, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        })
        doc.FileHopDong.splice(doc.FileHopDong.findIndex(file => file.filename === filename), 1)
        doc.save((err, newDoc) => {

            if (err) throw err;
            res.json({ mgs: "Success" })

        })
    })
})
module.exports = routerPurchaseOrder;

