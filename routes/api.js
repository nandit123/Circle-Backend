const express = require('express');
const router = express.Router();
const mainFunction = require('../controller/create_new_account');

router.get('/create_account',(req,res) => {
    //console.log("Public Key");
    //console.log(new_account.pair.publicKey());
    mainFunction().then((responseJSON) => {
        console.log(responseJSON);
        res.send({'Response 200':'Success'});
    });
});

router.post('/bod',(req,res) => {
    console.log(req.body);
    res.send({'api':"hfdakj"});
});

module.exports = router;