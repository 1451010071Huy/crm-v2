const express = require('express');
const routeCustosmer = express.Router();
const Customer = require('../models/customer.model')// class customer schema

//get customers
routeCustosmer.get('/customers', (req, res, next) => {
    Customer.find(function (err, customers) {
        res.json(customers);
    })
})
//get customer
routeCustosmer.get('/customer/detail/:id', (req, res, next)=>{
    Customer.findById(req.params.id, (err, customer)=>{
        //console.log(customer)
        res.json(customer);
    })
})

//add customer
routeCustosmer.post('/customer', (req, res, next) => {
    let newCustomer = new Customer({
        TenDayDu: req.body.TenDayDu,
        TenVietTat: req.body.TenVietTat,
        NguoiLienHe: req.body.NguoiLienHe,
        DiaChi: req.body.DiaChi,
        DienThoai: req.body.DienThoai,
        SoFax: req.body.SoFax,
        Email: req.body.Email,
        Website: req.body.Website,
        MoTaTomTat: req.body.MoTaTomTat,
        ThuocDonViKD: req.body.ThuocDonViKD,
        ThuocChiNhanh: req.body.ThuocChiNhanh,
        LaKHTiemNang: req.body.LaKHTiemNang,
    });
    newCustomer.save((err, customer) => {
        if (err) {
            res.json({ msg: 'failed to add customer' });    
        } else {
            res.json({ msg: 'customer added successfully' });
        }
    });
});

//delete customer
routeCustosmer.delete('/customer/:id',(req, res, next)=>{
    //logic to add contact
    Customer.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);  
        }else{
            res.json(result);
        }
    })
})

//update contact
routeCustosmer.put('/customer/:id',(req, res, next)=>{
    console.log("server > PUT ", req.params.id);
    console.log("server > PUT ", req.body)
    Customer.update({_id:req.params.id}, req.body, (err, rawData)=>{
        if(err){
            res.json(err);  
        }else{
            res.json("Update success");
        }
    })
})
module.exports = routeCustosmer;

