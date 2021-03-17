const router = require('express').Router();
const config = require('../config2/config');
const {cnc} = require('../config2/connection');
const mysql = require('mysql2/promise');
const {tableList, describeTable} = require('../database/indexqueries')

console.log(config)

router.get('/show/tables', (req, res)=>{
    cnc(mysql,config, tableList()).then(response=>{
        let tables = response.rows;
        res.status(200).json({tables, success: true})
    }).catch(err => {
        res.status(400).json({ msg: err, success: false });
    })
});

router.get('/describe/table', (req, res)=>{
    cnc(mysql,config, describeTable()).then(response=>{
        let type_coin = response.rows;
        res.status(200).json({type_coin, success: true})
    }).catch(err => {
        res.status(400).json({ msg: err, success: false });
    })
});

module.exports = router;