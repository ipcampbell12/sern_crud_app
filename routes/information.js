const express = require('express');
const routerInfo = express.Router();
const { getPeopleCount } = require('../queries');



routerInfo.get('/count', (req, res) => {
    try {
        getPeopleCount(res);
    } catch (err) {
        console.log(err.message)
    }
});

module.exports = routerInfo;