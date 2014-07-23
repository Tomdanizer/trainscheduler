/*
    TODO
    Drag and drop file
    Upload Progress Bar
    CSS styling
    Color scheme
*/

var mysql      = require('mysql');
var escape = require('escape-html');
var pool = mysql.createPool({
/*
    host     : 'localhost',
    user     : 'root',
    password : 'rootme',
    database : 'trainschedule',
*/
     host     : 'us-cdbr-east-06.cleardb.net',
     user     : 'b91e0ad9f64b24',
     password : '88032822bb662ea ',
     database : 'heroku_0425afe26fa5d84',

    connectionLimit: 10
});

/* CSV PARSING */
exports.loadCSV = function(filename, callback) {
    var sql = "LOAD DATA LOCAL INFILE '" + filename +"' REPLACE INTO TABLE trains FIELDS TERMINATED BY ',' IGNORE 1 LINES (train_line, train_route, train_run, train_operator)";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, function(err, results) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            connection.release();

            callback(false, results);
        });
    });
};

/* SELECT STATEMENTS */
exports.getAll = function(callback) {
    var sql = "SELECT * FROM trains order by train_run, train_line, train_route;";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, function(err, results) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            connection.release();

            callback(false, results);
        });
    });
};

/* INSERT STATEMENTS */
exports.insertRecord = function(data, callback) {
    //SQL Query, ? marks are placeholders that get automatically escaped via connection.query
    var sql = "INSERT INTO trains"+
    "(train_line, train_route, train_run, train_operator)"+
     "VALUES (?, ?,?,?)";
    console.log(sql);

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query - 
        connection.query(sql,[data.train, data.route, data.run, data.operator], function(err, results) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            connection.release();

            callback(false, results);
        });
    });
};
/* DELETE STATEMENTS */
exports.deleteRecords = function(records, callback) {
    //SQL Query, ? marks are placeholders that get automatically escaped via connection.query
    var sql = "DELETE FROM trains where id IN (?)";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,[records], function(err, results) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            connection.release();

            callback(false, results);
        });
    });
};

/*UPDATE STATEMENTS*/
exports.updateRecord = function(record, callback) {
    //SQL Query, ? marks are placeholders that get automatically escaped via connection.query
    var sql = "UPDATE trains SET train_line = ?, train_route = ?, train_run = ?, train_operator = ? WHERE id = ?";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,[record.train, record.route, record.run, record.operator, record.id], function(err, results) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            connection.release();

            callback(false, results);
        });
    });
};