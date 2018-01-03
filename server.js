const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const routeCustosmer = require('./routes/customer.route')
const routerPurchaseOrder = require('./routes/purchase-order.router')
const cors = require('cors');
var multer = require('multer');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
/*fix DeprecationWarning: 
Mongoose: mpromise (mongoose's default promise library) is deprecated,
plug in your own promise library instead: http://mongoosejs.com/docs/promises.html*/
mongoose.connect('mongodb://crmfpt:crmfpt@ds125994.mlab.com:25994/crm', { useMongoClient: true });
mongoose.connection.on("connected", () => {
    console.log("connected to database crm mlab");
})
mongoose.connection.on("error", (err) => {
    if (err) {
        console.log("Error in database connection" + err);
    }
})

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));


app.get('/uploads/:filename', (req, res, err) => {
    res.sendFile(path.join(__dirname, './uploads', req.params.filename));
});

app.use('/api', routeCustosmer)
app.use('/api', routerPurchaseOrder)
app.use(function (req, res, next) {//allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/', (req, res, next )=> {
    consolelog('connected server')
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// })

app.listen(port, () => {
    console.log('connect started at port : ' + port);
})