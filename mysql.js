var mysql      = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'rootme',
    database : 'trainschedule',
    connectionLimit: 10
});

/* CSV PARSING */
exports.loadCSV = function(filename, callback) {
    var sql = "LOAD DATA LOCAL INFILE '" + filename +"' INTO TABLE trains FIELDS TERMINATED BY ',' LINES TERMINATED BY ? IGNORE 1 LINES (train_line, train_route, train_run, train_operator)";

    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        // make the query
        connection.query(sql,["\r\n"], function(err, results) {
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
        // make the query
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