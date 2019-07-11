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

router.get('/getVideoSubtitles', (req, res) => {
    db.query("select subtitle_list from video_video where youtube_id = ?", [req.query.youtube_id], (err, rows) => {
        if (!err) {
            rows = eval(rows[0].subtitle_list)
            res.send(rows);
        } else {
            console.log(`query error : ${err}`);
            // res.send(err);
            res.send(err);
        } 
    });
});
    
    
module.exports = router;