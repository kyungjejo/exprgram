const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../dbconnection');
const async = require('async');

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

router.get('/searchVideo', (req, res) => {
    let search_term = '%'.concat(req.query.search_term.concat('%'));
    db.query("select youtube_id from video_video where subtitle_whole_lower Like ?", [search_term], (err, rows) => {
        if(!err) {
            console.log(rows.length);
            youtube_ids = []
            for(let i=0; i < rows.length; i++) {
                youtube_ids.push(rows[i].youtube_id)
            }
            console.log(youtube_ids);
            res.send(youtube_ids);
        } else {
            console.log(`querry error: ${err}`);
            res.send(err);
        }
    });
});

router.get('/getVideo', (req,res) => {
    db.query("select id from video_video where youtube_id = ?", [req.query.youtube_id], (err, rows) => {
        if(!err) {
            console.log(rows[0].id)
            db.query("select * from video_videoinfo where video_id = ?", [rows[0].id], (err, rows) => {
                if(!err) {
                    rows = eval(rows[0]);
                    console.log(typeof(rows))
                    rows['video_genre'] = eval(rows.video_genre)
                    rows['video_snippet'] = eval("("+rows.video_snippet+")")
                    rows['video_tags'] = eval(rows.video_tags)
                    rows['video_thumbnails'] = eval("("+rows.video_thumbnails+")")
                    res.send(rows);
                } else {
                    console.log(`query error : ${err}`);
                    res.send(err);
                }
            })
            
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    })
});

router.get('/getVideoCollection', (req, res) => {
    db.query("select youtube_id from video_video order by rand() limit 10", (err, rows) => {
        if(!err) {
            console.log(rows);
            youtube_ids = []
            for(let i=0; i < rows.length; i++) {
                youtube_ids.push(rows[i].youtube_id)
            }
            console.log(youtube_ids);
            res.send(youtube_ids);
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })
    /*db.query("select id from video_video limit 10", (err, rows) => {
        if(!err) {
            //res.send(rows);
            let result = [];
            let tasks = [];
            console.log(rows);
            
            for(let i=0; i < rows.length; i++) {
                tasks.push(
                    function(callback) {
                        db.query("select video_title from video_videoinfo where video_id = ?", [rows[i].id], (err2, title) => {
                            if(!err2) {
                                title = eval(title[0]);
                                console.log((title.video_title));
                                result.push((title.video_title));
                                callback(null, result);
                            } else {
                                console.log(`query error : ${err2}`);
                                res.send(err2);
                            }
                        });
                    }
                );
            }

            tasks.push(
                function(callback) {
                    console.log(result);
                    console.log("Test");
                    res.send(result);
                }
            );

            async.series(tasks, function (error, results) {
                if (error) console.log(error);
                else console.log(results);
            });
        } else {
            console.log(`query error: ${err}`);
            res.send(err);
        }
    })*/
});
    
    
module.exports = router;