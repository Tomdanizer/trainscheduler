var request = require('superagent');
var expect = require('expect.js');

describe('Index Page Render', function(){
    it ('should connect to the server and render the page', function(done){
        request.get('http://localhost:3000/').end(function(res){
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Train Scheduler');
            done();
        });
    });
});

describe('MySQL data query', function(){
    it ('should receive a mysql response', function(done){
        request.post('localhost:3000/data.json').end(function(res){
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            done();
        });
    });
});

describe('MySQL Add', function(){
    it ('should add data', function(done){
        request.post('localhost:3000/add')
            .send({ train: 'TESTTRAIN', route: 'TESTROUTE', run: 'TESTRUN', operator: 'TESTOPERATOR' })
            .end(function(res){
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            done();
        });
    });
});
describe('MySQL DELETE', function(){
    it ('should delete data', function(done){
        request.post('localhost:3000/delete')
            .send({records:[0]})
            .end(function(res){
                console.log(res);
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                done();
            });
    });
});
