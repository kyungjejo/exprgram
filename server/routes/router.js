const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../dbconnection');

/* GET home page. */
router.get('/api/getUsername', (req, res, next) => {
    res.send({ username: os.userInfo().username });
});

router.get('/getData', (req, res) => {
    db.query("select youtube_id from video_video", (err, rows) => {
        if (!err) {
            res.send(rows);
            console.log(rows);
        } else {
            console.log(`query error : ${err}`);
            // res.send(err);
            res.send(err);
        }
    });
});
    
    
module.exports = router;