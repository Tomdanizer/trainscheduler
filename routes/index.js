var express = require('express');
var router = express.Router();
var db = require('../mysql.js');

/*
 *  Get index page page initial query request of all train schedules
 */
router.get('/', function(req, res) {
    db.getAll(function(err, schedules) {
        if(err) { 
            res.send(500,"Server Error"); 
                 return;
            }
        // Respond with results as JSON
        res.render('index', {   
                                title: 'Train Scheduler',
                                trainSchedules: schedules
                            }
        );
    });
});

module.exports = router;
