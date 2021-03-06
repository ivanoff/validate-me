'use strict';

var should = require('chai').should();

describe('2valid errors', function () {

    beforeEach(function () {
        this.v = require('../index');
      });

    afterEach(function () {
        this.v = null;
      });

    describe('Errors while registration', function () {
        it('register new bad model', function () {
            this.v.registerModel().should.equal('Name is not defined');
            this.v.registerModel('noObj').should.equal('Model in noObj is not defined');
          });

        it('register same name model', function () {
            this.v.registerModel('sameName', { id: { type: 'integer' } });
            this.v.registerModel('sameName', { name: { type: 'string' } })
              .should.equal('Model sameName is already registered');
          });
      });

    describe('Simple model to validate', function () {
        var userModel = {
            id: { type: 'notype' },
          };

        it('notype model error', function (done) {
            try {
              this.v.check(userModel, { id: 111 }, function () { should.fail(); });
            }
            catch (err) {
              err.should.eql(Error('No type notype in Types: key id'));
              done();
            }
          });
      });

    describe('Min length validate', function () {
        var userModel = {
            password: { type: 'password', min: 1 },
          };
        it('in registerModel', function (done) {
            try {
              this.v.registerModel('userPassMin', userModel);
            }
            catch (err) {
              (err instanceof Error).should.equal(true);
              String(err).should.eql('Error: Key password minimal value (1) '
                + 'is less than acceptable minimal in Types (4)');
              done();
            }
          });

      });

    describe('Max length validate', function () {
        var userModel = {
            password: { type: 'password', max: 100001 },
          };
        it('in registerModel', function (done) {
            try {
              this.v.registerModel('userPassMax', userModel);
            }
            catch (err) {
              (err instanceof Error).should.equal(true);
              String(err).should.eql('Error: Key password maximal value (100001) '
                + 'is in excess of maximal acceptable value in Types (1000)');
              done();
            }
          });

      });

  });
