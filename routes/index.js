var express = require('express');
var router = express.Router();
var db = require('../mysql.js');
var fs = require('fs');
var busboy = require('connect-busboy');

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

router.post('/upload', function(req, res,next){
var fstream, fileExtension;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename,  encoding, mimetype) {
            console.log("Uploading: " + filename);
            fileExtension = filename.split('.')[filename.split('.').length - 1].toLowerCase();
            mimetype = mimetype.toLowerCase();
            if(mimetype === 'application/csv' ||  
                mimetype === 'application/excel' || 
                mimetype === 'application/vnd.ms-excel' || 
                mimetype === 'application/vnd.msexcel' || 
                mimetype === 'text/anytext' ||
                mimetype === 'text/comma-separated-values' ||(mimetype === 'application/octet-stream' && fileExtension === 'csv')){
                //Mime type is of CSV type

                //Path where file will be uploaded.
                fstream = fs.createWriteStream('./public/uploaded/' + filename);
                file.pipe(fstream);
                fstream.on('close', function () {    
                    console.log("Upload Finished of " + filename);              
                    res.redirect('back');           //where to go next
                });
            }else{
                //Not a CSV, error
                res.send(500,"Server Error"); 
                 return;
            }
            

        });
});
module.exports = router;
