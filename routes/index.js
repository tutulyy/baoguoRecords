var express = require('express');
var router = express.Router();
var orderHttp = require('../servies/http');
/* GET home page. */
router.get('/woyouyizhixiaolaohu', function(req, res, next) {
    res.render('print', { title: 'Express' });
    //res.render('index', { title: 'Express' });
});
router.post('/order', function(req, res, next) {
    var orders = req.body.orders;
    console.log(orders);
    var orderList = orders.split(',');
    var order = orderList[0];
    orderHttp.getRecords(order, function (code , resMsg) {
        console.log(code);
        console.log(resMsg);
        if (code == 200){
            orderHttp.getWeight(order, function (weightCode , baoguoMsg){
                console.log(weightCode);
                //console.log(baoguoMsg);
                var resData = JSON.parse(resMsg);
                //console.log(resData);
                resData.Data.UseInfo.weight = 0.5;
                if (weightCode == 200){
                    var tempData = JSON.parse(baoguoMsg);
                    if(tempData.result.orderList.length > 0){
                        resData.Data.UseInfo.weight = tempData.result.orderList[0].weight;
                    }
                    //console.log(resData);
                    res.json({
                        code:200,
                        res:JSON.stringify(resData)
                    });
                }
                else {
                    res.json({
                        code:200,
                        res:JSON.stringify(resData)
                    });
                }
            })
        }
        else {
            res.json({
                code:4004,
                res:resMsg
            });
        }
    });
});
module.exports = router;
