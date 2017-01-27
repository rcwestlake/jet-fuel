process.env.NODE_ENV = 'test';

var express = require('express')
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../src/server.js');

chai.use(chaiHttp);

describe('GET /folders', function() {
  it('should return all folders', function(done) {
    chai.request(server)
    .get('/folders')
    .end(function(err, res) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    done();
    });
  });
});

describe('POST /folders', function() {
  it('should post a new folder to the database', function(done) {
    const title = {'Food'}
    chai.request(server)
    .post('/folders')
    .send(title)
    .end(function(err, res) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    done();
    });
  });
});

describe('GET /folders/:id', function() {
it('should return a folder', function(done) {
  chai.request(server)
  .get('/folders/1')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('id');
    res.body.should.have.property('title');
    done();
  });
});
});

describe('GET /urls', function() {
it('should return all of the urls', function(done) {
  chai.request(server)
  .get('/urls')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    done();
  });
});
});

describe('GET /urls:folder_id', function() {
it('should return the urls for a given folder', function(done) {
  chai.request(server)
  .get('/urls:folder_id')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    done();
  });
});
});

describe('POST /urls/:folder_id', function() {
it('should post a new url to a folder', function(done) {
  chai.request(server)
  .get('/urls/1')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('urlKey');
    res.body.should.have.property('url');
    res.body.should.have.property('date');
    res.body.should.have.property('count');
    res.body.should.have.property('folder_id');
    done();
  });
});
});
