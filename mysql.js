var mysql      = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'rootme',
    database : 'trainschedule',
    connectionLimit: 10
});

exports.getAll = function(callback) {
    var sql = "SELECT * FROM trains;";

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
