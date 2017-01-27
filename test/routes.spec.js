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

describe('GET /api/folders/:folderid/:shorturl', function() {
it('should return a single url', function(done) {
  chai.request(server)
  .get('/api/folders/0/2')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('folderid');
    res.body.should.have.property('shorturl');
    res.body.should.have.property('actualurl');
    res.body.should.have.property('date');
    res.body.should.have.property('clickCount');
    done();
  });
});
});

describe('GET /api/urls', function() {
it('should return the urls', function(done) {
  chai.request(server)
  .get('/api/urls')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    done();
  });
});
});

describe('GET /a/:shorturl', function() {
it('should redirect the url', function(done) {
  chai.request(server)
  .get('/a/0')
  .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.html;
    done();
  });
});
});
